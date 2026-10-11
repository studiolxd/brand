'use client';

import { cloneElement, forwardRef, isValidElement, useId, useState } from 'react';
import type { ReactNode } from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import './Tooltip.css';
import { usePortalContainer } from '../../constants/portal-container';
import { sideOffsetFromToken } from '../../constants/side-offset';
import { supportsFocusableWhenDisabled } from '../../constants/focusable-when-disabled';

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
 * `sideOffset` por defecto: el Positioner de Base UI necesita un número (su
 * función de offset solo recibe medidas, no el elemento), así que el token
 * `--tooltip-offset` se lee en runtime sobre `<html>` en cada cálculo de
 * posición. Un consumidor lo cambia sobrescribiendo el token a nivel de raíz.
 */
const tokenSideOffset = sideOffsetFromToken('--tooltip-offset');

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
  /**
   * Nodo DOM donde montar el portal. Por defecto, el nodo de la superficie que
   * llegue por contexto —`SiteShell` publica el suyo, para que la capa herede
   * la talla de la superficie pública— y, si no hay ninguna, `document.body`.
   * Pásalo solo para llevar la capa a otro sitio: gana siempre.
   */
  container?: HTMLElement | null;
  /**
   * Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye).
   * **Va al panel (el bocadillo); el disparador es tuyo y ya lleva tus clases**
   * (regla de `className` en componentes con portal, CLAUDE.md § Base UI).
   */
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
  describe = true,
  container,
  className,
  ...rest
}, ref) {
  const portalContainer = usePortalContainer(container);
  const popupId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false);
  const isOpen = open ?? uncontrolledOpen;

  // Un control deshabilitado no recibe foco ni eventos de puntero, y quien no
  // puede pulsar es justo quien necesita leer el porqué. Si el disparador lo
  // está, se le pide que siga enfocable (`focusableWhenDisabled`, D46): sin
  // envoltorio, el foco, el `aria-describedby` y el estado van en el propio
  // control.
  const child = isValidElement<Record<string, unknown>>(children) ? children : null;
  let trigger: React.ReactElement<Record<string, unknown>>;
  if (child && child.props.disabled && supportsFocusableWhenDisabled(child.type)) {
    trigger = cloneElement(child, { focusableWhenDisabled: true });
  } else if (child && child.props.disabled && typeof child.type === 'string') {
    // Un `<button disabled>` nativo: la misma receta, a mano.
    trigger = cloneElement(child, {
      disabled: undefined,
      'aria-disabled': true,
      onClick: (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
      },
    });
  } else {
    trigger = children as React.ReactElement<Record<string, unknown>>;
  }

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
        render={trigger}
        aria-describedby={isOpen && describe ? popupId : undefined}
        {...(delayDuration !== undefined ? { delay: delayDuration } : {})}
        {...rest}
      />

      <BaseTooltip.Portal container={portalContainer}>
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
