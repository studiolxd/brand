import { Heading } from '../../atoms/Heading/Heading';
import { ReviewCarousel } from '../../organisms/ReviewCarousel/ReviewCarousel';
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

export function ReviewsSection({ id, title = 'Lo que dice nuestro alumnado', reviews }: ReviewsSectionProps) {
  return (
    <section id={id} className="reviews-section surface-dark">
      <Heading level={2} weight="semibold">{title}</Heading>
      <ReviewCarousel reviews={reviews} />
    </section>
  );
}
