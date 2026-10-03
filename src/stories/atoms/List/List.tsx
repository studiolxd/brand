import { forwardRef } from 'react';
import './List.css';

export type ListType = 'unordered' | 'ordered' | 'plain';

export interface ListItemProps extends React.ComponentPropsWithoutRef<'li'> {
  /**
   * Elemento a renderizar. Default `'li'`, que es lo correcto dentro de una
   * `List`. Solo se cambia cuando el ítem no cuelga de una lista real y hay
   * que darle el rol a mano (`as="div" role="listitem"`).
   */
  as?: React.ElementType;
  children?: React.ReactNode;
  /**
   * Accesorio al principio de la fila: un icono, un avatar. Pareja de
   * `trailing`; no se encoge ni parte línea y se centra con el bloque de texto.
   */
  leading?: React.ReactNode;
  /**
   * Línea menor bajo el contenido, atenuada y un peldaño por debajo del cuerpo
   * (`text.paragraph.small`): la descripción de una fila de datos o de ajustes.
   */
  secondary?: React.ReactNode;
  /**
   * Accesorio al final de la fila, alineado a la derecha: un icono, un valor,
   * un interruptor. No se encoge ni parte línea.
   */
  trailing?: React.ReactNode;
}

export interface ListProps extends React.ComponentPropsWithoutRef<'ul'> {
  /** Tipo de lista: con viñetas, numerada o sin decoración. */
  type?: ListType;
  /**
   * Dibuja una línea entre filas con los tokens `separator.*`, con su aire a
   * cada lado en lugar del `text.list.gap`. Default `false`: sin línea.
   */
  showSeparators?: boolean;
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
  showSeparators = false,
  className,
  children,
  ...rest
}, ref) {
  const Element = type === 'ordered' ? 'ol' : 'ul';
  const classes = ['list', `list--${type}`, showSeparators ? 'list--separated' : '', className ?? ''].filter(Boolean).join(' ');

  return (
    <Element ref={ref} className={classes} {...rest}>
      {children}
    </Element>
  );
});

/**
 * Ítem de una `List`. Es el `<li>` de siempre con la clase `list__item`: la
 * lista ya viste sus hijos por selector de elemento, así que la clase no pinta
 * nada nuevo — está para que una app que no puede escribir HTML suelto tenga
 * una pieza que poner dentro de `List`, y para que el aire entre ítems siga
 * funcionando cuando `as` cambia el elemento.
 *
 * Reenvía el resto de props del elemento y concatena `className` tras la clase
 * propia.
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem({
  as: Element = 'li',
  leading,
  secondary,
  trailing,
  className,
  children,
  ...rest
}, ref) {
  const classes = ['list__item', className ?? ''].filter(Boolean).join(' ');
  const hasSecondary = secondary !== undefined && secondary !== null && secondary !== false;
  const hasLeading = leading !== undefined && leading !== null && leading !== false;
  const hasTrailing = trailing !== undefined && trailing !== null && trailing !== false;

  // Sin `leading`, `secondary` ni `trailing` el ítem es exactamente el de siempre; la
  // estructura de fila solo aparece cuando se usa (`leading`, `secondary` o `trailing`).
  if (!hasSecondary && !hasTrailing && !hasLeading) {
    return (
      <Element ref={ref} className={classes} {...rest}>
        {children}
      </Element>
    );
  }

  return (
    <Element ref={ref} className={classes} {...rest}>
      <div className="list__item-row">
        {hasLeading && <div className="list__item-leading">{leading}</div>}
        <div className="list__item-main">
          {children}
          {hasSecondary && <div className="list__item-secondary">{secondary}</div>}
        </div>
        {hasTrailing && <div className="list__item-trailing">{trailing}</div>}
      </div>
    </Element>
  );
});
