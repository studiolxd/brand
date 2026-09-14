/**
 * Publica el paquete en npm leyendo el token de `~/.config/slxd/npm-studiolxd.env`
 * (fuera del repo, 0600). No hace falta `npm login` ni dejar credenciales en
 * el `.npmrc` de la máquina: se escribe un fichero de configuración temporal,
 * se publica con él y se borra pase lo que pase.
 *
 * El token TIENE QUE SER de tipo «Automation». Un token de publicación normal
 * respeta la verificación en dos pasos y npm corta con `EOTP` pidiendo un
 * código, que es justo lo que un script no puede teclear.
 *
 * Va DESPUÉS de `release:check` y del tag, nunca antes: lo que se publica es
 * lo que ya pasó la puerta de calidad.
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
console.log(`▶ publicando ${name}@${version}`);

try {
  writeFileSync(RC, `//registry.npmjs.org/:_authToken=${token}\n`, { mode: 0o600 });
  execFileSync('npm', ['publish', '--access', 'public'], {
    stdio: 'inherit',
    env: { ...process.env, NPM_CONFIG_USERCONFIG: RC },
  });
  console.log(`\n✔ ${name}@${version} publicado`);
} catch {
  console.error(
    '\n✗ No se pudo publicar. Si el error es EOTP, el token no es de tipo ' +
      '«Automation»: genera uno nuevo en npmjs.com → Access Tokens y pégalo ' +
      `en ${ENV}.`,
  );
  process.exit(1);
} finally {
  rmSync(RC, { force: true });
}
