import type { ComponentPropsWithoutRef } from 'react';
import '../VisuallyHidden/VisuallyHidden.css';
import './SkipLink.css';

export interface SkipLinkProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  /** Destino del salto: el `id` del contenido principal, con `#` (`#main-content`). */
  href: string;
  children: React.ReactNode;
}

/**
 * Enlace de salto al contenido: oculto hasta que recibe el foco por teclado,
 * y entonces visible por encima de todo. Es el primer elemento enfocable de
 * la página. Oculto, usa la misma receta que `VisuallyHidden`: sigue en el
 * DOM y en el orden de tabulación, solo no se ve.
 */
export function SkipLink({ href, className, children, ...rest }: SkipLinkProps) {
  const classes = ['skip-link', 'visually-hidden', className].filter(Boolean).join(' ');
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
