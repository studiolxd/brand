import { forwardRef } from 'react';
import './DescriptionList.css';

export interface DescriptionTermProps extends React.ComponentPropsWithoutRef<'dt'> {
  /**
   * Elemento a renderizar. Default `'dt'`, que es lo correcto dentro de una
   * `DescriptionList`. Solo se cambia cuando el término no cuelga de una lista
   * de descripción real y hay que darle el rol a mano (`as="div"
   * role="term"`).
   */
  as?: React.ElementType;
  children?: React.ReactNode;
}

export interface DescriptionDetailsProps extends React.ComponentPropsWithoutRef<'dd'> {
  /**
   * Elemento a renderizar. Default `'dd'`. Mismo criterio que en
   * `DescriptionTerm`: solo se cambia fuera de un `<dl>` real (`as="div"
   * role="definition"`).
   */
  as?: React.ElementType;
  children?: React.ReactNode;
}

export interface DescriptionListProps extends React.ComponentPropsWithoutRef<'dl'> {
  /** Pares `<dt>` término y `<dd>` valor, en ese orden. */
  children: React.ReactNode;
}

/**
 * Lista de descripción: pares término/valor en una rejilla con separadores.
 * Sirve para fichas de datos —cliente, servicio, año— donde cada fila es una
 * propiedad y su contenido.
 *
 * Reenvía el resto de props del `<dl>` (`data-*`, `aria-*`, `id`…) y concatena
 * `className` tras las clases propias.
 */
export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  function DescriptionList({ className, children, ...rest }, ref) {
    const classes = ['description-list', className].filter(Boolean).join(' ');
    return (
      <dl ref={ref} className={classes} {...rest}>
        {children}
      </dl>
    );
  },
);

/**
 * Término de una `DescriptionList`. Es el `<dt>` de siempre con la clase
 * `description-list__term`: la lista ya viste sus hijos por selector de
 * elemento, así que la clase no pinta nada nuevo — está para que una app que no
 * puede escribir HTML suelto tenga una pieza que poner dentro, y para que el
 * dibujo siga en pie cuando `as` cambia el elemento.
 *
 * Reenvía el resto de props del elemento y concatena `className` tras la clase
 * propia.
 */
export const DescriptionTerm = forwardRef<HTMLElement, DescriptionTermProps>(
  function DescriptionTerm({ as: Element = 'dt', className, children, ...rest }, ref) {
    const classes = ['description-list__term', className].filter(Boolean).join(' ');
    return (
      <Element ref={ref} className={classes} {...rest}>
        {children}
      </Element>
    );
  },
);

/**
 * Valor de una `DescriptionList`. Es el `<dd>` de siempre con la clase
 * `description-list__details`; mismas razones y mismo contrato que
 * `DescriptionTerm`. Varios seguidos son varios valores de un mismo término.
 */
export const DescriptionDetails = forwardRef<HTMLElement, DescriptionDetailsProps>(
  function DescriptionDetails({ as: Element = 'dd', className, children, ...rest }, ref) {
    const classes = ['description-list__details', className].filter(Boolean).join(' ');
    return (
      <Element ref={ref} className={classes} {...rest}>
        {children}
      </Element>
    );
  },
);
