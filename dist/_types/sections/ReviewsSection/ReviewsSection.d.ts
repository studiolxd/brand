import './ReviewsSection.css';
interface Review {
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
interface ReviewsSectionProps {
    /** Título de la sección. */
    title?: string;
    /** Lista de opiniones. */
    reviews: Review[];
}
export declare function ReviewsSection({ title, reviews }: ReviewsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
