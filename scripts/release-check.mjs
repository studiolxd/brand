// Puerta de calidad para el ritual de release. Encadena lint + tipos + tests +
// build:all y, al final, comprueba que dist/ quedó realmente regenerado y en
// sync con package.json#exports — la comprobación que faltó en v27.1.0, cuando
// se taggeó una versión con dist desactualizado.
//
// Uso:
//   pnpm release:check                 // sin test:stories (depende de Chromium)
//   pnpm release:check -- --with-stories

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

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
