'use client';

import { forwardRef, useId, useState } from 'react';
import type { ReactNode } from 'react';
import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip';
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
export function TooltipProvider({
  children,
  delayDuration = 0,
  skipDelayDuration,
}: TooltipProviderProps) {
  return (
    <BaseTooltip.Provider
      delay={delayDuration}
      {...(skipDelayDuration !== undefined ? { timeout: skipDelayDuration } : {})}
    >
      {children}
    </BaseTooltip.Provider>
  );
}

/**
 * Convierte una longitud CSS (`4px`, `0.25rem`, `0.5em`) a píxeles. Sin unidad
 * reconocible devuelve 0: el token está siempre cargado con el CSS del componente.
 */
function cssLengthToPx(raw: string, el: Element): number {
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return 0;
  if (raw.endsWith('rem')) return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
  if (raw.endsWith('em')) return value * parseFloat(getComputedStyle(el).fontSize);
  return value;
}

/**
 * `sideOffset` por defecto: el Positioner de Base UI necesita un número (su
 * función de offset solo recibe medidas, no el elemento), así que el token
 * `--tooltip-offset` se lee en runtime sobre `<html>` en cada cálculo de
 * posición. Un consumidor lo cambia sobrescribiendo el token a nivel de raíz.
 */
function tokenSideOffset(): number {
  const root = document.documentElement;
  return cssLengthToPx(getComputedStyle(root).getPropertyValue('--tooltip-offset').trim(), root);
}

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'className'> {
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
export const Tooltip = forwardRef<HTMLElement, TooltipProps>(function Tooltip({
  label,
  children,
  side = 'top',
  align = 'center',
  sideOffset,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  className,
  ...rest
}, ref) {
  const popupId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false);
  const isOpen = open ?? uncontrolledOpen;

  return (
    <BaseTooltip.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => {
        if (open === undefined) setUncontrolledOpen(next);
        onOpenChange?.(next);
      }}
    >
      <BaseTooltip.Trigger
        ref={ref as React.Ref<HTMLButtonElement>}
        render={children as React.ReactElement<Record<string, unknown>>}
        aria-describedby={isOpen ? popupId : undefined}
        {...(delayDuration !== undefined ? { delay: delayDuration } : {})}
        {...rest}
      />

      <BaseTooltip.Portal>
        <BaseTooltip.Positioner className="tooltip__positioner" side={side} align={align} sideOffset={sideOffset ?? tokenSideOffset}>
          <BaseTooltip.Popup
            id={popupId}
            role="tooltip"
            className={['tooltip', className].filter(Boolean).join(' ')}
          >
            {label}
            <BaseTooltip.Arrow className="tooltip__arrow">
              {/* Mismo triángulo que servía el motor anterior: el SVG lleva la geometría y
                  el CSS solo el color (token) y el giro según el lado. */}
              <svg width="10" height="5" viewBox="0 0 30 10" preserveAspectRatio="none">
                <polygon points="0,0 30,0 15,10" />
              </svg>
            </BaseTooltip.Arrow>
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
});
