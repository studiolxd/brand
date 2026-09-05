import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import './FieldRow.css';
/** Ancho de una celda de la fila. `grow` absorbe el sobrante; el resto son anchos propios. */
export type FieldRowWidth = 'grow' | 'sm' | 'md' | 'lg' | 'auto';
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
export declare function FieldRows({ labels, empty, children, className, ...rest }: FieldRowsProps): import("react/jsx-runtime").JSX.Element;
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
export declare function FieldRow({ widths, action, labelled: labelledProp, size: sizeProp, children, className, ...rest }: FieldRowProps): import("react/jsx-runtime").JSX.Element;
