import type { ReactNode } from 'react';
import { Heading, type HeadingLevel, type HeadingSize } from '../../atoms/Heading/Heading';
import { Icon, type IconName } from '../../atoms/Icon/Icon';
import { NumberBadge, type NumberBadgeVariant } from '../../atoms/NumberBadge/NumberBadge';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import './Steps.css';

export interface StepItem {
  /** Clave de React. Sin ella se usa la posición. */
  id?: string;
  /** Título del paso. */
  title: ReactNode;
  /** Qué pasa en este paso. */
  description?: ReactNode;
  /** Icono junto al título, del catálogo del sistema. */
  icon?: IconName;
}

export interface StepsProps {
  /** Los pasos, en orden. El número lo pone el componente. */
  items: StepItem[];
  /** Uno debajo de otro (por defecto) o en fila. */
  orientation?: 'vertical' | 'horizontal';
  /** Color del número. Por defecto `primary`. */
  badgeVariant?: NumberBadgeVariant;
  /** Nivel semántico del título de cada paso. Por defecto `3`. */
  titleLevel?: HeadingLevel;
  /** Talla del título de cada paso. Por defecto `4` (20px). */
  titleSize?: HeadingSize;
  /** Nombre accesible de la lista, si la sección que la contiene no lo da ya. */
  label?: string;
  className?: string;
  id?: string;
}

/**
 * Un proceso numerado: los pasos de una metodología, de un alta, de una
 * matrícula. Es una lista ordenada de verdad (`ol`), así que el lector de
 * pantalla anuncia «lista de 4 elementos» y el orden sin que nadie lo escriba.
 *
 * El número se pinta con `NumberBadge` y va marcado como decorativo: la
 * posición ya la da el `ol`, y repetirla en voz alta sobraría. La línea que
 * une un paso con el siguiente es la línea de separación del sistema.
 */
export function Steps({
  items,
  orientation = 'vertical',
  badgeVariant = 'primary',
  titleLevel = 3,
  titleSize = 4,
  label,
  className,
  id,
}: StepsProps) {
  const classes = ['steps', `steps--${orientation}`, className].filter(Boolean).join(' ');

  return (
    <ol id={id} className={classes} aria-label={label}>
      {items.map((step, index) => (
        <li key={step.id ?? index} className="steps__item">
          <span className="steps__marker" aria-hidden="true">
            <NumberBadge count={index + 1} variant={badgeVariant} className="steps__number" />
          </span>
          <div className="steps__body">
            <Heading level={titleLevel} size={titleSize} className="steps__title">
              {step.icon && <Icon name={step.icon} className="steps__icon" />}
              {step.title}
            </Heading>
            {step.description && <Paragraph className="steps__description">{step.description}</Paragraph>}
          </div>
        </li>
      ))}
    </ol>
  );
}
