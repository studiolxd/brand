import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import './Toggle.css';
type BaseToggleProps = Omit<React.ComponentPropsWithoutRef<typeof BaseToggle>, 'className'>;
/** La misma disyuntiva que en `Button`: solo icono ⇒ nombre accesible obligatorio. */
export type ToggleIconOnlyProps = {
    iconOnly: true;
    'aria-label': string;
} | {
    iconOnly: true;
    'aria-labelledby': string;
} | {
    iconOnly?: false | undefined;
};
/** Todo lo que no es la disyuntiva de `iconOnly`. */
export interface ToggleBaseProps extends Omit<BaseToggleProps, 'onPressedChange'> {
    /** Cambio de estado. Solo el estado: el DS no expone los detalles del evento. */
    onPressedChange?: (pressed: boolean) => void;
    /** Talla del sistema. Dentro de un `ToggleGroup` la hereda de él. */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Solo icono: el botón se hace cuadrado. Con `iconOnly` el tipo exige
     * `aria-label` o `aria-labelledby`: no hay texto que nombre el control.
     */
    iconOnly?: boolean;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
export type ToggleProps = ToggleBaseProps & ToggleIconOnlyProps;
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
