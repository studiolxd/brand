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
    id?: string;
    /** Título de la sección. */
    title?: string;
    /** Lista de opiniones. */
    reviews: Review[];
}
export declare function ReviewsSection({ id, title, reviews }: ReviewsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
