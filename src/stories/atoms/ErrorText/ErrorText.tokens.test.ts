import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * La razón de ser del átomo es que un error suelto se lea igual que el de un
 * campo. Eso no es una coincidencia de valores: es que las dos reglas beben del
 * MISMO juego de tokens compartido (`--form-error-*`), del que ya cuelga cada
 * `*Field` por su alias propio. Este test lo vigila leyendo el CSS: si alguien
 * cablea un valor o cambia una de las dos caras, salta.
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
  const campo = declaraciones(
    lee('src/stories/molecules/InputField/InputField.css'),
    '.input-field__error',
  );
  const alias = lee('src/tokens/molecules/input-field.css');

  it('gasta los tokens compartidos del error, no un valor propio', () => {
    for (const propiedad of PROPIEDADES) {
      expect(atomo[propiedad], propiedad).toBe(`var(--form-error-${propiedad})`);
    }
  });

  it('son los mismos tokens que gasta el error de un campo', () => {
    for (const propiedad of PROPIEDADES) {
      // El campo apunta a su alias (`--input-field-error-*`), que en el CSS de
      // tokens no es más que el token compartido con otro nombre.
      const aliasDelCampo = campo[propiedad];
      expect(aliasDelCampo, propiedad).toMatch(/^var\(--input-field-error-/);
      const nombre = aliasDelCampo.slice('var('.length, -1);
      expect(alias, `${nombre} debe colgar del token compartido`).toContain(
        `${nombre}: ${atomo[propiedad]};`,
      );
    }
  });
});
