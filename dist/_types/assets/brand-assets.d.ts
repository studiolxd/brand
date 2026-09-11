/**
 * Metadatos del juego de activos de marca publicado: logotipo, isotipo e
 * iconos de aplicación. Rutas relativas a la raíz del paquete (bajo
 * `@studiolxd/brand/assets/...`, ver `package.json#exports`), para que una
 * app consumidora los copie o los sirva sin adivinar nombres de fichero.
 *
 * Un solo juego de iconos para toda la suite —sin variantes por producto—,
 * ver Foundations → Marca. El violeta de fondo es `BRAND_ICON_COLOR`: el
 * primitivo de paleta `color.lavender` (`#BAABFF`), el más cercano a
 * "violeta" que tiene `tokens/color/palette.json` — no se inventó un hex
 * nuevo para esto (regla 9 de CLAUDE.md).
 */
/** El violeta de marca usado como fondo de los iconos de aplicación (`color.lavender`, `--color-lavender`). */
export declare const BRAND_ICON_COLOR = "#BAABFF";
export interface BrandIconAsset {
    /** Ruta bajo `@studiolxd/brand/assets/...`. */
    path: string;
    /** Lado en píxeles (icons cuadrados) — `undefined` para el SVG y el manifest, que no tienen talla fija. */
    size?: number;
    type: 'image/svg+xml' | 'image/png' | 'image/vnd.microsoft.icon' | 'application/manifest+json';
    /** Uso pensado, para documentación y para que un script de instalación sepa qué `<link>` generar. */
    purpose: 'source' | 'favicon' | 'apple-touch-icon' | 'pwa-icon' | 'pwa-icon-maskable' | 'manifest';
}
/** Los ficheros fuente sueltos: el logotipo completo y el isotipo (con y sin área de seguridad). */
export declare const BRAND_SOURCE_ASSETS: readonly BrandIconAsset[];
/** El juego de iconos generado por `scripts/build-icons.mjs`, publicado en `dist/assets/icons/`. */
export declare const BRAND_ICON_ASSETS: readonly BrandIconAsset[];
