/**
 * Sube el paquete al **área de preparación** de npm (`npm stage publish`)
 * leyendo el token de `~/.config/slxd/npm-studiolxd.env` (fuera del repo, 0600).
 * No hace falta `npm login` ni dejar credenciales en el `.npmrc` de la máquina:
 * se escribe un fichero de configuración temporal, se usa y se borra pase lo que
 * pase.
 *
 * **Esto NO publica.** `npm stage publish` difiere la prueba de presencia (el
 * segundo factor) a un momento posterior: el paquete queda subido y a la espera,
 * y NO existe en el registro hasta que una persona lo aprueba con su sesión y su
 * segundo factor (`npm stage approve <stage-id>`, o desde npmjs.com). Ese
 * reparto es el que hace que un script pueda hacer su parte sin saltarse el 2FA
 * — y no depender de un token que se lo salte, que es el camino que npm está
 * restringiendo (gh.io/npm-gat-bypass2fa-deprecation).
 *
 * Por eso el script termina imprimiendo el **identificador del stage** bien
 * visible: sin él no se puede aprobar.
 *
 * Va DESPUÉS de `release:check` y del tag, nunca antes: lo que se sube es lo que
 * ya pasó la puerta de calidad.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ENV = join(homedir(), '.config/slxd/npm-studiolxd.env');
const RC = join(process.cwd(), '.npmrc.publish');

const token = /^NPM_TOKEN=(.+)$/m.exec(readFileSync(ENV, 'utf8'))?.[1]?.trim();
if (!token) {
  console.error(`✗ No hay NPM_TOKEN en ${ENV}`);
  process.exit(1);
}

const { name, version } = JSON.parse(readFileSync('package.json', 'utf8'));
const spec = `${name}@${version}`;

/**
 * El identificador que hay que pasar a `approve`/`reject`. npm no promete un
 * formato, así que se busca sin apretar y, si no aparece, se dice en vez de
 * inventarlo: para eso está `npm stage list`, que se imprime a continuación.
 */
function extraerStageId(texto) {
  return (
    /"id"\s*:\s*"([^"]+)"/.exec(texto)?.[1] ??
    /\bstage(?:[-\s]?id)?\b\s*[:=]?\s*([A-Za-z0-9][A-Za-z0-9._-]{5,})/i.exec(texto)?.[1] ??
    null
  );
}

/** Ejecuta npm con el `.npmrc` temporal, enseñando su salida y devolviéndola. */
function npm(args) {
  const salida = execFileSync('npm', args, {
    encoding: 'utf8',
    stdio: ['inherit', 'pipe', 'pipe'],
    env: { ...process.env, NPM_CONFIG_USERCONFIG: RC },
  });
  process.stdout.write(salida);
  return salida;
}

console.log(`▶ subiendo ${spec} al área de preparación de npm`);

try {
  writeFileSync(RC, `//registry.npmjs.org/:_authToken=${token}\n`, { mode: 0o600 });

  const salida = npm(['stage', 'publish', '--access', 'public']);

  // El listado es la fuente fiable del identificador y del estado; se imprime
  // siempre, encuentre o no el id en la salida de arriba.
  let listado = '';
  try {
    listado = npm(['stage', 'list', spec]);
  } catch {
    listado = '';
  }

  const stageId = extraerStageId(salida) ?? extraerStageId(listado);

  console.log(`\n${'─'.repeat(72)}`);
  console.log(`✔ ${spec} SUBIDO AL ÁREA DE PREPARACIÓN — todavía NO está publicado.`);
  if (stageId) {
    console.log(`\n  stage-id: ${stageId}\n`);
    console.log('  Para publicarlo de verdad, una persona con sesión y segundo factor:');
    console.log(`      npm stage approve ${stageId}`);
    console.log('  (o desde npmjs.com, en el área de paquetes preparados)');
    console.log('\n  Antes de aprobar, para mirar o quitar lo subido:');
    console.log(`      npm stage view ${stageId}       # qué hay subido`);
    console.log(`      npm stage download ${stageId}   # el tarball, para inspeccionarlo`);
    console.log(`      npm stage reject ${stageId}     # retirarlo sin que llegue a existir`);
  } else {
    console.log('\n  ⚠ No se ha podido leer el stage-id de la salida de npm.');
    console.log('    Sácalo del listado de arriba o con:');
    console.log(`      npm stage list ${spec}`);
    console.log('    y luego apruébalo con `npm stage approve <stage-id>`.');
  }
  console.log(`${'─'.repeat(72)}`);
} catch (error) {
  process.stdout.write(error?.stdout ?? '');
  process.stderr.write(error?.stderr ?? '');
  console.error(
    `\n✗ No se pudo subir ${spec} al área de preparación.\n` +
      `  Si el error es de autenticación, revisa el NPM_TOKEN de ${ENV}:\n` +
      '  necesita permiso de lectura y escritura sobre el scope @studiolxd.\n' +
      '  Ya NO hace falta que sea de tipo «Automation»: el segundo factor lo\n' +
      '  pone quien aprueba el stage, no este script.',
  );
  process.exit(1);
} finally {
  rmSync(RC, { force: true });
}
