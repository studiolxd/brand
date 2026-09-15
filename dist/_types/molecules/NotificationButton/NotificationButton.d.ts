import { type ButtonBaseProps } from '../../atoms/Button/Button';
import './NotificationButton.css';
/**
 * El cromo de la campana, y **solo el cromo**: cómo se llama el botón, con
 * contador y sin él. La campana no dice nada más —el número lo pinta el
 * `NumberBadge` y las notificaciones viven en otro sitio—, así que los dos
 * textos son todo lo que emite por su cuenta, y ninguno cambia de pantalla a
 * pantalla.
 */
export interface NotificationButtonMessages {
    /** Nombre accesible cuando no hay contador. */
    label: string;
    /** Nombre accesible cuando hay contador. Recibe el número. */
    countLabel: (count: number) => string;
}
export interface NotificationButtonProps extends Omit<ButtonBaseProps, 'variant' | 'iconOnly' | 'children' | 'href' | 'size'> {
    /** Notificaciones sin leer. Con 0 (o sin él) no hay contador. */
    count?: number;
    /** Tope del contador («99+»). */
    max?: number;
    /**
     * Nombre accesible cuando no hay contador. **Sin default**: sin ella, sale
     * de `notificationButton.label` del `BrandMessagesProvider`.
     */
    label?: string;
    /**
     * Nombre accesible cuando hay contador: recibe el número, para que la frase
     * se pueda rehacer en cualquier idioma. **Sin default**: sin ella, sale de
     * `notificationButton.countLabel` del proveedor.
     */
    countLabel?: (count: number) => string;
}
/**
 * La campana de la barra de la aplicación: un botón de icono con el contador
 * de no leídas volando sobre su esquina, en rojo. Qué abre (un panel, un
 * menú, una página) es del producto: es un botón y sirve de disparador.
 */
export declare const NotificationButton: import("react").ForwardRefExoticComponent<NotificationButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
