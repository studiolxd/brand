// Puerta de calidad para el ritual de release. Encadena lint + tipos + tests +
// build:all y, al final, comprueba que dist/ quedó realmente regenerado y en
// sync con package.json#exports — la comprobación que faltó en v27.1.0, cuando
// se taggeó una versión con dist desactualizado.
//
// Uso:
//   pnpm release:check                 // sin test:stories (depende de Chromium)
//   pnpm release:check -- --with-stories

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const withStories = process.argv.includes('--with-stories');

function run(label, command, args) {
  console.log(`\n▶ ${label}`);
  const result = spawnSync(command, args, { stdio: 'inherit', shell: false });
  if (result.status !== 0) {
    console.error(`\n✗ release:check — falló «${label}» (${command} ${args.join(' ')})`);
    process.exit(result.status ?? 1);
  }
}

run('lint', 'pnpm', ['lint']);
run('tsc -b', 'pnpm', ['exec', 'tsc', '-b']);
run('test', 'pnpm', ['test']);
if (withStories) {
  run('test:stories', 'pnpm', ['test:stories']);
} else {
  console.log('\n○ test:stories omitido (usa --with-stories para incluirlo; depende de Chromium/Playwright)');
}
run('build:all', 'pnpm', ['build:all']);

// --- Imports relativos de dist/**/*.js apuntan a un fichero que existe con
// EXACTAMENTE ese nombre (sensible a mayúsculas) ---
// APFS (macOS) resuelve un import mal capitalizado por insensibilidad a
// mayúsculas; Linux/Turbopack no, y `next build` en producción revienta con
// «Can't resolve '…'». Pasó en v37.5.0-37.5.1: un chunk compartido de Vite
// (nombrado por el fichero fuente, p. ej. `Logo.tsx` → `Logo.js`) importaba
// el CSS de un entry nombrado por su clave de `entryPoints` (`logo.css`) —
// mismo contenido, distinta caja. `readdirSync` + comparación exacta de
// string, no `existsSync` (que en un filesystem insensible da un falso OK).
console.log('\n▶ comprobando que los imports relativos de dist/**/*.js resuelven con la caja exacta');

const relativeImportPattern = /(?:from\s+|import\s+)['"](\.\.?\/[^'"]+)['"]/g;
const caseMismatches = [];

function walkAllFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkAllFiles(path));
    else files.push(path);
  }
  return files;
}

function walkJsFiles(dir) {
  return walkAllFiles(dir).filter((f) => f.endsWith('.js'));
}

const distJsFiles = existsSync('dist') ? walkJsFiles('dist') : [];

for (const file of distJsFiles) {
  const content = readFileSync(file, 'utf-8');
  for (const match of content.matchAll(relativeImportPattern)) {
    const importPath = match[1];
    const importedFile = join(dirname(file), importPath);
    const importedDir = dirname(importedFile);
    const importedName = importedFile.slice(importedDir.length + 1);

    if (!existsSync(importedDir)) {
      caseMismatches.push({ file, importPath, reason: 'directorio inexistente' });
      continue;
    }

    const actualNames = readdirSync(importedDir);
    if (!actualNames.includes(importedName)) {
      caseMismatches.push({ file, importPath, reason: `en disco: ${actualNames.join(', ') || '(vacío)'}` });
    }
  }
}

if (caseMismatches.length > 0) {
  console.error('\n✗ release:check — dist/**/*.js tiene imports que no resuelven con la caja exacta:');
  for (const { file, importPath, reason } of caseMismatches) {
    console.error(`  - ${relative('.', file)}: import '${importPath}' (${reason})`);
  }
  console.error(
    '\nProbable causa: `chunkFileNames`/`assetFileNames` de vite.lib.config.ts generando nombres con ' +
      'distinta caja para un mismo chunk/asset compartido entre varios entries. Revisa el pattern en ' +
      'ese fichero antes de tocar dist/ a mano.',
  );
  process.exit(1);
}

console.log('✔ todos los imports relativos de dist/**/*.js resuelven con la caja exacta');

// --- Ficheros de dist/ que solo difieren en mayúsculas (colisionarían al
// empaquetar en un filesystem insensible, como macOS/APFS) ---
console.log('\n▶ comprobando que no hay ficheros de dist/ que solo difieran en mayúsculas');

const lowerCaseSeen = new Map();
const caseCollisions = [];

for (const file of existsSync('dist') ? walkAllFiles('dist') : []) {
  const lower = file.toLowerCase();
  if (lowerCaseSeen.has(lower) && lowerCaseSeen.get(lower) !== file) {
    caseCollisions.push([lowerCaseSeen.get(lower), file]);
  } else {
    lowerCaseSeen.set(lower, file);
  }
}

