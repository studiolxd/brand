import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DARK_SELECTORS } from '../../sd.formats.mjs';

/**
 * `color-scheme` va acoplado al tema del brand, no a la preferencia del SO.
 *
 * El modo oscuro del DS es exclusivamente por clase/atributo —los tres
 * selectores de `sd.formats.mjs` › `DARK_SELECTORS`— y no hay ni una
 * `@media (prefers-color-scheme: dark)` en todo el CSS generado. Anunciar
 * `color-scheme: light dark` le prometía al navegador un modo oscuro automático
 * que los tokens no cumplen: con el SO en oscuro y la app en claro, el motor
 * pintaba en oscuro todo lo que no podemos repintar —scrollbars, pickers
 * nativos de fecha/hora, el desplegable nativo de un `<select>` y el fondo de
 * autofill— por encima de un CSS que seguía calculando en claro. Los campos
 * autorrellenados salían como barras negras ilegibles.
 *
 * Es una regresión silenciosa: nada peta, solo se ve mal, y solo en una
 * combinación concreta de SO y tema. De ahí este test, hermano del de la
 * norma 7 (`underline.test.ts`).
 *
 * La regla completa, con el porqué, en Foundations → Colores § «Tema claro y
 * oscuro» › «El chrome nativo va con el lienzo».
 */

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));

const BASE_CSS = 'src/stylesheets/base.css';

/** Ficheros de un árbol con la extensión dada, en rutas relativas al repo y con `/`. */
function ficheros(dir: string, extension: string): string[] {
  const salida: string[] = [];
  const recorrer = (actual: string) => {
    for (const entrada of readdirSync(actual)) {
      const ruta = join(actual, entrada);
      if (statSync(ruta).isDirectory()) recorrer(ruta);
      else if (entrada.endsWith(extension)) salida.push(relative(repoRoot, ruta).split(sep).join('/'));
    }
  };
  recorrer(join(repoRoot, dir));
  return salida.sort();
}

/**
 * Vacía los comentarios `/* … *\/` conservando los saltos de línea, para que
 * los números de línea sigan siendo los del fichero. Sin esto, el comentario
 * que explica la regla —y que cita `light dark` para contar qué se retiró—
 * haría fallar el test.
 */
function sinComentarios(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, (bloque) => bloque.replace(/[^\n]/g, ' '));
}

const leer = (rutaRelativa: string) =>
  sinComentarios(readFileSync(join(repoRoot, rutaRelativa), 'utf8'));

/** `color-scheme: light dark`, `dark light`, `only light dark`… */
const AMBOS_ESQUEMAS = /color-scheme\s*:[^;{}]*\blight\b[^;{}]*\bdark\b|color-scheme\s*:[^;{}]*\bdark\b[^;{}]*\blight\b/;

describe('color-scheme sigue al tema del brand, no al SO', () => {
  it('ningún CSS de src/ anuncia los dos esquemas a la vez', () => {
    const infracciones: string[] = [];

    for (const fichero of ficheros('src', '.css')) {
      leer(fichero)
        .split('\n')
        .forEach((linea, i) => {
          if (AMBOS_ESQUEMAS.test(linea)) {
            infracciones.push(
              [
                `${fichero}:${i + 1} — ${linea.trim()}`,
                '',
                '`color-scheme: light dark` le dice al navegador que siga la preferencia',
                'del SO, y el DS no la sigue: voltea por clase/atributo. El chrome nativo',
                'acaba oscuro sobre un CSS claro (de ahí las barras negras del autofill).',
                'La declaración va en `html` con el esquema que el brand pinta ahora mismo,',
                'y su par oscuro bajo los selectores de `DARK_SELECTORS`.',
              ].join('\n'),
            );
          }
        });
    }

    expect(infracciones.length, infracciones.join('\n\n')).toBe(0);
  });

  it('base.css declara el esquema claro en html', () => {
    expect(leer(BASE_CSS)).toMatch(/html\s*\{[^}]*color-scheme\s*:\s*light\s*;/);
  });

  it('el par oscuro cubre exactamente los selectores que voltean los tokens', () => {
    const bloque = leer(BASE_CSS).match(/([^}]*?)\{\s*color-scheme\s*:\s*dark\s*;\s*\}/);

    expect(bloque, `${BASE_CSS} no declara ningún \`color-scheme: dark\``).not.toBeNull();

    const selectores = bloque![1]
      .split(',')
      .map((selector) => selector.trim())
      .filter(Boolean);

    // Contra la fuente de verdad: si `DARK_SELECTORS` gana un selector y nadie
    // lo trae aquí, el chrome nativo se queda claro en ese tema sin avisar.
    expect(selectores).toEqual(DARK_SELECTORS);
  });
});
