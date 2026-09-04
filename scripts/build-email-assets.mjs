/*
 * Prepara `public/email/`, la carpeta que hay que publicar en el host de assets
 * del correo (`https://slxd.app/brand/email` por defecto): el logotipo y la
 * cara latina de la sans, las dos únicas cosas que un correo pide por URL.
 *
 * Por qué un PNG y no el SVG que usa la web:
 *
 * - Gmail y Outlook no renderizan SVG. Un correo con el isotipo vectorial se
 *   ve sin marca en los dos clientes que más pesan.
 * - El fondo blanco va HORNEADO en el píxel, con su aire alrededor. Outlook
 *   Windows y Gmail Android invierten colores por su cuenta en modo oscuro y
 *   un `background-color: #fff` no sobrevive a esa inversión; una imagen sí.
 * - Se exporta a 2x y se sirve con `width`/`height` explícitos, para que se vea
 *   nítido en pantallas densas sin que el cliente tenga que adivinar el hueco.
 * - El nombre lleva versión (`logo-v1.png`). Gmail proxea y cachea las imágenes
 *   de los correos y no hay forma de forzar un refresco: cambiar el logotipo
 *   obliga a publicar una URL nueva. Si algún día cambia, se sube `logo-v2.png`
 *   y se cambia el nombre aquí y en `EMAIL_LOGO_FILENAME`.
 *
 * Las medidas salen de los tokens (`--email-logo-mark-size`, `--email-logo-padding`,
 * `--logo-color`), así que la imagen y los atributos `width`/`height` que emite
 * `EmailBrandHeader` no pueden separarse: los dos leen el mismo sitio.
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

import tokens from '../src/tokens/tokens.json' with { type: 'json' };

const OUT = 'public/email/logo-v1.png';
const SOURCE = 'src/assets/logomark.svg';
/* La fuente va versionada por lo mismo que el logotipo: el cliente la cachea. */
const FONT_SOURCE = 'src/assets/fonts/google-sans-flex/google-sans-flex-normal-latin.woff2';
const FONT_OUT = 'public/email/google-sans-flex-normal-latin-v1.woff2';
/** Factor de exportación: el PNG se genera al doble del tamaño al que se ve. */
const SCALE = 2;

const px = (name) => {
  const value = tokens[name];
  if (value === undefined) throw new Error(`Token desconocido: ${name}`);
  const rem = value.match(/^(-?[\d.]+)rem$/);
  return rem ? Number(rem[1]) * 16 : Number(value.replace('px', ''));
};

const markSize = px('--email-logo-mark-size');
const padding = px('--email-logo-padding');
const boxSize = markSize + padding * 2;
const ink = tokens['--logo-color'];
const paper = tokens['--email-light-bg'];

/* El isotipo de la web, tal cual: solo se le quita el envoltorio para
   recolocarlo. Su viewBox no arranca en el origen, así que hay que trasladarlo
   antes de escalarlo. */
const source = readFileSync(SOURCE, 'utf-8');
const viewBox = source.match(/viewBox="([^"]+)"/)?.[1];
if (!viewBox) throw new Error(`${SOURCE} no declara viewBox`);
const [minX, minY, vbWidth, vbHeight] = viewBox.split(/[\s,]+/).map(Number);
if (vbWidth !== vbHeight) throw new Error(`El isotipo dejó de ser cuadrado: ${viewBox}`);

const paths = [...source.matchAll(/<path\b[^>]*\/>/g)].map((m) => m[0]);
if (paths.length === 0) throw new Error(`${SOURCE} no tiene paths`);

const side = boxSize * SCALE;
const markSide = markSize * SCALE;
const offset = padding * SCALE;
const ratio = markSide / vbWidth;

const composed = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="${side}" height="${side}" viewBox="0 0 ${side} ${side}">`,
  `  <rect width="${side}" height="${side}" fill="${paper}"/>`,
  `  <g transform="translate(${offset} ${offset}) scale(${ratio}) translate(${-minX} ${-minY})" fill="${ink}">`,
  ...paths.map((p) => `    ${p.replace(/\s*fill="[^"]*"/, '')}`),
  '  </g>',
  '</svg>',
].join('\n');

mkdirSync(dirname(OUT), { recursive: true });
const tmp = `${OUT}.svg`;
writeFileSync(tmp, `${composed}\n`);
try {
  execFileSync('magick', [
    '-background', paper, '-density', '288', tmp,
    '-resize', `${side}x${side}`,
    // 8 bits y sin metadatos: el PNG viaja en cada correo enviado.
    '-depth', '8', '-strip', OUT,
  ]);
} finally {
  execFileSync('rm', ['-f', tmp]);
}

console.log(`✔︎ ${OUT} — ${side}×${side} px (se ve a ${boxSize}×${boxSize})`);

/* Solo la cara latina: es la que cubre el castellano y el resto de idiomas de
   la suite, y un correo no es sitio para bajarse dos ficheros de fuente. */
copyFileSync(FONT_SOURCE, FONT_OUT);
console.log(`✔︎ ${FONT_OUT}`);
