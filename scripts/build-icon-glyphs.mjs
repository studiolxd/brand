/*
 * Publica cada glifo del catálogo `ICONS` (src/stories/atoms/Icon/Icon.tsx) como
 * un SVG suelto: `dist/assets/icons/glyphs/<nombre>.svg`, que el paquete sirve
 * por `@studiolxd/brand/assets/icons/glyphs/<nombre>.svg` (export `./assets/*`).
 *
 * Para quien no puede cargar el componente `Icon` —un reproductor exportado
 * (SCORM) que no lleva la hoja de brand, un tema que guarda iconos como
 * ficheros— pero quiere el mismo dibujo, no una aproximación de otra librería.
 *
 * Cada fichero es el `<svg>` que pinta `Icon`, sin clases ni hoja: retícula
 * `0 0 24 24`, `fill="none"`, `stroke="currentColor"` y las formas con sus
 * atributos de presentación (trazo de 1 que no escala, uniones redondas). Los
 * puntos (`dot`, `dots`, `grid`) siguen rellenos de `currentColor`, como en el
 * componente. Lee el mismo AST que `build-native-icons.mjs`
 * (`scripts/lib/icon-shapes.mjs`): las tres salidas no pueden divergir.
 *
 * Determinista: mismas entradas → mismos bytes (orden de atributos fijo, sin
 * fechas ni metadatos). Borra la carpeta antes de escribir, para que un glifo
 * retirado o renombrado no deje su fichero viejo. Entra en `build:all`, después
 * de `build:lib` (que vacía `dist/`), y por tanto en la comprobación de sync de
 * `release:check`.
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { readIcons } from './lib/icon-shapes.mjs';

export const GLYPHS_DIR = 'dist/assets/icons/glyphs';

/** Atributos de JSX → atributos de SVG, en el orden en que se escriben. */
const ATTRS = [
  ['d', 'd'],
  ['cx', 'cx'],
  ['cy', 'cy'],
  ['r', 'r'],
  ['x1', 'x1'],
  ['y1', 'y1'],
  ['x2', 'x2'],
  ['y2', 'y2'],
  ['fill', 'fill'],
  ['stroke', 'stroke'],
  ['strokeWidth', 'stroke-width'],
  ['strokeLinecap', 'stroke-linecap'],
  ['strokeLinejoin', 'stroke-linejoin'],
  ['vectorEffect', 'vector-effect'],
];
const KNOWN = new Set(ATTRS.map(([jsx]) => jsx));

const escape = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** El SVG suelto de un glifo de `readIcons()`. */
export function glyphSvg({ name, viewBox, shapes }) {
  if (viewBox !== '0 0 24 24') throw new Error(`${name}: viewBox ${viewBox}, se esperaba 0 0 24 24`);
  const body = shapes.map(({ tag, a }) => {
    const unknown = Object.keys(a).filter((k) => !KNOWN.has(k));
    if (unknown.length) throw new Error(`${name}: atributos sin traducir en <${tag}>: ${unknown.join(', ')}`);
    const attrs = ATTRS.filter(([jsx]) => a[jsx] !== undefined && a[jsx] !== null).map(([jsx, svg]) => `${svg}="${escape(a[jsx])}"`);
    return `  <${tag} ${attrs.join(' ')}/>`;
  });
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="${viewBox}" fill="none" stroke="currentColor">`,
    ...body,
    '</svg>',
    '',
  ].join('\n');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const icons = readIcons();
  rmSync(GLYPHS_DIR, { recursive: true, force: true });
  mkdirSync(GLYPHS_DIR, { recursive: true });
  for (const icon of icons) writeFileSync(`${GLYPHS_DIR}/${icon.name}.svg`, glyphSvg(icon));
  console.log(`✔︎ ${GLYPHS_DIR}/ (${icons.length} glifos)`);
}
