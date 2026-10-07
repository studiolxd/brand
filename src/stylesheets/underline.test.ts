import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Norma 7 del DS — «El subrayado es `text-decoration`» (D64).
 *
 * Subrayar en el sistema es `text-decoration` con grosor y distancia de token
 * (`text-decoration-thickness`, `text-underline-position: under`,
 * `text-underline-offset`, `text-decoration-skip-ink`), con su hueco reservado
 * por `padding-block-end`; nunca una sombra interior (`box-shadow`) ni un
 * `background-image`. Motivos: se mantiene en alto contraste
 * (`forced-colors`), se imprime, lo reconocen las herramientas de
 * accesibilidad y respeta las hojas de usuario. Antes de D64 el subrayado era
 * una sombra interior: este test vigila que no vuelva.
 *
 * Barre los `.css` de `src/` en tres frentes:
 *  1. ninguna sombra pinta una línea de `currentColor` bajo el elemento —la
 *     firma del subrayado antiguo, `inset 0 calc(-1 * …) 0 0 currentColor`— ni
 *     lee un token de subrayado (`*-underline-*`);
 *  2. ningún `background-image` dibuja una línea con `currentColor`;
 *  3. toda regla que enciende el subrayado (`text-decoration-line` distinto de
 *     `none`) fija también su grosor y su distancia con tokens, y lo coloca bajo
 *     los descendentes; y nadie usa la shorthand `text-decoration: underline`,
 *     que deja grosor y posición en manos de la fuente.
 *
 * Una línea de estado que marca una CAJA y no un texto —la de hover de una
 * celda de `Calendar`, del botón de `NumberInput` o de la entrada de
 * `TableOfContents`, todas con su propio token de color— no es un subrayado y
 * queda fuera: no pinta `currentColor`.
 *
 * La regla completa, con el porqué, en Foundations → Bordes.
 */

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));

/**
 * Las excepciones de la norma, y solo esas. Ampliar esta lista es ampliar la
 * norma: quien añada una entrada escribe aquí el motivo.
 */
const EXCEPCIONES: { ruta: string; motivo: string }[] = [
  {
    ruta: 'src/vendor/normalize.css',
    motivo: 'Hoja de terceros: se distribuye tal cual y no se toca.',
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

/** Las declaraciones de cada bloque `{ … }` sin bloques anidados, con la línea donde empieza. */
function bloques(css: string): { linea: number; cuerpo: string }[] {
  const salida: { linea: number; cuerpo: string }[] = [];
  const re = /\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css))) {
    salida.push({ linea: css.slice(0, m.index).split('\n').length, cuerpo: m[1] });
  }
  return salida;
}

