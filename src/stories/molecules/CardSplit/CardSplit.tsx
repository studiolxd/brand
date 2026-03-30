import './CardSplit.css';
import { Arrow } from '../../atoms/Arrow/Arrow';
import type { CardColor } from '../Card/Card';

interface CardSplitImage {
  src: string;
  alt: string;
}

interface CardSplitProps {
  /** URL de destino — todo el bloque es clicable. */
  href: string;
  /** Título de la tarjeta. */
  title: string;
  /** Descripción — oculta por defecto, visible al hacer hover. */
  description: string;
  /** Texto accesible del CTA (visually-hidden). */
  ctaLabel: string;
  /** Color del panel izquierdo. */
  color: CardColor;
  /** Fotografía del panel derecho. */
  image: CardSplitImage;
}

export function CardSplit({ href, title, description, ctaLabel, color, image }: CardSplitProps) {
  return (
    <a href={href} className={['card-split', `card-split--${color}`].join(' ')}>
      <div className="card-split__primary">
        <h2 className="card-split__title">{title}</h2>
        <p className="card-split__description">{description}</p>
        <Arrow className="card-split__arrow" size="lg" />
        <span className="visually-hidden">{ctaLabel}</span>
      </div>
      <div className="card-split__photo">
        <img src={image.src} alt={image.alt} />
      </div>
    </a>
  );
}
