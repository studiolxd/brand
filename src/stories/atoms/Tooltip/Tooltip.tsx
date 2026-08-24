'use client';

import type { ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
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
    <RadixTooltip.Provider
      delayDuration={delayDuration}
      {...(skipDelayDuration !== undefined ? { skipDelayDuration } : {})}
    >
      {children}
    </RadixTooltip.Provider>
  );
}

export interface TooltipProps {
  /** Contenido del bocadillo. */
  label: ReactNode;
  /** Elemento que dispara el bocadillo. Recibe los props del trigger vía `asChild`. */
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
 * Bocadillo de ayuda sobre un elemento. Radix gestiona foco, ARIA
 * (`aria-describedby`) y el cierre con Escape; el DS pone la superficie.
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
  return (
    <RadixTooltip.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...(delayDuration !== undefined ? { delayDuration } : {})}
    >
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>

      <RadixTooltip.Portal>
        <RadixTooltip.Content
          className={['tooltip', className].filter(Boolean).join(' ')}
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          {label}
          <RadixTooltip.Arrow className="tooltip__arrow" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
