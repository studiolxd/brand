import './CardSquare.css';
import type { CardColor } from '../Card/Card';
interface CardSquareImage {
    src: string;
    alt: string;
}
interface CardSquareProps {
    /** URL de destino — todo el bloque es clicable. */
    href: string;
    /** Título de la tarjeta. */
    title: string;
    /** Descripción — oculta por defecto, visible al hacer hover. */
    description: string;
    /** Texto accesible del CTA (visually-hidden). */
    ctaLabel: string;
    /** Color del overlay en hover. */
    color: CardColor;
    /** Imagen de fondo. */
    image: CardSquareImage;
}
export declare function CardSquare({ href, title, description, ctaLabel, color, image }: CardSquareProps): import("react/jsx-runtime").JSX.Element;
export {};
