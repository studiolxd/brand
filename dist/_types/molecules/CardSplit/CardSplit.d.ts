import './CardSplit.css';
import type { CardColor } from '../Card/Card';
interface CardSplitImage {
    src: string;
    alt: string;
}
interface CardSplitProps {
    /** URL de destino — todo el bloque es clicable. */
    href: string;
    /** Título de la tarjeta. */
    title: string;
    /** Descripción — oculta por defecto, visible al hacer hover. */
    description: string;
    /** Texto accesible del CTA (visually-hidden). */
    ctaLabel: string;
    /** Color del panel izquierdo. */
    color: CardColor;
    /** Fotografía del panel derecho. */
    image: CardSplitImage;
}
export declare function CardSplit({ href, title, description, ctaLabel, color, image }: CardSplitProps): import("react/jsx-runtime").JSX.Element;
export {};
