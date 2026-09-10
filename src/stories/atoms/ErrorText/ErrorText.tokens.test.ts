import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * La razón de ser del átomo es que un error suelto se lea igual que el de un
 * campo. Desde que todos los `*Field` pintan su error con este átomo (en vez
 * de una clase `__error` propia), esa igualdad ya no hay que comprobarla
 * comparando dos hojas de estilo: solo queda vigilar que `ErrorText` sigue
 * bebiendo del juego de tokens compartido (`--form-error-*`), no de un valor
 * propio.
 *
 * El estilo ya calculado por el navegador se comprueba en la story
 * «Test — la cara es la del error de un campo» (`test:stories`), que es donde
 * hay un motor de CSS de verdad.
 */

const repoRoot = fileURLToPath(new URL('../../../../', import.meta.url));
const lee = (ruta: string) => readFileSync(repoRoot + ruta, 'utf8');

/** Las declaraciones de un bloque, como pares propiedad → valor. */
function declaraciones(css: string, selector: string): Record<string, string> {
  const bloque = css.split(selector)[1]?.split('}')[0]?.split('{')[1];
  if (!bloque) throw new Error(`No se encontró el bloque de \`${selector}\``);
  return Object.fromEntries(
    bloque
      .split(';')
      .map((linea) => linea.split('/*')[0].trim())
      .filter(Boolean)
      .map((linea) => {
        const corte = linea.indexOf(':');
        return [linea.slice(0, corte).trim(), linea.slice(corte + 1).trim()];
      }),
  );
}

const PROPIEDADES = ['font-family', 'font-size', 'font-weight', 'line-height', 'color'];

describe('ErrorText — la cara del error de formulario', () => {
  const atomo = declaraciones(lee('src/stories/atoms/ErrorText/ErrorText.css'), '.error-text');

  it('gasta los tokens compartidos del error, no un valor propio', () => {
    for (const propiedad of PROPIEDADES) {
      expect(atomo[propiedad], propiedad).toBe(`var(--form-error-${propiedad})`);
    }
  });
});
