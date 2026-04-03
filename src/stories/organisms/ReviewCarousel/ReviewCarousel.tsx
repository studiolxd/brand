import { Carousel, CarouselSlide } from '../../atoms/Carousel/Carousel';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Heading } from '../../atoms/Heading/Heading';
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

export function ReviewCarousel({ reviews, className }: ReviewCarouselProps) {
  return (
    <Carousel
      options={{ align: 'center', loop: true }}
      gradientColor="var(--color-background-dark)"
      className={['review-carousel', className].filter(Boolean).join(' ')}
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
                <Heading level={3} size={7} className="review-card__name">{review.author}</Heading>
                <Heading level={4} size={6} className="review-card__role">{review.role}</Heading>
              </div>
            </div>
            <blockquote className="review-card__quote">{review.quote}</blockquote>
          </article>
        </CarouselSlide>
      ))}
    </Carousel>
  );
}
