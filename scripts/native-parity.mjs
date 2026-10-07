// Paridad de las versiones nativas con React: valida cada ficha de
// `native/parity/components/*.json` contra `native/parity/schema.json` y
// comprueba que lo que declara coincide con las props del componente de React,
// leídas con el compilador de TypeScript. Con cero fichas pasa.
//
// Uso:
//   pnpm native:parity                       // todas las fichas
//   pnpm native:parity -- --dir <carpeta>    // otra carpeta de fichas (pruebas)
//
// Lo que comprueba, por ficha:
//   1. La ficha cumple el esquema.
//   2. `react.path` existe y exporta el tipo `react.props`.
//   3. Cada prop de la ficha existe en React y su tipo coincide: una prop `union`
//      declara EXACTAMENTE los literales de React; una `boolean`, es booleana.
//   4. Cada `excluded.prop` existe en React y no está también en `props`.
//   5. Toda prop PROPIA del componente (declarada en el repo, no heredada de
//      `ComponentPropsWithoutRef<'button'>` y compañía) está en `props`, en
//      `excluded` o en `deprecated`: portar un componente es decidir cada prop,
//      no olvidarse una.
//   6. Cada `deprecated.prop` existe en React con `@deprecated` en su JSDoc y su
//      `replacement` está en `props`; los `deprecatedValues` de una unión son
//      literales de React que no están también en `values`.
// La otra mitad —que el componente nativo expone esos mismos casos— la comprueban
// las pruebas de cada plataforma (ver native/parity/README.md).

import Ajv from 'ajv';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SCHEMA_PATH = join(ROOT, 'native/parity/schema.json');
const DEFAULT_DIR = join(ROOT, 'native/parity/components');

/** Valida una ficha contra el esquema. Devuelve los problemas, uno por línea. */
export function validateSchema(card, validate) {
  if (validate(card)) return [];
  return validate.errors.map((e) => `${e.instancePath || '/'} ${e.message}${e.params?.allowedValue ? ` (${e.params.allowedValue})` : ''}`);
}

/**
 * Las props de un tipo, con su forma: `{ kind: 'union', values } | { kind: 'boolean' } | { kind: 'other' }` y si
 * son propias (declaradas fuera de `node_modules`). Un tipo unión (`A | B`) aporta las props de todos sus miembros.
 */
export function readProps(checker, type, node) {
  const members = type.isUnion() ? type.types : [type];
  const props = new Map();
  for (const member of members) {
    for (const symbol of checker.getPropertiesOfType(member)) {
      const name = symbol.getName();
      const declarations = symbol.declarations ?? [];
      const own = declarations.length > 0 && declarations.every((d) => !d.getSourceFile().fileName.includes('node_modules'));
      const deprecated = declarations.some((d) => ts.getJSDocTags(d).some((t) => t.tagName.text === 'deprecated'));
      const propType = checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(symbol, node));
      const shape = describe(propType);
      const previous = props.get(name);
      // La misma prop en varios miembros de una unión: se juntan sus literales.
      if (previous?.kind === 'union' && shape.kind === 'union') {
        previous.values = [...new Set([...previous.values, ...shape.values])];
      } else if (!previous) props.set(name, { ...shape, own, deprecated });
    }
  }
  return props;
}

function describe(type) {
  const parts = type.isUnion() ? type.types : [type];
  if (parts.every((t) => t.flags & ts.TypeFlags.BooleanLiteral)) return { kind: 'boolean' };
  // `boolean | 'mobile'`: un booleano con literales extra que solo existen en la web (`Button block`).
  const booleans = parts.filter((t) => t.flags & ts.TypeFlags.BooleanLiteral);
  const strings = parts.filter((t) => t.isStringLiteral()).map((t) => t.value);
  if (booleans.length > 0 && strings.length > 0 && booleans.length + strings.length === parts.length) {
    return { kind: 'booleanPlus', values: strings };
  }
  // Los literales numéricos (`1 | 2 | 3`, el `level` de `Heading`) cuentan como texto: «1», «2», «3».
  const literals = parts.filter((t) => t.isStringLiteral() || t.isNumberLiteral()).map((t) => String(t.value));
  // `'a' | 'b' | undefined` ya llega sin `undefined` por `getNonNullableType`.
  if (literals.length > 0 && literals.length === parts.length) return { kind: 'union', values: literals };
  return { kind: 'other' };
}

/** Carga el tipo de props de una ficha con el compilador. Devuelve `{ props }` o `{ problems }`. */
export function loadReactProps(card, root = ROOT) {
  const file = resolve(root, card.react.path);
  if (!existsSync(file)) return { problems: [`react.path: no existe ${card.react.path}`] };

  const configPath = ts.findConfigFile(root, ts.sys.fileExists, 'tsconfig.app.json');
  const options = configPath
    ? ts.parseJsonConfigFileContent(ts.readConfigFile(configPath, ts.sys.readFile).config, ts.sys, dirname(configPath)).options
    : { jsx: ts.JsxEmit.ReactJSX, moduleResolution: ts.ModuleResolutionKind.Bundler };
  const program = ts.createProgram([file], { ...options, noEmit: true, skipLibCheck: true, incremental: false, composite: false });
  const source = program.getSourceFile(file);
  const checker = program.getTypeChecker();
  const moduleSymbol = source && checker.getSymbolAtLocation(source);
  const exported = moduleSymbol && checker.getExportsOfModule(moduleSymbol).find((s) => s.getName() === card.react.props);
  if (!exported) return { problems: [`react.props: ${card.react.path} no exporta «${card.react.props}»`] };

  const type = checker.getDeclaredTypeOfSymbol(exported);
  return { props: readProps(checker, type, source) };
}

