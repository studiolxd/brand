import './CardSquare.css';
import { Arrow } from '../../atoms/Arrow/Arrow';
import { Heading } from '../../atoms/Heading/Heading';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
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

export function CardSquare({ href, title, description, ctaLabel, color, image }: CardSquareProps) {
  return (
    <a href={href} className={['card-square', `card-square--${color}`].join(' ')}>
      <img
        className="card-square__image"
        src={image.src}
        alt={image.alt}
      />
      <div className="card-square__body">
        <Heading level={2} weight="semibold" className="card-square__title">{title}</Heading>
        <p className="card-square__description">{description}</p>
        <Arrow className="card-square__arrow" size="lg" />
        <VisuallyHidden>{ctaLabel}</VisuallyHidden>
      </div>
    </a>
  );
}
