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
export interface TooltipProps {
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
    /** Clase adicional para el bocadillo. */
    className?: string;
}
/**
 * Bocadillo de ayuda sobre un elemento. Base UI gestiona el retardo, el
 * posicionamiento y el cierre con Escape; el DS pone la superficie y el
 * enlace `aria-describedby` entre disparador y bocadillo (Base UI, a
 * diferencia de otros motores, no lo cablea por su cuenta).
 *
 * Requiere un `TooltipProvider` por encima (normalmente en el shell).
 */
export declare function Tooltip({ label, children, side, align, sideOffset, open, defaultOpen, onOpenChange, delayDuration, className, }: TooltipProps): import("react/jsx-runtime").JSX.Element;
