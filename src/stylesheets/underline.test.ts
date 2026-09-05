import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Norma 7 del DS — «El subrayado es una línea, no `text-decoration`».
 *
 * Subrayar en el sistema es pintar una línea bajo el elemento
 * (`box-shadow: inset 0 calc(-1 * <grosor>) 0 0 currentColor` más su hueco con
 * `padding-block-end`), nunca `text-decoration: underline`. Dos motivos:
 * `text-decoration` no cubre un SVG —un enlace o un botón con icono queda con
 * la línea cortada bajo el texto y ausente bajo el icono— y su grosor y su
 * posición los deciden la fuente y el navegador, así que los subrayados del
 * sistema no salen todos iguales.
 *
 * Este test barre las dos vías por las que el subrayado entraba: el CSS de
 * `src/` y los JSON de `tokens/`. La segunda no es teórica —el
 * `--breadcrumb-link-text-decoration-hover` valía `underline` y no aparecía
 * buscando en el CSS, porque el valor vivía en el JSON del token.
 *
 * La regla completa, con el porqué, en Foundations → Bordes.
 */

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));

/**
 * Las DOS excepciones de la norma, y solo esas. Ampliar esta lista es ampliar
 * la norma: quien añada una entrada escribe aquí el motivo por el que el
 * subrayado del sistema no es aplicable en ese sitio.
 */
const EXCEPCIONES: { ruta: string; motivo: string }[] = [
  {
    ruta: 'src/vendor/normalize.css',
    motivo: 'Hoja de terceros: se distribuye tal cual y no se toca.',
  },
  {
    ruta: 'src/stories/email/',
    motivo:
      'El medio no es un navegador. Outlook renderiza con el motor de Word, que no pinta `box-shadow`, y el correo no tiene hoja de estilos donde poner la línea: ahí el enlace se subraya con `text-decoration` y se desubraya en hover, que es el mismo dibujo con la única técnica disponible.',
  },
];

const esExcepcion = (rutaRelativa: string) =>
  EXCEPCIONES.some(({ ruta }) => rutaRelativa === ruta || rutaRelativa.startsWith(ruta));

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
 * los números de línea sigan siendo los del fichero. Sin esto, un comentario
 * que cite la norma (los hay, y deben poder citarla) haría fallar el test.
 */
function sinComentarios(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, (bloque) => bloque.replace(/[^\n]/g, ' '));
}

/** `text-decoration: underline`, `text-decoration-line: underline`, `underline dotted`… */
const CSS_SUBRAYADO = /text-decoration(-line)?\s*:[^;{}]*\bunderline\b/;

/** El valor de un token, sin mirar su `$description` —que sí puede citar la norma—. */
const JSON_VALOR = /"\$value"\s*:\s*"([^"]*)"/;

/**
 * Un valor infringe la norma cuando dice la palabra clave CSS `underline`, no
 * cuando referencia un token que la lleva en el nombre: `{link.underline-width}`
 * es el grosor de la línea del sistema, que es justo lo que la norma manda usar.
 */
const valorSubraya = (valor: string) => /\bunderline\b/.test(valor.replace(/\{[^}]*\}/g, ''));

function comoArreglarlo(donde: string): string {
  return [
    `${donde}`,
    '',
    'Norma 7 del DS: el subrayado es una línea, no `text-decoration`.',
    'En su lugar, sobre el elemento que se subraya:',
    '',
    '  padding-block-end: var(--link-underline-offset);',
    '  box-shadow: inset 0 calc(-1 * var(--<componente>-underline-width)) 0 0 currentColor;',
    '',
    'El grosor y la separación van en tokens propios del componente que apuntan',
    'a `border-width.default` y a `link.underline-offset`, nunca a un número.',
    'Un componente que viste sus propios enlaces anula antes la línea de la base',
    'con `box-shadow: none; padding-block-end: 0`.',
    'La regla completa, en Foundations → Bordes § «El subrayado es una línea».',
    '',
    'Las únicas excepciones son `src/vendor/normalize.css` y `src/stories/email/`',
    `(ver EXCEPCIONES en ${relative(repoRoot, fileURLToPath(import.meta.url)).split(sep).join('/')}).`,
  ].join('\n');
}

describe('norma 7 — el subrayado es una línea, no text-decoration', () => {
  it('ningún CSS de src/ subraya con text-decoration', () => {
    const infracciones: string[] = [];

    for (const fichero of ficheros('src', '.css')) {
      if (esExcepcion(fichero)) continue;
      const lineas = sinComentarios(readFileSync(join(repoRoot, fichero), 'utf8')).split('\n');
      lineas.forEach((linea, i) => {
        if (CSS_SUBRAYADO.test(linea)) {
          infracciones.push(comoArreglarlo(`${fichero}:${i + 1} — ${linea.trim()}`));
        }
      });
    }

    expect(infracciones.length, infracciones.join('\n\n')).toBe(0);
  });

  it('ningún token de tokens/ vale underline', () => {
    const infracciones: string[] = [];

    for (const fichero of ficheros('tokens', '.json')) {
      const lineas = readFileSync(join(repoRoot, fichero), 'utf8').split('\n');
      lineas.forEach((linea, i) => {
        const valor = linea.match(JSON_VALOR)?.[1];
        if (valor && valorSubraya(valor)) {
          infracciones.push(comoArreglarlo(`${fichero}:${i + 1} — "$value": "${valor}"`));
        }
      });
    }

    expect(infracciones.length, infracciones.join('\n\n')).toBe(0);
  });

  it('las excepciones son exactamente las dos de la norma', () => {
    expect(EXCEPCIONES.map(({ ruta }) => ruta)).toEqual([
      'src/vendor/normalize.css',
      'src/stories/email/',
    ]);
  });
});
