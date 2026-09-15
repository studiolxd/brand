import { type ComponentPropsWithoutRef } from 'react';
import './MenuButton.css';
/**
 * Los dos textos del botón de menú, y los dos son **cromo**: no dicen de qué
 * menú son, dicen qué hace el botón. Son los mismos en la cabecera de la
 * aplicación y en la del sitio, así que van al catálogo una sola vez y las dos
 * cabeceras los reenvían sin repetir la clave.
 */
export interface MenuButtonMessages {
    /** Nombre accesible del botón con el menú cerrado. */
    open: string;
    /** Nombre accesible del botón con el menú abierto. */
    close: string;
}
export interface MenuButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
    /** Estado del menú que gobierna. Abierto, el glifo `menu` se convierte en `close`. */
    isOpen?: boolean;
    /**
     * Texto accesible con el menú cerrado. Dice qué abre, no qué forma tiene.
     * **Sin default**: sin él, sale de `menuButton.open` del
     * `BrandMessagesProvider`.
     */
    label?: string;
    /**
     * Texto accesible con el menú abierto. **Sin default**: sin él, sale de
     * `menuButton.close` del `BrandMessagesProvider`. Solo se lee cuando el menú
     * está abierto: un botón que nunca se abre no exige esa clave.
     */
    closeLabel?: string;
    /** Talla del botón: un cuadrado de 32, 40 o 48px. En `lg` el glifo mide 48px. */
    size?: 'sm' | 'md' | 'lg';
}
/**
 * Botón que abre y cierra un menú. Dibuja el icono `menu` del catálogo y, al
 * abrir, anima sus tres líneas hasta el aspa del icono `close`: las dos formas
 * son la misma geometría, así que el botón nunca diverge del catálogo.
 */
export declare const MenuButton: import("react").ForwardRefExoticComponent<MenuButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
