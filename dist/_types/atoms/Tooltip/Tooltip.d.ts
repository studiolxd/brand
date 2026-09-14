import type { ReactNode } from 'react';
import './Tooltip.css';
export interface TooltipProviderProps {
    children: ReactNode;
    /** Retardo en ms antes de abrir el primer bocadillo. */
    delayDuration?: number;
    /** Ventana en ms durante la que pasar de un trigger a otro abre sin retardo. */
    skipDelayDuration?: number;
}
/**
 * Proveedor de tooltips. Va una sola vez por shell de aplicación — todos los
 * `Tooltip` que cuelguen de él comparten retardo y agrupación de foco.
 */
export declare function TooltipProvider({ children, delayDuration, skipDelayDuration, }: TooltipProviderProps): import("react/jsx-runtime").JSX.Element;
export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'className'> {
    /** Contenido del bocadillo. */
    label: ReactNode;
    /** Elemento que dispara el bocadillo. Recibe los props del trigger vía `render`. */
    children: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    /** Separación en px entre disparador y bocadillo. Sin él se lee el token `--tooltip-offset` (`:root`) en runtime. */
    sideOffset?: number;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Retardo propio en ms. Sin él hereda el del `TooltipProvider`. */
    delayDuration?: number;
    /**
     * Enlaza el bocadillo con su disparador por `aria-describedby`, que es lo
     * normal: el bocadillo añade algo que el disparador no dice.
     *
     * `false` para el caso contrario —el bocadillo **solo repite el nombre
     * accesible que el disparador ya tiene**, porque lo que lo corta es el CSS
     * (`text-overflow: ellipsis`) y el texto entero sigue en el DOM—. Ahí
     * describir con el mismo texto que nombra hace que el lector de pantalla
     * anuncie la frase dos veces, sin aportar nada: el bocadillo es una ayuda
     * para el ojo, no para el oído. Es lo que hace `ConversationList` con el
     * título cortado de una conversación.
     *
     * @default true
     */
    describe?: boolean;
    /** Clase adicional para el **bocadillo** (no para el disparador). */
    className?: string;
}
/**
 * Bocadillo de ayuda sobre un elemento. Base UI gestiona el retardo, el
 * posicionamiento y el cierre con Escape; el DS pone la superficie y el
 * enlace `aria-describedby` entre disparador y bocadillo (Base UI, a
 * diferencia de otros motores, no lo cablea por su cuenta).
 *
 * Requiere un `TooltipProvider` por encima (normalmente en el shell).
 *
 * Reenvía `ref` y `{...rest}` (handlers, `aria-*`, `id`, `data-*`) a su
 * **disparador**, no al bocadillo: eso es lo que le permite ser a su vez el
 * `render`/`trigger` de otro componente —un `Popover` sobre el mismo botón—,
 * porque las props que le inyecta el motor de fuera llegan al elemento real.
 * `className`, en cambio, es del bocadillo.
 */
export declare const Tooltip: import("react").ForwardRefExoticComponent<TooltipProps & import("react").RefAttributes<HTMLElement>>;
