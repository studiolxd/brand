/*
 * Prepara los assets del correo (logotipo y cara latina de la sans) en DOS
 * destinos, mismo origen:
 *
 * - `dist/assets/email/` — lo que viaja en el paquete publicado (subpath
 *   `@studiolxd/brand/assets/email/...`, ver `BRAND_EMAIL_ASSETS` en
 *   `src/assets/brand-assets.ts`), que es lo que el host de assets del correo
 *   (`https://slxd.app/brand/email` por defecto) sirve en producción — mismo
 *   mecanismo que `dist/assets/icons/` para los iconos de aplicación.
 * - `public/email/` — para que Storybook enseñe el correo en local
 *   (`assetsBaseUrl="/email"` en las stories) sin depender de que el paquete
 *   esté publicado.
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
 *   y se cambia el nombre en `EMAIL_LOGO_FILENAME` (`src/assets/brand-assets.ts`),
 *   fuente única de la que lee este script y `emailTheme.ts`.
 *
 * Las medidas salen de los tokens (`--email-logo-mark-size`, `--email-logo-padding`,
 * `--logo-color`), así que la imagen y los atributos `width`/`height` que emite
 * `EmailBrandHeader` no pueden separarse: los dos leen el mismo sitio.
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { EMAIL_FONT_FILENAME, EMAIL_LOGO_FILENAME } from '../src/assets/brand-assets.ts';
import tokens from '../src/tokens/tokens.json' with { type: 'json' };

const SOURCE = 'src/assets/logomark.svg';
/* La fuente va versionada por lo mismo que el logotipo: el cliente la cachea. */
const FONT_SOURCE = 'src/assets/fonts/google-sans-flex/google-sans-flex-normal-latin.woff2';
/** Factor de exportación: el PNG se genera al doble del tamaño al que se ve. */
const SCALE = 2;

const px = (name) => {
  const value = tokens[name];
  if (value === undefined) throw new Error(`Token desconocido: ${name}`);
  const rem = value.match(/^(-?[\d.]+)rem$/);
  return rem ? Number(rem[1]) * 16 : Number(value.replace('px', ''));
};

/**
 * Genera el PNG del logotipo y copia la fuente en los dos destinos dados.
 * Recibe los directorios de salida por parámetro (en vez de leerlos de una
 * constante) para que el test pueda apuntar a un directorio temporal, igual
 * que `buildIcons` en `scripts/build-icons.mjs`.
 */
export function buildEmailAssets({ distOutDir = 'dist/assets/email', publicOutDir = 'public/email' } = {}) {
  const markSize = px('--email-logo-mark-size');
  const padding = px('--email-logo-padding');
  const boxSize = markSize + padding * 2;
  const ink = tokens['--logo-color'];
  /* `--email-bg`: el fondo de la caja (banda de marca incluida), no
     `--email-canvas-bg` (el lienzo fuera de la caja) — el logotipo vive dentro
     del `Container` de marca. El token `--email-light-bg` que leía esto no
     existe desde que se retiró el modo oscuro del correo (paleta única). */
  const paper = tokens['--email-bg'];

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

  const logoOutputs = [distOutDir, publicOutDir].map((dir) => `${dir}/${EMAIL_LOGO_FILENAME}`);

  mkdirSync(distOutDir, { recursive: true });
  mkdirSync(publicOutDir, { recursive: true });

  const primaryOut = logoOutputs[0];
  const tmp = `${primaryOut}.svg`;
  writeFileSync(tmp, `${composed}\n`);
  try {
    execFileSync('magick', [
      '-background', paper, '-density', '288', tmp,
      '-resize', `${side}x${side}`,
      // 8 bits y sin metadatos: el PNG viaja en cada correo enviado.
      '-depth', '8', '-strip', primaryOut,
    ]);
  } finally {
    execFileSync('rm', ['-f', tmp]);
  }
  for (const secondaryOut of logoOutputs.slice(1)) copyFileSync(primaryOut, secondaryOut);

  for (const out of logoOutputs) console.log(`✔︎ ${out} — ${side}×${side} px (se ve a ${boxSize}×${boxSize})`);

  /* Solo la cara latina: es la que cubre el castellano y el resto de idiomas de
     la suite, y un correo no es sitio para bajarse dos ficheros de fuente. */
  const fontOutputs = [distOutDir, publicOutDir].map((dir) => `${dir}/${EMAIL_FONT_FILENAME}`);
  for (const fontOut of fontOutputs) {
    copyFileSync(FONT_SOURCE, fontOut);
    console.log(`✔︎ ${fontOut}`);
  }

  return { files: [...logoOutputs, ...fontOutputs] };
}

const isMain = process.argv[1] && import.meta.url === new URL(process.argv[1], 'file:').href;
if (isMain) {
  buildEmailAssets();
}
