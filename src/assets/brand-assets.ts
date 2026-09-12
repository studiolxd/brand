/**
 * Metadatos del juego de activos de marca publicado: logotipo, isotipo e
 * iconos de aplicación. Rutas relativas a la raíz del paquete (bajo
 * `@studiolxd/brand/assets/...`, ver `package.json#exports`), para que una
 * app consumidora los copie o los sirva sin adivinar nombres de fichero.
 *
 * Un solo juego de iconos para toda la suite —sin variantes por producto—,
 * ver Foundations → Marca. Dos tokens, mismo criterio que la regla 8 de
 * CLAUDE.md para el aviso del DS (relleno claro + tinta prusia, nunca tinta
 * suelta): `BRAND_ICON_BG_COLOR` es el relleno, `color.lavender` (`#BAABFF`,
 * el primitivo de paleta más próximo a "violeta" que tiene
 * `tokens/color/palette.json`); `BRAND_ICON_INK_COLOR` es la tinta del
 * isotipo sobre ese relleno, `color.primary` (`#111E30`, el prusia). Ninguno
 * de los dos es un hex inventado (regla 9 de CLAUDE.md): los dos son
 * primitivos/roles que ya existían.
 */

/** El violeta de marca usado como fondo de los iconos de aplicación (`color.lavender`, `--color-lavender`). */
export const BRAND_ICON_BG_COLOR = '#BAABFF';
/** La tinta del isotipo sobre ese fondo (`color.primary`, `--color-primary` — el prusia). */
export const BRAND_ICON_INK_COLOR = '#111E30';

export interface BrandIconAsset {
  /** Ruta bajo `@studiolxd/brand/assets/...`. */
  path: string;
  /** Lado en píxeles (icons cuadrados) — `undefined` para el SVG y el manifest, que no tienen talla fija. */
  size?: number;
  type: 'image/svg+xml' | 'image/png' | 'image/vnd.microsoft.icon' | 'application/manifest+json' | 'font/woff2';
  /** Uso pensado, para documentación y para que un script de instalación sepa qué `<link>` generar. */
  purpose:
    | 'source' // el isotipo/logotipo sin componer, como SVG suelto
    | 'favicon' // <link rel="icon">
    | 'apple-touch-icon' // <link rel="apple-touch-icon">
    | 'pwa-icon' // manifest "icons"
    | 'pwa-icon-maskable' // manifest "icons", purpose: "maskable"
    | 'manifest';
}

/** Los ficheros fuente sueltos: el logotipo completo y el isotipo (con y sin área de seguridad). */
export const BRAND_SOURCE_ASSETS: readonly BrandIconAsset[] = [
  { path: 'assets/logo.svg', type: 'image/svg+xml', purpose: 'source' },
  { path: 'assets/logomark.svg', type: 'image/svg+xml', purpose: 'source' },
  { path: 'assets/logomark-safe.svg', type: 'image/svg+xml', purpose: 'source' },
];

/** El juego de iconos generado por `scripts/build-icons.mjs`, publicado en `dist/assets/icons/`. */
export const BRAND_ICON_ASSETS: readonly BrandIconAsset[] = [
  { path: 'assets/icons/icon.svg', type: 'image/svg+xml', purpose: 'favicon' },
  { path: 'assets/icons/favicon.ico', type: 'image/vnd.microsoft.icon', purpose: 'favicon' },
  { path: 'assets/icons/icon-192.png', size: 192, type: 'image/png', purpose: 'pwa-icon' },
  { path: 'assets/icons/icon-512.png', size: 512, type: 'image/png', purpose: 'pwa-icon' },
  { path: 'assets/icons/icon-512-maskable.png', size: 512, type: 'image/png', purpose: 'pwa-icon-maskable' },
  { path: 'assets/icons/apple-touch-icon.png', size: 180, type: 'image/png', purpose: 'apple-touch-icon' },
  { path: 'assets/icons/manifest.webmanifest', type: 'application/manifest+json', purpose: 'manifest' },
];

/**
 * El nombre del PNG del logotipo del correo, versionado: Gmail proxea y
 * cachea las imágenes de los correos y no hay forma de forzar un refresco,
 * así que cambiar el logotipo es publicar un nombre nuevo (`logo-v2.png`), no
 * sobrescribir este. `emailTheme.ts` (`emailLogo.filename`) y
 * `scripts/build-email-assets.mjs` leen de aquí en vez de repetirlo.
 */
export const EMAIL_LOGO_FILENAME = 'logo-v1.png';

/**
 * El nombre del woff2 de la cara latina de la sans que usa el correo, mismo
 * criterio de versión que `EMAIL_LOGO_FILENAME`.
 */
export const EMAIL_FONT_FILENAME = 'google-sans-flex-normal-latin-v1.woff2';

/**
 * El juego de assets del correo generado por `scripts/build-email-assets.mjs`,
 * publicado en `dist/assets/email/` (subpath `@studiolxd/brand/assets/email/...`)
 * — mismo mecanismo que `BRAND_ICON_ASSETS` para los iconos de aplicación.
 *
 * `public/email/` es un segundo destino del mismo origen, no una fuente
 * distinta: sirve para que Storybook enseñe el correo en local
 * (`assetsBaseUrl="/email"` en las stories) sin depender del paquete
 * publicado. En producción, el host de assets del correo
 * (`https://slxd.app/brand/email`) sirve estos mismos ficheros desde
 * `dist/assets/email/`.
 */
export const BRAND_EMAIL_ASSETS: readonly BrandIconAsset[] = [
  { path: `assets/email/${EMAIL_LOGO_FILENAME}`, type: 'image/png', purpose: 'source' },
  { path: `assets/email/${EMAIL_FONT_FILENAME}`, type: 'font/woff2', purpose: 'source' },
];
