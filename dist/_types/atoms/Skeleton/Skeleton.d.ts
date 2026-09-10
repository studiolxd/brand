import './Skeleton.css';
export interface SkeletonProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height' | 'style'> {
    /** Ancho del bloque (cualquier medida CSS). Por defecto ocupa todo el disponible. */
    width?: string;
    /** Alto del bloque (cualquier medida CSS). Por defecto, una línea de texto. */
    height?: string;
    /** Bloque circular (avatares). */
    circle?: boolean;
}
/**
 * Marcador de contenido que aún está cargando. Es decorativo: se oculta a los
 * lectores de pantalla, así que el contenedor que lo usa debe anunciar la
 * carga por su cuenta (`aria-busy`, una región viva…).
 *
 * El bloque es un `<svg>` vacío y no un `<span>` porque `width` y `height` son
 * medidas libres —no hay escala cerrada que las tabule— y en un `<svg>` viajan
 * como **atributos de presentación**, que la CSP no descarta. En un atributo
 * `style` una app con `style-src 'self'` los perdería sin avisar y todo bloque
 * saldría a ancho completo y una línea de alto. No hay prop `style` por lo
 * mismo: el atributo no llegaría a pintarse.
 */
export declare function Skeleton({ width, height, circle, className, ...rest }: SkeletonProps): import("react/jsx-runtime").JSX.Element;
