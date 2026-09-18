import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Un Node CommonJS —los workers de la suite empaquetados con esbuild en formato
 * cjs, o un `tsx` cualquiera— hace `require('@studiolxd/brand/email')` y, si la
 * subruta solo declara `types` e `import`, muere con
 * `ERR_PACKAGE_PATH_NOT_EXPORTED`: `import` solo casa con la condición de
 * importación. Con `default` apuntando al MISMO fichero ESM, Node lo carga por
 * `require(esm)` sin publicar una segunda copia en CJS.
 *
 * Las subrutas que ya son una cadena (CSS, SCSS, JSON, assets) quedan fuera: una
 * cadena vale para toda condición.
 */
const pkg = JSON.parse(
  readFileSync(fileURLToPath(new URL('../package.json', import.meta.url)), 'utf-8'),
) as { exports: Record<string, string | Record<string, string>> };

const condicionales = Object.entries(pkg.exports).filter(
  (entry): entry is [string, Record<string, string>] => typeof entry[1] === 'object',
);

describe('package.json#exports', () => {
  it('hay subrutas condicionales que comprobar', () => {
    expect(condicionales.length).toBeGreaterThan(0);
  });

  it('toda subruta condicional declara `default`', () => {
    const sinDefault = condicionales.filter(([, e]) => !('default' in e)).map(([name]) => name);
    expect(sinDefault).toEqual([]);
  });

  it('`default` apunta al mismo fichero que `import`: no hay una segunda salida en CJS', () => {
    const divergentes = condicionales
      .filter(([, e]) => e.import && e.default !== e.import)
      .map(([name]) => name);
    expect(divergentes).toEqual([]);
  });
});
