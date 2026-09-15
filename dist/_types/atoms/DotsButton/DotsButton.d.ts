import { type ButtonBaseProps } from '../Button/Button';
import './DotsButton.css';
/**
 * El único texto del botón de tres puntos, y es **cromo**: dice que hay más
 * acciones, no de qué son. Es el mismo en una fila de tabla, en una tarjeta y
 * dentro de un `ContextMenu`, así que va al catálogo una sola vez y el
 * `ContextMenu` lo reenvía sin repetir la clave.
 */
export interface DotsButtonMessages {
    /** Nombre accesible del botón. */
    label: string;
}
export interface DotsButtonProps extends Omit<ButtonBaseProps, 'variant' | 'iconOnly' | 'children' | 'href'> {
    /** Talla del sistema (32/40/48). */
    size?: 'sm' | 'md' | 'lg';
    /** Puntos en fila (por defecto) o en columna. */
    orientation?: 'horizontal' | 'vertical';
    /**
     * Nombre accesible del botón. **Sin default**: sin él, sale de
     * `dotsButton.label` del `BrandMessagesProvider`.
     */
    'aria-label'?: string;
}
/**
 * El botón de «más opciones»: un `Button` ghost de solo icono con el icono
 * `dots`. No tiene cara propia — es el botón del sistema — y su sitio es
 * disparar un `ContextMenu` o un `Popover`.
 */
export declare const DotsButton: import("react").ForwardRefExoticComponent<DotsButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
