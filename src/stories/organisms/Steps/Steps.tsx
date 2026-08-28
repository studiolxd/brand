import { Children, createContext, useContext, type ReactNode } from 'react';
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
  /**
   * Los pasos, en orden, como datos. El número lo pone el componente. Para un
   * paso con cuerpo rico (varios párrafos, una lista, un bloque de código)
   * están los `children` con `Step`.
   */
  items?: StepItem[];
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
  /**
   * Los pasos como composición: un `Step` por paso, con el cuerpo que haga
   * falta dentro. Es la forma para MDX, donde un paso no cabe en una cadena.
   * Manda sobre `items`.
   */
  children?: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Lo que cada `Step` necesita saber de la lista que lo contiene: su posición
 * —que la pone el `ol`, no el consumidor— y la cara de los pasos.
 */
interface StepsContextValue {
  index: number;
  badgeVariant: NumberBadgeVariant;
  titleLevel: HeadingLevel;
  titleSize: HeadingSize;
}

const StepsContext = createContext<StepsContextValue | null>(null);

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
  children,
  className,
  id,
}: StepsProps) {
  const classes = ['steps', `steps--${orientation}`, className].filter(Boolean).join(' ');

  // Forma compuesta: cada hijo es un paso y la lista le dice qué número le
  // toca. El consumidor nunca escribe el número, igual que con `items`.
  if (children !== undefined) {
    return (
      <ol id={id} className={classes} aria-label={label}>
        {Children.map(children, (child, index) => (
          <StepsContext.Provider value={{ index, badgeVariant, titleLevel, titleSize }}>
            {child}
          </StepsContext.Provider>
        ))}
      </ol>
    );
  }

  return (
    <ol id={id} className={classes} aria-label={label}>
      {(items ?? []).map((step, index) => (
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

export interface StepProps extends Omit<React.ComponentPropsWithoutRef<'li'>, 'title'> {
  /** Título del paso. */
  title: ReactNode;
  /** Icono junto al título, del catálogo del sistema. */
  icon?: IconName;
  /** El cuerpo del paso: párrafos, listas, bloques de código, lo que haga falta. */
  children?: ReactNode;
}

/**
 * Un paso de la forma compuesta. Solo vive dentro de `Steps`: de ahí saca su
 * número y la cara de la lista. El cuerpo son sus `children`, así que un paso
 * puede llevar varios párrafos, una lista o un bloque de código — lo que no
 * cabe en la `description` de un `StepItem`.
 */
export function Step({ title, icon, children, className, ...rest }: StepProps) {
  const contexto = useContext(StepsContext);
  if (contexto === null) {
    throw new Error('`Step` solo funciona dentro de `Steps`: de ahí saca su número.');
  }
  const { index, badgeVariant, titleLevel, titleSize } = contexto;

  return (
    <li className={['steps__item', className].filter(Boolean).join(' ')} {...rest}>
      <span className="steps__marker" aria-hidden="true">
        <NumberBadge count={index + 1} variant={badgeVariant} className="steps__number" />
      </span>
      <div className="steps__body">
        <Heading level={titleLevel} size={titleSize} className="steps__title">
          {icon && <Icon name={icon} className="steps__icon" />}
          {title}
        </Heading>
        {children}
      </div>
    </li>
  );
}
