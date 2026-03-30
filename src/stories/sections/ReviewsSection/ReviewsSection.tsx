import { Carousel, CarouselSlide } from '../../atoms/Carousel/Carousel';
import { Avatar } from '../../atoms/Avatar/Avatar';
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
    <section className="reviews-section dark">
      <h2>{title}</h2>
      <Carousel
        options={{ align: 'center', loop: true }}
        gradientColor="var(--color-background-dark)"
      >
        {reviews.map((review) => (
          <CarouselSlide key={review.id}>
            <article className="review-card">
              <footer className="review-card__footer">
                <Avatar
                  src={review.photo}
                  alt={review.author}
                  className="review-card__avatar"
                />
                <div className="review-card__identity">
                  <h3 className="review-card__author">{review.author}</h3>
                  <h4 className="review-card__role">{review.role}</h4>
                </div>
              </footer>
              <blockquote className="review-card__quote">{review.quote}</blockquote>
            </article>
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  );
}
