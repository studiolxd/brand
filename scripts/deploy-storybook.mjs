/**
 * Despliega el Storybook en https://brand.studiolxd.com: construye la imagen en
 * el VPS (contexto Docker `vps-slxd`, amd64), la sube a GHCR con los tags
 * `latest` y `vX.Y.Z`, y recrea el contenedor `studiolxd_brand` del compose.
 *
 * Va DESPUÉS de aprobar el stage de npm: se despliega lo que ya está publicado.
 * Guardas (antes de construir): árbol limpio, `HEAD` con el tag
 * `v<version de package.json>` y contexto Docker presente.
 *
 *   pnpm deploy:storybook             # despliega
 *   pnpm deploy:storybook --dry-run   # imprime los comandos y las guardas; no ejecuta nada
 *
 * Host, contexto, ruta del compose, servicio e imagen: ver DEFAULTS en
 * scripts/lib/deploy-storybook.mjs (sobrescribibles con STORYBOOK_DEPLOY_*).
 * Se para en el primer fallo.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { checkGuards, configFromEnv, formatCommand, planDeploy } from './lib/deploy-storybook.mjs';

const dryRun = process.argv.includes('--dry-run');
const config = configFromEnv();

const salida = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8' });

// Sin Docker instalado no hay contextos: la guarda lo cuenta como contexto ausente.
const contextos = () => {
  try {
    return salida('docker', ['context', 'ls', '--format', '{{.Name}}']).split('\n').filter(Boolean);
  } catch {
    return [];
  }
};

const { version } = JSON.parse(readFileSync('package.json', 'utf8'));
const sha = salida('git', ['rev-parse', 'HEAD']).trim();
const problemas = checkGuards(
  {
    porcelain: salida('git', ['status', '--porcelain']),
    version,
    tagsAtHead: salida('git', ['tag', '--points-at', 'HEAD']).split('\n').filter(Boolean),
    contexts: contextos(),
  },
  config,
);

if (problemas.length > 0) {
  const marca = dryRun ? '⚠' : '✗';
  for (const p of problemas) console.error(`${marca} ${p}`);
  if (!dryRun) process.exit(1);
  console.error('  (--dry-run: se sigue para enseñar los comandos)\n');
}

const pasos = planDeploy({ version, sha }, config);
console.log(`▶ Storybook v${version} (${sha.slice(0, 8)}) → ${config.url}`);

for (const [i, paso] of pasos.entries()) {
  console.log(`\n[${i + 1}/${pasos.length}] ${paso.titulo}\n  $ ${formatCommand(paso)}`);
  if (dryRun) continue;
  const { status } = spawnSync(paso.cmd, paso.args, { stdio: 'inherit' });
  if (status !== 0) {
    console.error(`\n✗ Falló «${paso.titulo}» (código ${status ?? 'señal'}); no se sigue.`);
    process.exit(status || 1);
  }
}

console.log(
  dryRun
    ? '\n(--dry-run: no se ha ejecutado nada)'
    : `\n✔ Desplegado. Comprueba que ${config.url} responde 200 con un last-modified nuevo:\n  curl -sI ${config.url} | grep -iE '^(HTTP|last-modified)'`,
);
