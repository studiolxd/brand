import { forwardRef } from 'react';
import './VisuallyHidden.css';

export interface VisuallyHiddenProps extends React.ComponentPropsWithoutRef<'span'> {
  children: React.ReactNode;
  /**
   * Elemento que se pinta. `span` por defecto; `div` para envolver contenido de
   * flujo que no cabe dentro de un `span` (una tabla, una lista, un párrafo) —
   * el caso de la tabla equivalente de `Chart`.
   */
  as?: 'span' | 'div';
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
  { children, as = 'span', className, ...rest },
  ref,
) {
  const classes = ['visually-hidden', className].filter(Boolean).join(' ');
  // `as` solo admite `span` o `div`, y ambos comparten el ref de `HTMLElement`:
  // el estrechamiento mantiene el tipo público de `ref` en el `span` por defecto.
  const Element = as as 'span';
  return <Element ref={ref} className={classes} {...rest}>{children}</Element>;
});
