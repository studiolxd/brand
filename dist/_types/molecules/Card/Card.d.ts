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
