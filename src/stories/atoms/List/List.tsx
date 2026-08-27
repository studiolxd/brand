import { forwardRef } from 'react';
import './List.css';

export type ListType = 'unordered' | 'ordered' | 'plain';

export interface ListProps extends React.ComponentPropsWithoutRef<'ul'> {
  /** Tipo de lista: con viñetas, numerada o sin decoración. */
  type?: ListType;
  children: React.ReactNode;
}

/**
 * Lista con viñetas (`ul`), numerada (`ol`) o sin decoración (`plain`, un `ul`
 * sin marcas ni sangría). Viste el elemento con la tipografía del cuerpo; los
 * `<li>` los pone quien la usa.
 *
 * Reenvía el resto de props del elemento (`data-*`, `aria-*`, `id`…) y
 * concatena `className` tras las clases propias.
 */
export const List = forwardRef<HTMLUListElement & HTMLOListElement, ListProps>(function List({
  type = 'unordered',
  className,
  children,
  ...rest
}, ref) {
  const Element = type === 'ordered' ? 'ol' : 'ul';
  const classes = ['list', `list--${type}`, className ?? ''].filter(Boolean).join(' ');

  return (
    <Element ref={ref} className={classes} {...rest}>
      {children}
    </Element>
  );
});
