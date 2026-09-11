/*
 * Genera el juego de iconos de la suite a partir del isotipo (`logomark-safe.svg`
 * / `logomark.svg`) sobre el violeta de marca: un solo favicon para todas las
 * apps de slxd, sin variantes por producto (decisión 2026-09-11).
 *
 * Por qué estos dos colores y de dónde salen — mismo criterio que la regla 8 de
 * CLAUDE.md para el aviso del DS (relleno claro + tinta prusia, nunca tinta
 * suelta): fondo `color.lavender` (`#BAABFF`, ya usado como `color.accent-1` —
 * la paleta no tiene un primitivo "violeta" y este es el más cercano por
 * familia) + isotipo en `color.primary` (`#111E30`, el prusia). Ninguno de los
 * dos es un hex a mano (regla 9 de CLAUDE.md): los dos son primitivos/roles ya
 * existentes en `tokens/color/`.
 *
 * Salidas, todas en `dist/assets/icons/`:
 *   - icon.svg                 — el isotipo con margen del 10 % (logomark-safe)
 *                                 sobre un cuadrado del violeta de marca.
 *   - favicon.ico               — 16/32/48, empaquetado como PNG-en-ICO.
 *   - icon-192.png, icon-512.png — mismo dibujo que icon.svg, rasterizado.
 *   - icon-512-maskable.png     — margen del 20 % (spec "maskable": el contenido
 *                                 visible debe caber en el 80 % central del icono
 *                                 — ver W3C Web App Manifest § maskable icons).
 *   - apple-touch-icon.png      — 180×180, sin transparencia (fondo violeta sólido).
 *   - manifest.webmanifest      — referencia los PNG anteriores; name/short_name
 *                                 genéricos ("SLXD"), los sobrescribe cada app.
 *
 * Además copia icon.svg a public/favicon.svg, el favicon del propio Storybook.
 *
 * Determinista: mismas entradas → mismos bytes. No lleva timestamps ni
 * metadata de editor. Entra en `build:all` (después de que exista
 * `src/assets/logomark-safe.svg`; no depende de `build:lib`) y por tanto en la
 * comprobación de sync de `release:check`.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import tokens from '../src/tokens/tokens.json' with { type: 'json' };

const OUT_DIR = 'dist/assets/icons';
const STORYBOOK_FAVICON = 'public/favicon.svg';
/* Copia de descarga para Foundations → Marca: Storybook sirve `public/` tal
   cual, así que los enlaces de la doc (`/brand/...`) resuelven en dev y en el
   estático sin pasar por el paquete publicado. */
const STORYBOOK_BRAND_DIR = 'public/brand';

/** El violeta de marca: el primitivo de paleta más cercano a "violeta" (ver cabecera). */
export const BRAND_ICON_BG = tokens['--color-lavender'];
/** La tinta del isotipo: `color.primary` (el prusia) sobre el relleno lavanda — mismo criterio que el aviso del DS (regla 8 de CLAUDE.md). */
export const BRAND_ICON_INK = tokens['--color-primary'];

function readSvgPaths(source) {
  const raw = readFileSync(source, 'utf-8');
  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1];
  if (!viewBox) throw new Error(`${source} no declara viewBox`);
  const [minX, minY, width, height] = viewBox.split(/[\s,]+/).map(Number);
  if (width !== height) throw new Error(`${source} dejó de ser cuadrado: ${viewBox}`);
  const paths = [...raw.matchAll(/<path\b[^>]*\/>/g)].map((m) => m[0].replace(/\s*fill="[^"]*"/, ''));
  if (paths.length === 0) throw new Error(`${source} no tiene paths`);
  return { minX, minY, size: width, paths };
}

/**
 * Compone un SVG cuadrado: fondo violeta de marca + isotipo en tinta prusia,
 * con un margen (`marginRatio`, 0–0.5 por lado) adicional sobre el que ya
 * trae la fuente. `side` es el tamaño del lienzo en unidades de usuario del
 * SVG resultante (no depende de a qué píxel se rasterice luego).
 */
export function composeIconSvg(source, { side = 512, marginRatio = 0 } = {}) {
  const { minX, minY, size, paths } = readSvgPaths(source);
  const inset = side * marginRatio;
  const content = side - inset * 2;
  const scale = content / size;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${side}" height="${side}" viewBox="0 0 ${side} ${side}">`,
    `  <rect width="${side}" height="${side}" fill="${BRAND_ICON_BG}"/>`,
    `  <g fill="${BRAND_ICON_INK}" transform="translate(${inset} ${inset}) scale(${scale}) translate(${-minX} ${-minY})">`,
    ...paths.map((p) => `    ${p}`),
    '  </g>',
    '</svg>',
    '',
  ].join('\n');
}

