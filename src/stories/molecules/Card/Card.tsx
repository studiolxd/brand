import { forwardRef } from 'react';
import './Card.css';
import { Arrow } from '../../atoms/Arrow/Arrow';
import { Heading } from '../../atoms/Heading/Heading';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';

export type CardColor = 'primary' | 'outline' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2';

export interface CardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * URL de destino. **Con `href`** el Card es una *link-card*: todo el bloque es un
   * `<a>` (título + descripción + flecha). **Sin `href`** es una *superficie
   * contenedora*: un `<div>` con `children` arbitrarios (interactivos permitidos).
   */
  href?: string;
  /** Título (modo link — se espera junto a `href`). */
  title?: string;
  /** Descripción (modo link). */
  description?: string;
  /** Texto accesible del CTA, visually-hidden (modo link — se espera junto a `href`). */
  ctaLabel?: string;
  /** Color de fondo. Default: `'outline'`. */
  color?: CardColor;
}

/**
 * Card con dos modos según `href`:
 * - **link-card** (`href`): navegación — el bloque entero es un enlace (uso actual).
 * - **contenedor** (sin `href`): superficie de app con contenido interactivo dentro
 *   (formularios, botones), que no puede vivir dentro de un `<a>`.
 *
 * En modo contenedor, `className` se concatena tras las clases propias y `{...rest}`
 * (`data-*`, `aria-*`, `id`…) se reenvía al `<div>`.
 */
export const Card = forwardRef<HTMLElement, CardProps>(function Card({
  href,
  title,
  description,
  ctaLabel,
  color = 'outline',
  className,
  children,
  ...rest
}, ref) {
  const classes = ['card', `card--${color}`, className ?? ''].filter(Boolean).join(' ');

  // Modo link (retrocompatible): todo el bloque es un enlace.
  if (href !== undefined) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <Heading level={2} size={8}>{title}</Heading>
        {description && <p>{description}</p>}
        <VisuallyHidden>{ctaLabel}</VisuallyHidden>
        <Arrow size="lg" />
      </a>
    );
  }

  // Modo contenedor: superficie con children arbitrarios.
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={classes} {...rest}>
      {children}
    </div>
  );
});
