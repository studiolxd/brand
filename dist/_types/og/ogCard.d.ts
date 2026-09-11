import { type ReactElement } from 'react';
/** El tamaño que pide Open Graph, listo para pasárselo a `ImageResponse`. */
export declare const OG_SIZE: {
    readonly width: 1200;
    readonly height: 630;
};
/** El tipo de contenido que devuelve `ImageResponse`, para la cabecera de la ruta. */
export declare const OG_CONTENT_TYPE = "image/png";
export interface OgCardProps {
    /** El título de la página. Es lo único grande de la tarjeta. */
    title: string;
    /** Una línea de apoyo bajo el título. Opcional. */
    subtitle?: string;
    /** Una etiqueta corta arriba a la derecha: sección, categoría, fecha. Opcional. */
    eyebrow?: string;
}
/**
 * El árbol de la tarjeta social de marca, listo para satori.
 *
 * ```ts
 * new ImageResponse(ogCard({ title }), {
 *   ...OG_SIZE,
 *   fonts: await ogFonts(),
 * });
 * ```
 */
export declare function ogCard({ title, subtitle, eyebrow }: OgCardProps): ReactElement;