if (caseCollisions.length > 0) {
  console.error('\n✗ release:check — dist/ tiene ficheros que solo difieren en mayúsculas:');
  for (const [a, b] of caseCollisions) {
    console.error(`  - ${a} / ${b}`);
  }
  process.exit(1);
}

console.log('✔ sin colisiones de mayúsculas en dist/');

// --- Referencias de tokens sin resolver en dist/*.css ---
// Style Dictionary 4.4.0 tiene un bug de resolución (getReferences.js hace
// `variable.replace('.value', '')` con un String.replace de texto plano, no
// una regex anclada al final): si el último segmento de una ruta referenciada
// empieza por «value» — no solo es «value» a secas, también «values-gap»,
// «valueless», etc. — el replace borra ese fragmento del string de en medio
// y la referencia encadenada ({componente.values-algo}) queda sin resolver:
// sale literal en el CSS (`{multi-select.values-gap}` en vez de
// `var(--multi-select-values-gap)`), lo que el navegador descarta como
// propiedad inválida. Pasó en dist/tokens.css y dist/brand.css hasta que el
// token se renombró (`values-gap` → `selection-gap` en multi-select.json /
// async-multi-select.json). Este check evita que vuelva a colarse sin que
// nadie lo note: cualquier `{algo.algo}` que sobreviva al build es ese bug.
console.log('\n▶ comprobando que no quedan referencias de tokens sin resolver en dist/*.css');

const unresolvedRefPattern = /\{[a-z0-9-]+(\.[a-z0-9-]+)+\}/gi;
const cssFilesToCheck = existsSync('dist')
  ? readdirSync('dist').filter((f) => f.endsWith('.css'))
  : [];
const unresolved = [];

for (const file of cssFilesToCheck) {
  const path = join('dist', file);
  const content = readFileSync(path, 'utf-8');
  const matches = content.match(unresolvedRefPattern);
  if (matches) {
    unresolved.push({ file, matches: [...new Set(matches)] });
  }
}

if (unresolved.length > 0) {
  console.error('\n✗ release:check — dist/*.css contiene referencias de tokens sin resolver:');
  for (const { file, matches } of unresolved) {
    console.error(`  - ${file}: ${matches.join(', ')}`);
  }
  console.error(
    '\nProbable causa: el bug de Style Dictionary 4.4.0 con segmentos de ruta que empiezan por «value» ' +
      '(getReferences.js, String.replace(\'.value\', \'\') sin anclar). Renombra el segmento del token ' +
      'para que no empiece por «value» — no lo sustituyas por su valor resuelto a mano, rompería la cascada.',
  );
  process.exit(1);
}

console.log('✔ sin referencias de tokens sin resolver en dist/*.css');

// --- Comprobación de sync de dist/ ---
console.log('\n▶ comprobando que dist/ está regenerado y en sync');

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
const missing = [];

for (const [name, entry] of Object.entries(pkg.exports ?? {})) {
  const importPath = typeof entry === 'string' ? entry : entry.import;
  if (!importPath || !importPath.startsWith('./dist/') || !importPath.endsWith('.js')) continue;

  const distFile = importPath.replace(/^\.\//, '');
  if (!existsSync(distFile)) {
    missing.push({ name, distFile });
    continue;
  }

  const typesPath = typeof entry === 'object' ? entry.types : undefined;
  if (typesPath) {
    const typesFile = typesPath.replace(/^\.\//, '');
    if (!existsSync(typesFile)) {
      missing.push({ name, distFile: typesFile });
    }
  }
}

if (missing.length > 0) {
  console.error('\n✗ release:check — faltan artefactos de dist/ para entradas de package.json#exports:');
  for (const { name, distFile } of missing) {
    console.error(`  - "${name}" → ${distFile}`);
  }
  console.error('\nRevisa scripts/entry-points.mjs: probablemente falta una entrada ahí (ver checklist de CLAUDE.md § «Añadir un nuevo componente»).');
  process.exit(1);
}

// git status limpio tras el build: si build:all deja diff en dist/, es que el
// dist committeado no era el que corresponde al src/ actual.
const gitStatus = spawnSync('git', ['status', '--porcelain', '--', 'dist'], { encoding: 'utf-8' });
const dirty = gitStatus.stdout.trim();
if (dirty.length > 0) {
  console.error('\n✗ release:check — dist/ no está en sync con src/: el build acaba de cambiarlo.');
  console.error('Commitea el dist/ regenerado antes de taggear:\n');
  console.error(dirty);
  process.exit(1);
}

console.log('✔ dist/ en sync con package.json#exports y con src/ (git status limpio)');
console.log('\n✔ release:check — todo verde');
