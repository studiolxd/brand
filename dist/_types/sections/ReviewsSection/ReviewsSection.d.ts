import type { Review } from '../../organisms/ReviewCarousel/ReviewCarousel';
import './ReviewsSection.css';
interface ReviewsSectionProps {
    id?: string;
    /** Título de la sección. */
    title?: string;
    /** Lista de opiniones. */
    reviews: Review[];
}
export { type Review };
export declare function ReviewsSection({ id, title, reviews }: ReviewsSectionProps): import("react/jsx-runtime").JSX.Element;
