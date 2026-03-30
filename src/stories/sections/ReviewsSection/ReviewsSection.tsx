import { Carousel, CarouselSlide } from '../../atoms/Carousel/Carousel';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Heading } from '../../atoms/Heading/Heading';
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

export function ReviewsSection({ title = 'Lo que dice nuestro alumnado', reviews }: ReviewsSectionProps) {
  return (
    <section className="reviews-section surface-dark">
      <Heading level={2}>{title}</Heading>
      <Carousel
        options={{ align: 'center', loop: true }}
        gradientColor="var(--color-background-dark)"
      >
        {reviews.map((review) => (
          <CarouselSlide key={review.id}>
            <article className="review-card">
              <div className="review-card__author">
                <Avatar
                  src={review.photo}
                  alt={review.author}
                  size="xl"
                  className="review-card__avatar"
                />
                <div className="review-card__identity">
                  <Heading level={3} className="review-card__name">{review.author}</Heading>
                  <Heading level={4} className="review-card__role">{review.role}</Heading>
                </div>
              </div>
              <blockquote className="review-card__quote">{review.quote}</blockquote>
            </article>
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  );
}
