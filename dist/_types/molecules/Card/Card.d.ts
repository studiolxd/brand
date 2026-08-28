import './Card.css';
import { type HeadingLevel, type HeadingSize } from '../../atoms/Heading/Heading';
import { type ParagraphProps } from '../../atoms/Paragraph/Paragraph';
export type CardColor = 'primary' | 'outline' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2';
export interface CardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    /**
     * URL de destino. **Con `href`** el Card es una *link-card*: todo el bloque es un
     * `<a>` (título + descripción + flecha). **Sin `href`** es una *superficie
     * contenedora*: un `<div>` con `children` arbitrarios (interactivos permitidos).
     */
    href?: string;
    /**
     * Elemento sobre el que renderizar la tarjeta (p. ej. `<Link href="…" />` de
     * Next.js): recibe las clases y el contenido del Card. Es el modo enlace
     * cuando la navegación la lleva el router de la aplicación, y sustituye al
     * patrón `asChild`. Manda sobre `href`.
     */
    render?: React.ReactElement<Record<string, unknown>>;
    /** Título (modo link — se espera junto a `href` o `render`). */
    title?: string;
    /** Descripción (modo link). */
    description?: string;
    /** Texto accesible del CTA, visually-hidden (modo link — se espera junto a `href` o `render`). */
    ctaLabel?: string;
    /** Color de fondo. Default: `'outline'`. */
    color?: CardColor;
}
/**
 * Card con dos modos:
 * - **link-card** (`href` o `render`): navegación — el bloque entero es un
 *   enlace. Con `href` lo pinta un `<a>`; con `render`, el elemento que se le
 *   pase (el `Link` del router de turno).
 * - **contenedor** (sin ninguno de los dos): superficie de app con contenido
 *   interactivo dentro (formularios, botones), que no puede vivir dentro de un
 *   `<a>`. Se compone con las subpartes de más abajo.
 *
 * En modo contenedor, `className` se concatena tras las clases propias y `{...rest}`
 * (`data-*`, `aria-*`, `id`…) se reenvía al `<div>`.
 */
export declare const Card: import("react").ForwardRefExoticComponent<CardProps & import("react").RefAttributes<HTMLElement>>;
export type CardPartProps = React.ComponentPropsWithoutRef<'div'>;
/** Fila superior: el bloque de título a un lado y la acción al otro. */
export declare const CardHeader: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export interface CardTitleProps extends Omit<React.ComponentPropsWithoutRef<'h3'>, 'children'> {
    /**
     * Nivel semántico del encabezado en el esquema del documento. Default: `3`
     * — una tarjeta suele colgar de un `h2` de sección. Súbelo o bájalo según
     * dónde viva la tarjeta; no cambia cómo se ve.
     */
    level?: HeadingLevel;
    /**
     * Tamaño de la escala de títulos. Default: `4` (20px), el tamaño de un título
     * de tarjeta de aplicación. La link-card de marketing usa el suyo, mucho mayor.
     */
    size?: HeadingSize;
    children: React.ReactNode;
}
/**
 * Título de la tarjeta. Es un encabezado de verdad (`Heading`): cuenta para el
 * esquema del documento y para la navegación por encabezados de un lector de
 * pantalla. El nivel y el tamaño se eligen por separado — el nivel dice dónde
 * cuelga la tarjeta, el tamaño cómo se ve.
 */
export declare const CardTitle: import("react").ForwardRefExoticComponent<CardTitleProps & import("react").RefAttributes<HTMLHeadingElement>>;
export interface CardDescriptionProps extends Omit<ParagraphProps, 'children'> {
    children: React.ReactNode;
}
/**
 * Texto secundario bajo el título. Es un párrafo del sistema (`Paragraph`):
 * hereda el cuerpo de la superficie en la que viva la tarjeta.
 */
export declare const CardDescription: import("react").ForwardRefExoticComponent<CardDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>>;
/** Acción alineada al extremo de la cabecera (menú, botón…). */
export declare const CardAction: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/** Cuerpo de la tarjeta. */
export declare const CardContent: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/** Pie con las acciones de la tarjeta. */
export declare const CardFooter: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
