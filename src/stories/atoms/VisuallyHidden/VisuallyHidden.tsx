import { forwardRef } from 'react';
import './VisuallyHidden.css';

export interface VisuallyHiddenProps extends React.ComponentPropsWithoutRef<'span'> {
  children: React.ReactNode;
  /** Se añade DESPUÉS de la clase propia. */
  className?: string;
}

/**
 * Oculta contenido visualmente y lo deja en el árbol de accesibilidad.
 * Reenvía `ref` y cualquier atributo (`id`, `aria-*`…): así sirve de
 * `render` para los primitivos de Base UI (p. ej. un título de diálogo que
 * no se ve pero al que apunta `aria-labelledby`).
 */
export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(function VisuallyHidden(
  { children, className, ...rest },
  ref,
) {
  const classes = ['visually-hidden', className].filter(Boolean).join(' ');
  return <span ref={ref} className={classes} {...rest}>{children}</span>;
});
