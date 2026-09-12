'use client';

import { forwardRef } from 'react';
import { CopyableValue } from '../CopyableValue/CopyableValue';
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
  /**
   * Añade un botón de copiar en línea, pegado al final del valor (nunca al
   * margen ni en su propia línea). Es para los datos que se copian —una URL
   * de callback, un identificador, el valor de un registro TXT—: siguen
   * siendo texto corriente, no código.
   */
  copyable?: boolean;
  /**
   * Qué se copia. Por defecto, el texto de `children`. Solo hace falta cuando
   * lo que se ve y lo que se copia no coinciden (un valor abreviado, una URL
   * con el protocolo escondido).
   */
  copyText?: string;
  /**
   * Nombre accesible del botón de copiar. Default castellano.
   * @default 'Copiar'
   */
  copyLabel?: string;
  /**
   * Acuse tras copiar, anunciado en una región viva. Default castellano.
   * @default 'Copiado'
   */
  copiedLabel?: string;
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
 *
 * Con `copyable`, el valor gana un botón de copiar al final de la fila. El
 * valor sigue siendo **texto corriente**: un dato que se copia no es código, y
 * meterlo en un `CodeBlock` solo para tener el botón lo disfrazaba de código.
 * Sin `copyable`, el marcado y el dibujo son exactamente los de siempre.
 */
export const DescriptionDetails = forwardRef<HTMLElement, DescriptionDetailsProps>(
  function DescriptionDetails({
    as: Element = 'dd',
    className,
    children,
    copyable = false,
    copyText,
    copyLabel = 'Copiar',
    copiedLabel = 'Copiado',
    ...rest
  }, ref) {
    const classes = [
      'description-list__details',
      copyable ? 'description-list__details--copyable' : '',
      className,
    ].filter(Boolean).join(' ');

    if (!copyable) {
      return (
        <Element ref={ref} className={classes} {...rest}>
          {children}
        </Element>
      );
    }

    return (
      <Element ref={ref} className={classes} {...rest}>
        <CopyableValue copyText={copyText} copyLabel={copyLabel} copiedLabel={copiedLabel}>
          {children}
        </CopyableValue>
      </Element>
    );
  },
);
