'use client';

import { useId, useState } from 'react';
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

export interface TooltipProps {
  /** Contenido del bocadillo. */
  label: ReactNode;
  /** Elemento que dispara el bocadillo. Recibe los props del trigger vía `render`. */
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
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
export function Tooltip({
  label,
  children,
  side = 'top',
  align = 'center',
  sideOffset = 4,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  className,
}: TooltipProps) {
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
        render={children as React.ReactElement<Record<string, unknown>>}
        aria-describedby={isOpen ? popupId : undefined}
        {...(delayDuration !== undefined ? { delay: delayDuration } : {})}
      />

      <BaseTooltip.Portal>
        <BaseTooltip.Positioner className="tooltip__positioner" side={side} align={align} sideOffset={sideOffset}>
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
}