/** Empaqueta uno o más PNG en un `.ico` (formato PNG-en-ICO, soportado desde Windows Vista y por todos los navegadores actuales). */
export function packIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  const dirSize = headerSize + entrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  const images = [];
  let offset = dirSize;

  for (const png of pngBuffers) {
    // El tamaño se lee de la propia imagen (sharp) — no se asume por orden.
    const entry = Buffer.alloc(entrySize);
    const size = pngSize(png);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width, 0 = 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height, 0 = 256
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // image data offset
    entries.push(entry);
    images.push(png);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...images]);
}

/** Lee width/height de la cabecera IHDR de un PNG (asume cuadrado, como todos los que genera este script). */
function pngSize(png) {
  return png.readUInt32BE(16);
}

async function rasterize(svg, size) {
  return sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
}

function buildManifest() {
  return `${JSON.stringify(
    {
      name: 'SLXD',
      short_name: 'SLXD',
      icons: [
        { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: 'icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
      theme_color: BRAND_ICON_BG,
      background_color: BRAND_ICON_BG,
      display: 'standalone',
    },
    null,
    2,
  )}\n`;
}

export async function buildIcons({
  outDir = OUT_DIR,
  storybookFavicon = STORYBOOK_FAVICON,
  storybookBrandDir = STORYBOOK_BRAND_DIR,
} = {}) {
  mkdirSync(outDir, { recursive: true });

  const safeSource = 'src/assets/logomark-safe.svg';
  const plainSource = 'src/assets/logomark.svg';

  // icon.svg / favicon / touch icon / 192 / 512: el margen del 10 % que ya
  // trae logomark-safe.svg.
  const iconSvg = composeIconSvg(safeSource, { side: 512, marginRatio: 0 });
  writeFileSync(`${outDir}/icon.svg`, iconSvg);
  writeFileSync(storybookFavicon, iconSvg);

  const [png16, png32, png48, png192, png512] = await Promise.all(
    [16, 32, 48, 192, 512].map((size) => rasterize(iconSvg, size)),
  );
  writeFileSync(`${outDir}/favicon.ico`, packIco([png16, png32, png48]));
  writeFileSync(`${outDir}/icon-192.png`, png192);
  writeFileSync(`${outDir}/icon-512.png`, png512);

  // apple-touch-icon: 180×180, mismo dibujo, sin transparencia (el fondo lavanda
  // cubre el lienzo entero, así que ya no la lleva).
  const applePng = await rasterize(iconSvg, 180);
  writeFileSync(`${outDir}/apple-touch-icon.png`, applePng);

  // maskable: margen del 20 % por lado (el contenido cabe en el 80 % central),
  // calculado desde el isotipo sin margen — logomark-safe ya trae un 10 % y no
  // se le puede sumar sin re-parsear su propio viewBox.
  const maskableSvg = composeIconSvg(plainSource, { side: 512, marginRatio: 0.2 });
  const maskablePng = await rasterize(maskableSvg, 512);
  writeFileSync(`${outDir}/icon-512-maskable.png`, maskablePng);

  writeFileSync(`${outDir}/manifest.webmanifest`, buildManifest());

  // Copia para "descargar" desde Foundations → Marca en Storybook.
  mkdirSync(`${storybookBrandDir}/icons`, { recursive: true });
  copyFileSync('src/assets/logo.svg', `${storybookBrandDir}/logo.svg`);
  copyFileSync('src/assets/logomark.svg', `${storybookBrandDir}/logomark.svg`);
  copyFileSync(safeSource, `${storybookBrandDir}/logomark-safe.svg`);
  for (const file of ['icon.svg', 'favicon.ico', 'icon-192.png', 'icon-512.png', 'icon-512-maskable.png', 'apple-touch-icon.png', 'manifest.webmanifest']) {
    copyFileSync(`${outDir}/${file}`, `${storybookBrandDir}/icons/${file}`);
  }

  return {
    files: [
      'icon.svg',
      'favicon.ico',
      'icon-192.png',
      'icon-512.png',
      'icon-512-maskable.png',
      'apple-touch-icon.png',
      'manifest.webmanifest',
    ].map((f) => `${outDir}/${f}`),
  };
}

const isMain = process.argv[1] && import.meta.url === new URL(process.argv[1], 'file:').href;
if (isMain) {
  const { files } = await buildIcons();
  for (const f of files) console.log(`✔︎ ${f}`);
  console.log(`✔︎ ${STORYBOOK_FAVICON}`);
}
