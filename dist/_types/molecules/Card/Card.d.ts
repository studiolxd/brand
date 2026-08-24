import './Card.css';
export type CardColor = 'primary' | 'outline' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2';
export interface CardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    /**
     * URL de destino. **Con `href`** el Card es una *link-card*: todo el bloque es un
     * `<a>` (título + descripción + flecha). **Sin `href`** es una *superficie
     * contenedora*: un `<div>` con `children` arbitrarios (interactivos permitidos).
     */
    href?: string;
    /** Título (modo link — se espera junto a `href`). */
    title?: string;
    /** Descripción (modo link). */
    description?: string;
    /** Texto accesible del CTA, visually-hidden (modo link — se espera junto a `href`). */
    ctaLabel?: string;
    /** Color de fondo. Default: `'outline'`. */
    color?: CardColor;
}
/**
 * Card con dos modos según `href`:
 * - **link-card** (`href`): navegación — el bloque entero es un enlace (uso actual).
 * - **contenedor** (sin `href`): superficie de app con contenido interactivo dentro
 *   (formularios, botones), que no puede vivir dentro de un `<a>`.
 *
 * En modo contenedor, `className` se concatena tras las clases propias y `{...rest}`
 * (`data-*`, `aria-*`, `id`…) se reenvía al `<div>`.
 */
export declare const Card: import("react").ForwardRefExoticComponent<CardProps & import("react").RefAttributes<HTMLElement>>;
export type CardPartProps = React.ComponentPropsWithoutRef<'div'>;
/** Fila superior: el bloque de título a un lado y la acción al otro. */
export declare const CardHeader: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/** Título de la tarjeta. Un encabezado dentro hereda su escala. */
export declare const CardTitle: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/** Texto secundario bajo el título. */
export declare const CardDescription: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/** Acción alineada al extremo de la cabecera (menú, botón…). */
export declare const CardAction: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/** Cuerpo de la tarjeta. */
export declare const CardContent: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/** Pie con las acciones de la tarjeta. */
export declare const CardFooter: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
