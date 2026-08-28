import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import './Toggle.css';
type BaseToggleProps = Omit<React.ComponentPropsWithoutRef<typeof BaseToggle>, 'className'>;
export interface ToggleProps extends Omit<BaseToggleProps, 'onPressedChange'> {
    /** Cambio de estado. Solo el estado: el DS no expone los detalles del evento. */
    onPressedChange?: (pressed: boolean) => void;
    /** Talla del sistema. Dentro de un `ToggleGroup` la hereda de él. */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Solo icono: el botón se hace cuadrado. Necesita `aria-label`, porque
     * entonces no hay texto que nombre el control.
     */
    iconOnly?: boolean;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Botón de dos estados: pulsado o no (Base UI Toggle). Es un **valor que se
 * conmuta** —negrita en una barra de texto, «solo pendientes» en un filtro—, no
 * una acción: por eso queda relleno mientras está pulsado.
 *
 * El hover no pone fondo (solo marca el borde), como el resto del sistema: el
 * relleno significa «elegido», y usarlo también para el paso del ratón haría
 * ambiguo lo que está activo.
 *
 * Dentro de un `ToggleGroup` toma de él la talla; el estado marcado y la
 * exclusividad las lleva el grupo.
 */
export declare const Toggle: import("react").ForwardRefExoticComponent<ToggleProps & import("react").RefAttributes<HTMLButtonElement>>;
export {};
