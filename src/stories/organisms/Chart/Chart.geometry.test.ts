/**
 * `Chart.tsx` lleva en `GEOMETRY` un espejo en JS de los tokens `--chart-*`:
 * los números que hacen falta para calcular una `d` de path o el ancho de una
 * banda, que el CSS no puede dar. El espejo se escribe a mano («si cambia el
 * token, cambia aquí»), así que este test lo compara con `tokens.json` —el
 * mismo mapa resuelto que sale al `:root`— para que no se desincronice en
 * silencio.
 *
 * Lee el fuente en vez de importar el objeto: `GEOMETRY` no se exporta, y
 * exportarlo desde el módulo del componente rompería el Fast Refresh.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { tokenPx } from '../../../tokens/tokens';

const fuente = readFileSync(fileURLToPath(new URL('./Chart.tsx', import.meta.url)), 'utf8');

/** Cada entrada: `/** \`--chart-a\` / \`--chart-b\` *\/ nombre: valor,` */
function geometria(): Array<{ nombre: string; valor: number; tokens: string[] }> {
  const bloque = /const GEOMETRY = \{([\s\S]*?)\} as const;/.exec(fuente)?.[1];
  if (!bloque) throw new Error('No se encuentra `const GEOMETRY = { … } as const` en Chart.tsx');
  return [...bloque.matchAll(/\/\*\*(.*?)\*\/\s*(\w+):\s*([\d.]+)/g)].map((m) => ({
    nombre: m[2]!,
    valor: Number(m[3]),
    tokens: [...m[1]!.matchAll(/`(--chart-[\w-]+)`/g)].map((t) => t[1]!),
  }));
}

/** El valor del token en px (o sin unidad), como número. */
function numero(token: string): number {
  return Number.parseFloat(tokenPx(token));
}

/**
 * Desajustes ya existentes cuando se escribió el test. Se fijan aquí con su
 * valor actual para que el test pase sin cambiar el dibujo, y para que, el día
 * que se corrijan, el test obligue a borrar la excepción.
 *
 * - `dotSize`: el token `chart.dot-size` apunta a `{spacing.3}` (0.75rem =
 *   12px) pero su propia descripción dice «10px de diámetro nominal», y el
 *   componente dibuja 10. Pendiente de decidir cuál de los dos manda.
 */
const DESAJUSTES_CONOCIDOS: Record<string, { geometria: number; token: number }> = {
  dotSize: { geometria: 10, token: 12 },
};

describe('Chart: GEOMETRY sigue a los tokens --chart-*', () => {
  const entradas = geometria();

  it('encuentra todas las entradas, cada una con su token', () => {
    expect(entradas.length).toBeGreaterThanOrEqual(12);
    for (const { nombre, tokens } of entradas) {
      expect(tokens.length, `${nombre} no nombra su token en el comentario`).toBeGreaterThan(0);
    }
  });

  for (const { nombre, valor, tokens } of geometria()) {
    for (const token of tokens) {
      const conocido = DESAJUSTES_CONOCIDOS[nombre];
      if (conocido) {
        it(`${nombre} ↔ ${token}: desajuste conocido, sin cambios`, () => {
          expect(valor).toBe(conocido.geometria);
          expect(numero(token)).toBe(conocido.token);
        });
      } else {
        it(`${nombre} = ${token}`, () => {
          expect(valor, `GEOMETRY.${nombre} no coincide con ${token} (${tokenPx(token)})`).toBe(numero(token));
        });
      }
    }
  }
});
