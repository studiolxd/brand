import './Heading.css';
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export interface HeadingProps extends Omit<React.ComponentPropsWithoutRef<'h2'>, 'children'> {
    /** Nivel semántico del encabezado (`h1`–`h6`). Fija también el tamaño, salvo que `size` lo desacople. */
    level?: HeadingLevel;
    /**
     * Tamaño de la escala tipográfica (1–10), independiente del nivel. Para cuando
     * el esquema del documento pide un `h2` pero la maqueta pide el tamaño de un
     * `h5` (el título de una tarjeta, por ejemplo).
     */
    size?: HeadingSize;
    children: React.ReactNode;
}
/**
 * Encabezado semántico. El nivel dice qué es en el esquema del documento; el
 * tamaño, por defecto, sale del nivel. El peso es siempre el de énfasis del
 * sistema: un título no elige su peso.
 */
export declare const Heading: import("react").ForwardRefExoticComponent<HeadingProps & import("react").RefAttributes<HTMLHeadingElement>>;
