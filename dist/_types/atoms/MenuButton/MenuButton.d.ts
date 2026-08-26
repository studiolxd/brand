import { type ComponentPropsWithoutRef } from 'react';
import './MenuButton.css';
export interface MenuButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
    /** Estado del menú que gobierna. Abierto, el glifo `menu` se convierte en `close`. */
    isOpen?: boolean;
    /** Texto accesible. Dice qué abre, no qué forma tiene. */
    label?: string;
    /** Talla del botón: un cuadrado de 32 o 40px. */
    size?: 'sm' | 'md';
}
/**
 * Botón que abre y cierra un menú. Dibuja el icono `menu` del catálogo y, al
 * abrir, anima sus tres líneas hasta el aspa del icono `close`: las dos formas
 * son la misma geometría, así que el botón nunca diverge del catálogo.
 */
export declare const MenuButton: import("react").ForwardRefExoticComponent<MenuButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
