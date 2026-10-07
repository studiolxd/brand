import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Las sombras de la escala toman el color de `{color.prussian}` con una
 * opacidad propia (`shadow/brand-alpha`, en `sd.formats.mjs`). El valor
 * resuelto tiene que ser el mismo que cuando el rgba iba escrito a mano.
 */
const root = join(__dirname, '..');
const leer = (ruta: string) => readFileSync(join(root, ruta), 'utf8');

const ESPERADAS: Record<string, string> = {
  sm: '0 1px 2px rgba(17,30,48,0.08)',
  md: '0 2px 8px rgba(17,30,48,0.10)',
  lg: '0 4px 16px rgba(17,30,48,0.12)',
  xl: '0 8px 32px rgba(17,30,48,0.16)',
};

describe('sombras con el prusia de la paleta', () => {
  it('la fuente no lleva el color escrito: referencia al primitivo', () => {
    const fuente = JSON.parse(leer('tokens/shadow/scale.json'));
    for (const nombre of Object.keys(ESPERADAS)) {
      const token = fuente.shadow[nombre];
      expect(token.$value).not.toMatch(/rgba|#/i);
      expect(token.$value).toContain('{color.prussian}');
      expect(typeof token.$extensions['com.studiolxd'].alpha).toBe('number');
    }
  });

  it('CSS, SCSS y tokens.json salen con el valor resuelto de siempre', () => {
    const css = leer('src/tokens/global/shadow.css');
    const scss = leer('src/tokens/scss/global/_shadow.scss');
    const json = JSON.parse(leer('src/tokens/tokens.json')) as Record<string, string>;
    for (const [nombre, valor] of Object.entries(ESPERADAS)) {
      expect(css).toContain(`--shadow-${nombre}: ${valor};`);
      expect(scss).toContain(`$lxd-shadow-${nombre}: ${valor};`);
      expect(json[`--shadow-${nombre}`]).toBe(valor);
    }
  });
});