/** Una sombra que pinta el subrayado antiguo: línea de `currentColor` abajo, o un token de subrayado. */
const SOMBRA_SUBRAYADO = /box-shadow\s*:[^;]*(inset\s+0\s+calc\(\s*-1\s*\*[^;]*currentColor|-underline-)/;
/** Un fondo que dibuja la línea. */
const FONDO_SUBRAYADO = /background(-image)?\s*:[^;]*gradient\([^;]*currentColor/;
/** La shorthand con `underline`: grosor y posición quedarían en manos de la fuente. */
const SHORTHAND_SUBRAYADO = /(^|[\s;{])text-decoration\s*:[^;]*\bunderline\b/;

function comoArreglarlo(donde: string): string {
  return [
    `${donde}`,
    '',
    'Norma 7 del DS: el subrayado es `text-decoration` con grosor y distancia de token (D64).',
    'Sobre el elemento que se subraya:',
    '',
    '  padding-block-end: var(--<componente>-underline-offset);',
    '  text-decoration-line: underline;            /* o var(--<componente>-decoration-line) */',
    '  text-decoration-thickness: var(--<componente>-underline-width);',
    '  text-decoration-skip-ink: auto;',
    '  text-underline-position: under;',
    '  text-underline-offset: calc(var(--<componente>-underline-offset) - var(--<componente>-underline-width));',
    '',
    'Nunca `box-shadow` ni `background-image`. Un componente que viste sus propios',
    'enlaces anula la línea de la base con `text-decoration-line: none; padding-block-end: 0`.',
    'La regla completa, en Foundations → Bordes § «El subrayado es `text-decoration`».',
  ].join('\n');
}

describe('norma 7 — el subrayado es text-decoration con grosor y distancia de token', () => {
  const hojas = ficheros('src', '.css').filter((f) => !esExcepcion(f));

  it('ninguna sombra ni ningún fondo de src/ pinta un subrayado', () => {
    const infracciones: string[] = [];
    for (const fichero of hojas) {
      const lineas = sinComentarios(readFileSync(join(repoRoot, fichero), 'utf8')).split('\n');
      lineas.forEach((linea, i) => {
        if (SOMBRA_SUBRAYADO.test(linea) || FONDO_SUBRAYADO.test(linea) || SHORTHAND_SUBRAYADO.test(linea)) {
          infracciones.push(comoArreglarlo(`${fichero}:${i + 1} — ${linea.trim()}`));
        }
      });
    }
    expect(infracciones.length, infracciones.join('\n\n')).toBe(0);
  });

  it('toda regla que enciende el subrayado fija grosor, posición y distancia', () => {
    const infracciones: string[] = [];
    for (const fichero of hojas) {
      const css = sinComentarios(readFileSync(join(repoRoot, fichero), 'utf8'));
      for (const { linea, cuerpo } of bloques(css)) {
        // La propiedad, no una custom property que acabe igual (`--link-decoration-line`).
        const valor = cuerpo.match(/(?:^|[\s;])text-decoration-line\s*:\s*([^;]+)/)?.[1]?.trim();
        // Solo lo que subraya: `underline` o una variable que lo decide. Un
        // tachado (`line-through`, el de `Text`) no es un subrayado.
        if (!valor || !(/\bunderline\b/.test(valor) || valor.startsWith('var('))) continue;
        const falta = [
          /text-decoration-thickness\s*:\s*var\(/.test(cuerpo) ? null : 'text-decoration-thickness: var(--…)',
          /text-underline-offset\s*:\s*calc\(/.test(cuerpo) ? null : 'text-underline-offset: calc(<separación> - <grosor>)',
        ].filter(Boolean);
        // La posición se hereda (`text-underline-position` es heredable), así
        // que basta con que la ponga la regla de reposo; una regla de estado
        // (`:hover`, un tono) que solo cambia línea y grosor no la repite.
        if (falta.length) {
          infracciones.push(comoArreglarlo(`${fichero}:${linea} — text-decoration-line: ${valor} sin ${falta.join(' ni ')}`));
        }
      }
    }
    expect(infracciones.length, infracciones.join('\n\n')).toBe(0);
  });

  it('las reglas de reposo colocan la línea bajo los descendentes', () => {
    // Las piezas que dibujan el subrayado del sistema. Cada una lo coloca con
    // `text-underline-position: under`: sin él la línea cae en la posición que
    // decide la fuente, que es justo lo que la norma quiere evitar.
    const piezas = [
      'src/stories/atoms/Link/Link.css',
      'src/stories/atoms/Button/Button.css',
      'src/stories/molecules/SiteNav/SiteNav.css',
      'src/stories/molecules/ProjectCard/ProjectCard.css',
      'src/stories/organisms/SiteSearch/SiteSearch.css',
      'src/stories/molecules/Stepper/Stepper.css',
      'src/stories/molecules/LanguageSwitcher/LanguageSwitcher.css',
      'src/stories/molecules/ThemeSwitcher/ThemeSwitcher.css',
    ];
    for (const pieza of piezas) {
      const css = sinComentarios(readFileSync(join(repoRoot, pieza), 'utf8'));
      expect(css, pieza).toMatch(/text-underline-position\s*:\s*under/);
      expect(css, pieza).toMatch(/text-decoration-skip-ink\s*:\s*auto/);
    }
  });

  it('las excepciones son exactamente las de la norma', () => {
    expect(EXCEPCIONES.map(({ ruta }) => ruta)).toEqual(['src/vendor/normalize.css']);
  });
});
