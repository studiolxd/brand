import './ReviewCarousel.css';
export interface Review {
    /** Identificador único. */
    id: string;
    /** URL de la foto del autor. */
    photo: string;
    /** Nombre del autor. */
    author: string;
    /** Cargo o rol del autor. */
    role: string;
    /** Texto del testimonio. */
    quote: string;
}
interface ReviewCarouselProps {
    /** Lista de opiniones. */
    reviews: Review[];
    /** Clase adicional. */
    className?: string;
}
export declare function ReviewCarousel({ reviews, className }: ReviewCarouselProps): import("react/jsx-runtime").JSX.Element;
export {};
