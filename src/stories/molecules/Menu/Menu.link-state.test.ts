import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Un ítem de menú que además es un enlace no se pinta como un enlace del
 * texto.
 *
 * `Link.css` estila TODO `<a>` que no sea un botón con un selector global
 * —`a:where(:not(.button)):hover`— que pone el color de enlace y el subrayado.
 * Ese selector pesa (0,1,1) más que `.menu__item` (0,1,0), así que en cuanto
 * el ítem entraba en estado se teñía: en superficie oscura, amarillo de marca
 * y subrayado, con el puntero encima o con el dedo en móvil antes de que Base
 * UI marque `data-highlighted` (visto en producción el 2026-09-14).
 *
 * Esto NO se puede vigilar desde una story: `userEvent.hover` de
 * testing-library es sintético y no enciende el `:hover` del motor de CSS, así
 * que la story pasaba igual con el defecto puesto. Se vigila aquí, sobre las
 * dos hojas: que exista la regla de neutralización y que gane en peso.
 */

const repoRoot = fileURLToPath(new URL('../../../../', import.meta.url));
const lee = (ruta: string) => readFileSync(repoRoot + ruta, 'utf8');

const menu = lee('src/stories/molecules/Menu/Menu.css');
const link = lee('src/stories/atoms/Link/Link.css');

/** Especificidad (ids, clases/atributos/pseudoclases, elementos) de un selector simple. */
function peso(selector: string): [number, number, number] {
  // `:where(...)` no suma; su contenido tampoco.
  const limpio = selector.replace(/:where\([^)]*\)/g, '');
  const ids = (limpio.match(/#[\w-]+/g) ?? []).length;
  const clases =
    (limpio.match(/\.[\w-]+/g) ?? []).length +
    (limpio.match(/\[[^\]]+\]/g) ?? []).length +
    // pseudoclases, menos las que no suman
    (limpio.match(/:(?!:)(?!where\b)[\w-]+(\([^)]*\))?/g) ?? []).filter(
      (p) => !p.startsWith(':not') && !p.startsWith(':is'),
    ).length +
    // `:not(...)` y `:is(...)` valen lo que su argumento más pesado
    (limpio.match(/:(?:not|is)\(([^)]*)\)/g) ?? []).reduce(
      (n, p) => n + peso(p.slice(p.indexOf('(') + 1, -1))[1],
      0,
    );
  const elementos = (limpio.match(/(^|[\s>+~])[a-z][\w-]*/g) ?? []).length;
  return [ids, clases, elementos];
}

const mayor = (a: [number, number, number], b: [number, number, number]) =>
  a[0] !== b[0] ? a[0] > b[0] : a[1] !== b[1] ? a[1] > b[1] : a[2] > b[2];

describe('un ítem de menú que es enlace', () => {
  it('Link.css sigue estilando todo <a> en hover (si no, este guardia sobra)', () => {
    expect(link).toContain('a:where(:not(.button)):hover');
  });

  it('Menu.css lo neutraliza, y con más peso que el selector global', () => {
    const globales = ['a:where(:not(.button)):hover', 'a:where(:not(.button))'];
    const neutraliza = [...menu.matchAll(/^([^{}\n]*:is\(a\)[^{}\n]*)\{/gm)].map((m) =>
      m[1]!.trim(),
    );

    expect(
      neutraliza.length,
      'Menu.css ya no trae ninguna regla para el ítem que es enlace: el ' +
        'selector global de Link.css volverá a teñirlo y subrayarlo en cuanto ' +
        'el ítem entre en estado.',
    ).toBeGreaterThan(0);

    for (const selector of neutraliza) {
      for (const global of globales) {
        expect(
          mayor(peso(selector), peso(global)),
          `«${selector}» no pesa más que «${global}»: el estilo de enlace ` +
            'volvería a ganar.',
        ).toBe(true);
      }
    }
  });

  it('no pisa el estado resaltado, que es del menú', () => {
    const neutraliza = [...menu.matchAll(/^([^{}\n]*:is\(a\)[^{}\n]*)\{/gm)].map((m) =>
      m[1]!.trim(),
    );
    for (const selector of neutraliza) {
      expect(
        selector.includes(':not([data-highlighted])'),
        `«${selector}» se aplicaría también al ítem resaltado y le quitaría ` +
          'su color.',
      ).toBe(true);
    }
  });
});
