import { type ButtonBaseProps } from '../Button/Button';
import './DotsButton.css';
export interface DotsButtonProps extends Omit<ButtonBaseProps, 'variant' | 'iconOnly' | 'children' | 'href'> {
    /** Talla del sistema (32/40/48). */
    size?: 'sm' | 'md' | 'lg';
    /** Puntos en fila (por defecto) o en columna. */
    orientation?: 'horizontal' | 'vertical';
}
/**
 * El botón de «más opciones»: un `Button` ghost de solo icono con el icono
 * `dots`. No tiene cara propia — es el botón del sistema — y su sitio es
 * disparar un `ContextMenu` o un `Popover`.
 */
export declare const DotsButton: import("react").ForwardRefExoticComponent<DotsButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
