'use client';

import { Children, createContext, isValidElement, useContext, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { useFormSize } from '../../constants/form-size';
import { LabelHiddenContext } from '../../constants/field-labels';
import './FieldRow.css';

/** Ancho de una celda de la fila. `grow` absorbe el sobrante; el resto son anchos propios. */
export type FieldRowWidth = 'grow' | 'sm' | 'md' | 'lg' | 'auto';

type RowPosition = { labelled: boolean };

const FieldRowPositionContext = createContext<RowPosition | undefined>(undefined);

export interface FieldRowsProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Dónde se ven las etiquetas de los campos: solo en la primera fila (por
   * defecto, que es como se lee una lista en columnas) o en todas. En las
   * filas sin etiqueta visible el `<label>` sigue ahí, oculto: el campo
   * conserva su nombre accesible.
   * @default 'first-row'
   */
  labels?: 'first-row' | 'every-row';
  /** Qué pintar cuando no queda ninguna fila. Sin él, la lista no ocupa nada. */
  empty?: ReactNode;
  /** Las filas: una `FieldRow` por cada elemento de la lista editable. */
  children?: ReactNode;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * La lista de filas editables: invitar personas, dominios, redirecciones,
 * variables de entorno. Solo aporta el aire entre filas y **la posición**: es
 * lo que le permite decidir qué fila enseña las etiquetas, en vez de que cada
 * consumidor se acuerde de pasar `labelHidden={i > 0}` fila a fila.
 *
 * `{...rest}` (`role`, `aria-label`, `id`, `data-*`…) va al `<div>`: la lista
 * puede ser un grupo con nombre sin envolverla en otro elemento.
 */
export function FieldRows({ labels = 'first-row', empty, children, className, ...rest }: FieldRowsProps) {
  const rows = Children.toArray(children);
  const classes = ['field-rows', className].filter(Boolean).join(' ');

  if (rows.length === 0 && empty) {
    return <div className={classes} {...rest}><div className="field-rows__empty">{empty}</div></div>;
  }

  return (
    <div className={classes} {...rest}>
      {rows.map((row, index) => {
        const labelled = labels === 'every-row' || index === 0;
        // La clave del proveedor es la de la propia fila (no su posición): al
        // quitar una fila del medio, las de abajo conservan su identidad y con
        // ella lo que el DOM guarda de sus campos.
        const key = isValidElement(row) && row.key != null ? row.key : index;
        return (
          <FieldRowPositionContext.Provider key={key} value={{ labelled }}>
            {row}
          </FieldRowPositionContext.Provider>
        );
      })}
    </div>
  );
}

export interface FieldRowProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Ancho de cada celda, por posición: `grow` absorbe el sobrante, `sm`/`md`/`lg`
   * son anchos propios y `auto` deja mandar al contenido. Sin la prop, la
   * primera celda crece y las demás van a `md`.
   */
  widths?: FieldRowWidth[];
  /**
   * La acción sobre la fila entera (quitarla, normalmente un `Button iconOnly`).
   * Va en su propia celda al final, **fuera de la columna de cualquier campo**:
   * no cuelga de la etiqueta de otra cosa ni ocupa su sitio. Su nombre accesible
   * lo pone el consumidor, y nombra la fila («Quitar a nuria@…»), no la columna.
   */
  action?: ReactNode;
  /**
   * Si esta fila enseña las etiquetas de sus campos. Dentro de `FieldRows` lo
   * decide la lista (solo la primera); suelta, la fila las enseña.
   */
  labelled?: boolean;
  /** Talla de los campos, para alinear la acción con los controles. Se hereda del `Form`. */
  size?: 'sm' | 'md' | 'lg';
  /** Las celdas, en orden: un campo por celda. */
  children: ReactNode;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * Una fila de campos con una acción al final: **reparto mixto** —una celda que
 * crece, otras con su ancho propio y la acción ocupando lo justo—, que es lo
 * que `Columns` no hace (reparte proporciones sobre celdas iguales).
 *
 * Por debajo de `md` los campos se apilan a ancho completo y la acción cae al
 * final, alineada al margen: sigue leyéndose como lo último que afecta a todo
 * lo de arriba, y queda donde la mano ya la busca en escritorio.
 *
 * Habilitar o deshabilitar la acción —la lista con una sola fila, que no se
 * puede quitar— es del consumidor: la fila no cuenta filas ni sabe qué hace su
 * acción. El `disabled` va en el botón que se le pasa.
 */
export function FieldRow({ widths, action, labelled: labelledProp, size: sizeProp, children, className, ...rest }: FieldRowProps) {
  const size = useFormSize(sizeProp);
  const position = useContext(FieldRowPositionContext);
  const labelled = labelledProp ?? position?.labelled ?? true;
  const cells = Children.toArray(children);

  const classes = [
    'field-row',
    size !== 'md' ? `field-row--${size}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <LabelHiddenContext.Provider value={!labelled}>
      <div className={classes} {...rest}>
        {cells.map((cell, index) => {
          const width = widths?.[index] ?? (index === 0 ? 'grow' : 'md');
          return (
            <div key={index} className={`field-row__cell field-row__cell--${width}`}>{cell}</div>
          );
        })}
        {action && (
          <div className="field-row__action">
            {/* Hueco de la altura de la etiqueta: la acción se alinea con los
                controles, no con los rótulos, y sigue haciéndolo si un campo
                pinta debajo su error o su ayuda. */}
            {labelled && <span className="field-row__action-offset" aria-hidden="true" />}
            {action}
          </div>
        )}
      </div>
    </LabelHiddenContext.Provider>
  );
}
