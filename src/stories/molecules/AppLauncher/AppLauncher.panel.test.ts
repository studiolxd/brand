import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * El panel del lanzador crece con su contenido: con doce aplicaciones se ve
 * entero, sin scroll. El ÚNICO tope es el hueco que de verdad queda en la
 * ventana —lo mide Base UI y lo publica en `--available-height`, y el token
 * `content-max-height` no hace más que nombrarlo—, y solo ahí el panel se
 * recorta y desplaza.
 *
 * Esto se vigila sobre la hoja y no desde una story porque lo que hay que
 * impedir es que vuelva a escribirse un tope A MANO (`max-height: 480px`, una
 * altura de N filas…): un tope artificial recorta la rejilla teniendo pantalla
 * de sobra, y en un runner con la ventana que sea no se distingue del tope
 * legítimo.
 */

const css = readFileSync(fileURLToPath(new URL('./AppLauncher.css', import.meta.url)), 'utf8');
const tokens = JSON.parse(
  readFileSync(fileURLToPath(new URL('../../../../tokens/component/app-launcher.json', import.meta.url)), 'utf8'),
) as { 'app-launcher': Record<string, { $value: string }> };

/** Las declaraciones `propiedad: valor` de la hoja, sin comentarios. */
function declaraciones(propiedad: string): string[] {
  const limpio = css.replace(/\/\*[\s\S]*?\*\//g, '');
  return [...limpio.matchAll(new RegExp(`${propiedad}\\s*:\\s*([^;]+);`, 'g'))].map((m) =>
    m[1]!.trim(),
  );
}

describe('el panel del lanzador crece con su contenido', () => {
  it('no declara ninguna altura máxima que no sea la de la ventana', () => {
    const topes = declaraciones('max-height');
    expect(topes.length, 'si desaparece el tope no queda nada que vigilar').toBeGreaterThan(0);
    for (const tope of topes) {
      expect(
        tope,
        'El panel no puede llevar un tope propio: recortaría la rejilla teniendo ' +
          'pantalla de sobra. El único límite es `--app-launcher-content-max-height`, ' +
          'que vale el hueco disponible de la ventana.\n  max-height: ' + tope,
      ).toContain('--app-launcher-content-max-height');
    }
  });

  it('el token del tope es el hueco disponible, no una medida fija', () => {
    expect(tokens['app-launcher']!['content-max-height']!.$value).toBe('var(--available-height)');
  });

  it('el scroll vive solo en el panel, nunca en la rejilla', () => {
    const limpio = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const conScroll = [...limpio.matchAll(/([^{}]+)\{([^}]*overflow-y\s*:\s*auto[^}]*)\}/g)].map((m) =>
      m[1]!.trim(),
    );
    expect(conScroll).toEqual(['.app-launcher__content']);
  });
});
