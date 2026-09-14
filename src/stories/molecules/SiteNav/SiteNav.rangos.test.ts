import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * El reparto del sobrante de cada tramo se queda en su tramo.
 *
 * Las medias queries de `min-width` se acumulan, y las reglas que reparten la
 * última fila llevan dos pseudoclases: pesan más que la regla del tramo
 * siguiente. Sin cerrar el rango se cuelan hacia arriba — así, con cinco
 * grupos, el quinto conservaba en el breakpoint ancho el `span 6` del tramo de
 * tres columnas, se iba solo a una segunda fila y abría un tramo de 0px
 * (visto en producción el 2026-09-14).
 *
 * No se vigila desde una story porque el runner no fija el ancho del viewport:
 * la story que había solo podía comprobar el atributo `data-columns`, que
 * estaba bien. Lo que fallaba era la cascada, y eso se lee aquí.
 */

const css = readFileSync(
  fileURLToPath(new URL('./SiteNav.css', import.meta.url)),
  'utf8',
);

/** Los bloques `@media` del fichero, con su condición y su contenido. */
function bloques(): { condicion: string; cuerpo: string }[] {
  const salida: { condicion: string; cuerpo: string }[] = [];
  for (const m of css.matchAll(/@media([^{]+)\{/g)) {
    let nivel = 0;
    let i = m.index + m[0].length - 1;
    const inicio = i;
    for (; i < css.length; i++) {
      if (css[i] === '{') nivel++;
      else if (css[i] === '}') {
        nivel--;
        if (nivel === 0) break;
      }
    }
    salida.push({ condicion: m[1]!.trim(), cuerpo: css.slice(inicio + 1, i) });
  }
  return salida;
}

describe('los repartos de la última fila del SiteNav', () => {
  const conReparto = bloques().filter(({ cuerpo }) =>
    /:nth-child\([^)]*\):(?:last-child|nth-last-child)/.test(cuerpo),
  );

  it('se encuentran (si no, el guardia no vigila nada)', () => {
    expect(conReparto.length).toBeGreaterThan(0);
  });

  it('viven en un rango cerrado, para no colarse en el tramo siguiente', () => {
    const desde = (condicion: string) =>
      Number(/min-width:\s*(\d+)/.exec(condicion)?.[1] ?? 0);

    // El tramo más ancho no tiene tramo siguiente al que colarse: ese puede
    // quedarse abierto, y de hecho debe.
    const ultimo = Math.max(...conReparto.map(({ condicion }) => desde(condicion)));

    const abiertos = conReparto
      .map(({ condicion }) => condicion)
      .filter((condicion) => desde(condicion) !== ultimo && !/max-width/.test(condicion));

    expect(
      abiertos,
      'Estos tramos reparten la última fila con un `@media` de solo `min-width`: ' +
        'esas reglas pesan más que las del tramo siguiente y se cuelan hacia ' +
        'arriba, descolocando la última fila en pantallas anchas. Ciérrales el ' +
        'rango con un max-width:\n  @media ' +
        abiertos.join('\n  @media '),
    ).toEqual([]);
  });
});
