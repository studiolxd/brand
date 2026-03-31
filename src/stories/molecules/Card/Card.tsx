import './Card.css';
import { Arrow } from '../../atoms/Arrow/Arrow';
import { Heading } from '../../atoms/Heading/Heading';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';

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
      <Heading level={2} weight="semibold">{title}</Heading>
      <p>{description}</p>
      <VisuallyHidden>{ctaLabel}</VisuallyHidden>
      <Arrow size="lg" />
    </a>
  );
}
