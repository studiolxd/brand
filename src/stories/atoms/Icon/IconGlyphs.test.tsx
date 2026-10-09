import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon, ICON_NAMES } from './Icon';

/*
 * Los SVG sueltos de `dist/assets/icons/glyphs/` (scripts/build-icon-glyphs.mjs)
 * son el mismo dibujo que pinta `Icon`. Que estén al día con `src/` lo vigila
 * `release:check` (`git status -- dist` limpio tras `build:all`); aquí, que no
 * falte ni sobre ninguno y que cada uno lleve las formas del componente.
 */
// En jsdom `import.meta.url` no es `file:`: la ruta sale de la raíz del repo, donde corre vitest.
const DIR = resolve(process.cwd(), 'dist/assets/icons/glyphs');
const leer = (nombre: string) => readFileSync(resolve(DIR, `${nombre}.svg`), 'utf8');

/** Las formas de un `<svg>`: etiqueta y geometría, en orden. */
const GEOMETRIA = ['d', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2', 'fill', 'stroke'];
const formas = (svg: Element) =>
  [...svg.children].map((el) => ({
    tag: el.tagName.toLowerCase(),
    ...Object.fromEntries(GEOMETRIA.filter((a) => el.hasAttribute(a)).map((a) => [a, el.getAttribute(a)])),
  }));

describe('glifos sueltos (dist/assets/icons/glyphs)', () => {
  it('hay un fichero por cada nombre de ICON_NAMES, y ninguno más', () => {
    const ficheros = readdirSync(DIR).filter((f) => f.endsWith('.svg')).map((f) => f.slice(0, -4));
    expect([...ficheros].sort()).toEqual([...ICON_NAMES].sort());
  });

  it.each(ICON_NAMES)('%s: retícula de 24, currentColor, sin relleno ni hoja, y las formas de Icon', (name) => {
    const fuente = leer(name);
    const doc = new DOMParser().parseFromString(fuente, 'image/svg+xml');
    const svg = doc.documentElement;
    expect(svg.tagName).toBe('svg');
    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svg.getAttribute('fill')).toBe('none');
    expect(svg.getAttribute('stroke')).toBe('currentColor');
    expect(fuente).not.toMatch(/<style|class=|style=|<link|@import/);

    const { container } = render(<Icon name={name} />);
    expect(formas(svg)).toEqual(formas(container.querySelector('svg')!));
  });
});
