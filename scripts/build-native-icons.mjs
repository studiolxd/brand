// Genera native/apple/Sources/StudiolxdBrand/Icon/BrandIconData.swift a partir de ICONS en
// src/stories/atoms/Icon/Icon.tsx: los mismos trazos, en la misma retícula de 24, para que el icono nativo sea el de
// React y no una aproximación con SF Symbols. Solo lee el .tsx; no toca React.
import { readFileSync, writeFileSync } from 'node:fs';
import ts from 'typescript';

const SOURCE = 'src/stories/atoms/Icon/Icon.tsx';
const OUT = 'native/apple/Sources/StudiolxdBrand/Icon/BrandIconData.swift';

const sf = ts.createSourceFile(SOURCE, readFileSync(SOURCE, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

const consts = new Map();
const iconsLiteral = (() => {
  let found;
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      consts.set(node.name.text, node.initializer);
      if (node.name.text === 'ICONS') found = node.initializer;
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  const lit = found?.expression ?? found; // `{ … } as const`
  if (!lit || !ts.isObjectLiteralExpression(lit)) throw new Error('No encuentro ICONS en Icon.tsx');
  return lit;
})();

const attrValue = (attr) => {
  const init = attr.initializer;
  if (!init) return 'true';
  if (ts.isStringLiteral(init)) return init.text;
  if (ts.isJsxExpression(init) && init.expression) {
    const e = init.expression;
    if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) return e.text;
    if (ts.isNumericLiteral(e)) return e.text;
  }
  return null; // dinámico (p. ej. la `d` del aspa, calculada)
};

/** Interpola `${…}` de una plantilla evaluando las expresiones con los consts de Icon.tsx (MENU_GLYPH). */
function evalExpr(node) {
  const code = ts.transpileModule(`export default (${node.getText(sf)})`, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const menuGlyph = consts.get('MENU_GLYPH');
  const glyphCode = ts.transpileModule(`export default (${menuGlyph.getText(sf)})`, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const run = (c) => { const m = { exports: {} }; new Function('module', 'exports', c)(m, m.exports); return m.exports.default; };
  const MENU_GLYPH = run(glyphCode);
  return new Function('MENU_GLYPH', `return (${node.getText(sf)})`)(MENU_GLYPH);
}

const shapesOf = (render) => {
  const shapes = [];
  const visit = (node) => {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tag = node.tagName.getText(sf);
      if (['path', 'circle', 'line', 'rect'].includes(tag)) {
        const a = {};
        for (const attr of node.attributes.properties) {
          if (!ts.isJsxAttribute(attr)) continue;
          const name = attr.name.getText(sf);
          if (name === 'key' || name === 'className') continue;
          let v = attrValue(attr);
          if (v === null && name === 'd') v = String(evalExpr(attr.initializer.expression)); // el aspa: `d` calculada
          a[name] = v;
        }
        shapes.push({ tag, a });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(render);
  return shapes;
};

/** El glifo `menu` dibuja sus tres líneas con `MENU_GLYPH.rows.map(...)`: se expande aquí con los mismos números. */
const expandMenu = (shapes) => shapes.flatMap((sh) => {
  if (sh.tag !== 'line' || sh.a.x1 !== null && sh.a.x1 !== undefined && sh.a.y1 !== null) return [sh];
  const g = menuGlyph();
  return g.rows.map((y) => ({ tag: 'line', a: { ...sh.a, x1: String(g.inset), y1: String(y), x2: String(g.size - g.inset), y2: String(y) } }));
});
const menuGlyph = () => {
  const code = ts.transpileModule(`export default (${consts.get('MENU_GLYPH').getText(sf)})`, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const m = { exports: {} };
  new Function('module', 'exports', code)(m, m.exports);
  return m.exports.default;
};

const resolve = (init) => {
  if (ts.isIdentifier(init)) return resolve(consts.get(init.text));
  return init;
};

const icons = [];
for (const prop of iconsLiteral.properties) {
  const name = (ts.isIdentifier(prop.name) ? prop.name.text : prop.name.text);
  let obj = ts.isShorthandPropertyAssignment(prop) ? consts.get(name) : prop.initializer;
  obj = resolve(obj);
  const renderProp = obj.properties.find((p) => p.name?.getText(sf) === 'render');
  icons.push({ name, shapes: expandMenu(shapesOf(renderProp.initializer)) });
}

const q = (s) => JSON.stringify(s);
const num = (s) => String(Number(s));
const shapeSwift = ({ tag, a }) => {
  const fill = a.fill === 'currentColor' ? ', filled: true' : '';
  const cap = a.strokeLinecap === 'round' ? ', round: true' : '';
  const join = a.strokeLinejoin === 'round' ? ', roundJoin: true' : '';
  if (tag === 'path') return `.path(${q(a.d)}${cap}${join}${fill}${a.stroke === 'none' ? ', stroked: false' : ''})`;
  if (tag === 'circle') return `.circle(cx: ${num(a.cx)}, cy: ${num(a.cy)}, r: ${num(a.r)}${fill}${a.stroke === 'none' ? ', stroked: false' : ''})`;
  if (tag === 'line') return `.line(x1: ${num(a.x1)}, y1: ${num(a.y1)}, x2: ${num(a.x2)}, y2: ${num(a.y2)}${cap})`;
  throw new Error(`Forma no soportada: ${tag}`);
};
const caseName = (n) => n.split('-').map((w, i) => (i ? w[0].toUpperCase() + w.slice(1) : w)).join('');

const lines = [
  '// Do not edit directly, this file was auto-generated by scripts/build-native-icons.mjs from src/stories/atoms/Icon/Icon.tsx. Run `pnpm build:native-icons`.',
  '',
  '/// Los nombres del catálogo de iconos de React (`IconName`), con el `rawValue` igual al de React.',
  'public enum BrandIconName: String, CaseIterable, Sendable {',
  ...icons.map((i) => `    case ${caseName(i.name)}${caseName(i.name) === i.name ? '' : ` = ${q(i.name)}`}`),
  '}',
  '',
  'extension BrandIconName {',
  '    /// Los trazos del icono, en la retícula de 24 × 24 de la web.',
  '    var shapes: [BrandIconShape] {',
  '        switch self {',
  ...icons.flatMap((i) => [
    `        case .${caseName(i.name)}:`,
    '            [',
    ...i.shapes.map((s) => `                ${shapeSwift(s)},`),
    '            ]',
  ]),
  '        }',
  '    }',
  '}',
  '',
];
writeFileSync(OUT, lines.join('\n'));
console.log(`✔︎ ${OUT} (${icons.length} iconos)`);
