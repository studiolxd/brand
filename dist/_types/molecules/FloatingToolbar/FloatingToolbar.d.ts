import { type ReactNode } from 'react';
import './FloatingToolbar.css';
export interface FloatingToolbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
    /**
     * Las acciones del **principio**: a la izquierda del elemento en
     * `sides`, al principio de la fila en `top`. Van como
     * `FloatingToolbarButton`.
     */
    start?: ReactNode;
    /**
     * Las acciones del **final**: a la derecha del elemento en `sides`, al
     * final de la fila en `top`.
     */
    end?: ReactNode;
    /**
     * Dónde se pinta la barra.
     *
     * - `auto` (por defecto): encima del elemento por debajo de `breakpoint.lg`
     *   y en dos raíles a sus lados desde `lg`. Las acciones se declaran **una
     *   vez**: es el CSS quien las coloca, no hay una barra por anchura.
     * - `top`: siempre encima.
     * - `sides`: siempre a los lados.
     *
     * @default 'auto'
     */
    layout?: 'auto' | 'top' | 'sides';
    /**
     * La barra se ve siempre, no solo al pasar el puntero o al tener el foco
     * dentro. Para el elemento **seleccionado** —el que se está editando—,
     * sobre todo en pantallas táctiles, donde no hay puntero que pase.
     *
     * @default false
     */
    alwaysVisible?: boolean;
    /**
     * Nombre accesible de la barra (`aria-label` del `role="toolbar"`).
     * **Obligatorio y sin default**: tiene que decir **de qué** son las
     * acciones —«Acciones del bloque 3: Texto»—, porque en una lista hay una
     * barra por elemento y un nombre fijo las haría indistinguibles. Es un
     * dato del producto, no un texto del sistema: por eso no está en el
     * proveedor de textos.
     */
    label: string;
    /** El elemento al que se ancla la barra. */
    children: ReactNode;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Barra de botones de icono **anclada a un elemento**: aparece al pasar el
 * puntero por él o al entrar el foco, y se pinta encima (pantallas estrechas)
 * o en dos raíles a sus lados (escritorio). Es la barra de acciones de un
 * bloque en un editor —mover, duplicar, borrar, convertir—.
 *
 * Es un `role="toolbar"` (Base UI Toolbar): **una sola parada de
 * tabulación**, y dentro se recorre con las flechas (`roving tabindex`). Sigue
 * en el orden de tabulación aunque no se vea, así que con teclado siempre se
 * alcanza; al recibir el foco aparece.
 *
 * Reenvía `ref` y `{...rest}` al elemento ancla (el contenedor), no a la barra.
 */
export declare const FloatingToolbar: import("react").ForwardRefExoticComponent<FloatingToolbarProps & import("react").RefAttributes<HTMLDivElement>>;
export interface FloatingToolbarButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'aria-label'> {
    /**
     * Nombre de la acción. Es a la vez el `aria-label` del botón y el texto del
     * bocadillo: un botón de solo icono no tiene otro nombre.
     */
    label: string;
    /** El glifo (`<Icon … />`). Decorativo: el nombre lo da `label`. */
    icon: ReactNode;
    /** Pinta la acción en rojo (borrar). */
    destructive?: boolean;
    /** Se añade DESPUÉS de las clases propias del `Button`. */
    className?: string;
}
/**
 * Un botón de `FloatingToolbar`: `Button` `ghost` `sm` de solo icono, con su
 * `Tooltip` y dentro del recorrido con flechas de la barra.
 *
 * Reenvía `ref` y `{...rest}` al `<button>`, así que sirve de `trigger` de un
 * `Popover` o un `Menu` y de asa de arrastre (el `handleRef` de dnd-kit).
 */
export declare const FloatingToolbarButton: import("react").ForwardRefExoticComponent<FloatingToolbarButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