/** Compara una ficha con las props de React. Devuelve los problemas, uno por línea. */
export function compareWithReact(card, reactProps) {
  const problems = [];
  const excluded = new Map((card.excluded ?? []).map((e) => [e.prop, e]));
  const deprecated = new Map((card.deprecated ?? []).map((d) => [d.prop, d]));

  for (const [name, declared] of Object.entries(card.props)) {
    const actual = reactProps.get(name);
    if (!actual) {
      problems.push(`props.${name}: no existe en ${card.react.props}`);
    } else if (excluded.has(name)) {
      problems.push(`props.${name}: está en \`props\` y en \`excluded\` a la vez`);
    } else if (deprecated.has(name)) {
      problems.push(`props.${name}: está en \`props\` y en \`deprecated\` a la vez`);
    } else if (declared.type === 'boolean') {
      const reactOnly = declared.reactOnlyValues ?? [];
      if (actual.kind === 'booleanPlus') {
        const want = new Set(actual.values);
        const have = new Set(reactOnly);
        const missing = [...want].filter((v) => !have.has(v));
        const extra = [...have].filter((v) => !want.has(v));
        if (missing.length) problems.push(`props.${name}: en React también admite ${missing.join(', ')}: decláralo en \`reactOnlyValues\``);
        if (extra.length) problems.push(`props.${name}: reactOnlyValues lleva valores que React no tiene: ${extra.join(', ')}`);
      } else if (actual.kind !== 'boolean') {
        problems.push(`props.${name}: la ficha dice boolean pero en React es ${describeKind(actual)}`);
      } else if (reactOnly.length) {
        problems.push(`props.${name}: reactOnlyValues no aplica: en React es un booleano a secas`);
      }
    } else if (actual.kind !== 'union') {
      problems.push(`props.${name}: la ficha dice union pero en React es ${describeKind(actual)}`);
    } else {
      const want = new Set(actual.values);
      const old = declared.deprecatedValues ?? [];
      const have = new Set([...declared.values, ...old]);
      const missing = [...want].filter((v) => !have.has(v));
      const extra = [...have].filter((v) => !want.has(v));
      const both = old.filter((v) => declared.values.includes(v));
      if (missing.length) problems.push(`props.${name}: faltan valores de React: ${missing.join(', ')}`);
      if (extra.length) problems.push(`props.${name}: valores que React no tiene: ${extra.join(', ')}`);
      if (both.length) problems.push(`props.${name}: ${both.join(', ')} está en \`values\` y en \`deprecatedValues\` a la vez`);
    }
  }

  for (const [name, entry] of deprecated) {
    const actual = reactProps.get(name);
    if (!actual) problems.push(`deprecated.${name}: no existe en ${card.react.props}`);
    else if (!actual.deprecated) problems.push(`deprecated.${name}: en React no lleva \`@deprecated\` en su JSDoc`);
    if (excluded.has(name)) problems.push(`deprecated.${name}: está en \`deprecated\` y en \`excluded\` a la vez`);
    if (!(entry.replacement in card.props)) problems.push(`deprecated.${name}: su sustituta «${entry.replacement}» no está en \`props\``);
  }

  for (const name of excluded.keys()) {
    if (!reactProps.has(name)) problems.push(`excluded.${name}: no existe en ${card.react.props}`);
  }

  for (const [name, shape] of reactProps) {
    if (shape.own && !(name in card.props) && !excluded.has(name) && !deprecated.has(name)) {
      problems.push(`${name}: prop propia de ${card.react.props} que la ficha ni porta (\`props\`) ni excluye (\`excluded\`) ni declara obsoleta (\`deprecated\`)`);
    }
  }
  return problems;
}

const describeKind = (shape) => (shape.kind === 'union' ? `una unión (${shape.values.join(' | ')})` : shape.kind === 'boolean' ? 'boolean' : shape.kind === 'booleanPlus' ? `un booleano más ${shape.values.join(' | ')}` : 'otro tipo');

/** Comprueba todas las fichas de una carpeta. Devuelve `{ checked, problems }`. */
export function checkCards(dir = DEFAULT_DIR, root = ROOT) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(JSON.parse(readFileSync(SCHEMA_PATH, 'utf-8')));
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.json')).sort() : [];
  const problems = [];

  for (const file of files) {
    const label = `components/${file}`;
    let card;
    try {
      card = JSON.parse(readFileSync(join(dir, file), 'utf-8'));
    } catch (error) {
      problems.push(`${label}: JSON inválido (${error.message})`);
      continue;
    }
    const found = validateSchema(card, validate).map((p) => `${label}: esquema: ${p}`);
    if (found.length === 0) {
      if (file !== `${card.component}.json`) found.push(`${label}: el nombre del fichero debe ser ${card.component}.json`);
      const loaded = loadReactProps(card, root);
      found.push(...(loaded.problems ?? compareWithReact(card, loaded.props)).map((p) => `${label}: ${p}`));
    }
    problems.push(...found);
  }
  return { checked: files.length, problems };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dirFlag = process.argv.indexOf('--dir');
  const dir = dirFlag > -1 ? resolve(process.argv[dirFlag + 1]) : DEFAULT_DIR;
  const { checked, problems } = checkCards(dir);
  if (problems.length > 0) {
    console.error('✗ native:parity — las fichas no coinciden con React:');
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
  }
  console.log(`✔ native:parity — ${checked} ${checked === 1 ? 'ficha' : 'fichas'} en paridad con React`);
}
