import { type ButtonBaseProps } from '../../atoms/Button/Button';
import './NotificationButton.css';
export interface NotificationButtonProps extends Omit<ButtonBaseProps, 'variant' | 'iconOnly' | 'children' | 'href' | 'size'> {
    /** Notificaciones sin leer. Con 0 (o sin él) no hay contador. */
    count?: number;
    /** Tope del contador («99+»). */
    max?: number;
    /** Nombre accesible. Por defecto, «Notificaciones» o «Notificaciones: N sin leer». */
    label?: string;
}
/**
 * La campana de la barra de la aplicación: un botón de icono con el contador
 * de no leídas volando sobre su esquina, en rojo. Qué abre (un panel, un
 * menú, una página) es del producto: es un botón y sirve de disparador.
 */
export declare const NotificationButton: import("react").ForwardRefExoticComponent<NotificationButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
