import './Card.css';
export type CardColor = 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
interface CardProps {
    /** URL de destino — todo el bloque es clicable. */
    href: string;
    /** Título de la tarjeta. */
    title: string;
    /** Descripción. */
    description: string;
    /** Texto accesible del CTA (visually-hidden). */
    ctaLabel: string;
    /** Color de fondo. */
    color: CardColor;
}
export declare function Card({ href, title, description, ctaLabel, color }: CardProps): import("react/jsx-runtime").JSX.Element;
export {};
