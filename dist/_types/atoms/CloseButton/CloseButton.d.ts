import { type ComponentPropsWithoutRef } from 'react';
import './CloseButton.css';
export interface CloseButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
    /**
     * Nombre accesible del aspa. Default: «Cerrar» (castellano). Dice **qué**
     * cierra o quita, no qué forma tiene: «Cerrar», «Descartar aviso»,
     * «Quitar a Ana». Una app multiidioma debe pasarlo traducido.
     */
    label?: string;
    /** Talla del botón: un cuadrado de 32, 40 o 48px. El glifo mide 24 en las tres. */
    size?: 'sm' | 'md' | 'lg';
}
/**
 * El aspa del sistema: el botón que cierra lo que lo contiene —un diálogo, un
 * cajón, un aviso—. Dibuja el icono `close` del catálogo, el mismo en el que
 * termina la animación de `MenuButton`.
 *
 * **No tiene estado de hover**: ni fondo ni cambio de color al pasar el
 * puntero. El aspa ya está en la tinta de la superficie desde el reposo, así
 * que no hay nada que revelar al acercarse; el único estado que marca es el
 * foco, con el anillo del sistema. Por eso es una pieza propia y no un
 * `Button` de solo icono: `ghost` pinta un relleno en hover, que es justo lo
 * que aquí sobra.
 */
export declare const CloseButton: import("react").ForwardRefExoticComponent<CloseButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
