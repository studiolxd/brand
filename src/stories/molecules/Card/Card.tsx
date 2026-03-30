import './Card.css';
import { Arrow } from '../../atoms/Arrow/Arrow';

export type CardColor = 'secondary' | 'tertiary' | 'quaternary' | 'quinary';

interface CardProps {
  /** URL de destino — todo el bloque es clicable. */
  href: string;
  /** Título de la tarjeta. */
  title: string;
  /** Descripción. */
  description: string;
  /** Texto accesible del CTA (visually-hidden). */
  ctaLabel: string;
  /** Color de fondo. */
  color: CardColor;
}

export function Card({ href, title, description, ctaLabel, color }: CardProps) {
  return (
    <a href={href} className={['card', `card--${color}`].join(' ')}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="visually-hidden">{ctaLabel}</span>
      <Arrow size="lg" />
    </a>
  );
}
