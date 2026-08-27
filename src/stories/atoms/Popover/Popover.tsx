'use client';

import type { ReactNode } from 'react';
import { Popover as BasePopover } from '@base-ui-components/react/popover';
import './Popover.css';

/**
 * Convierte una longitud CSS (`8px`, `0.5rem`) a píxeles. Sin unidad
 * reconocible devuelve 0: el token viaja siempre con el CSS del componente.
 */
function cssLengthToPx(raw: string): number {
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return 0;
  if (raw.endsWith('rem')) return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
  return value;
}

/**
 * `sideOffset` por defecto: el Positioner de Base UI necesita un número, así que
 * el token `--popover-offset` se lee en runtime sobre `<html>` en cada cálculo
 * de posición. Un consumidor lo cambia sobrescribiendo el token en la raíz.
 */
function tokenSideOffset(): number {
  const root = document.documentElement;
  return cssLengthToPx(getComputedStyle(root).getPropertyValue('--popover-offset').trim());
}

export interface PopoverProps {
  /** Elemento que abre el panel. Recibe las props del disparador vía `render`. */
  trigger: ReactNode;
  /** Contenido del panel. */
  children: ReactNode;
  /**
   * Nombre accesible del panel. Necesario cuando el contenido no empieza por un
   * título visible que lo nombre.
   */
  label?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  /** Separación en px con el disparador. Sin ella se lee el token `--popover-offset`. */
  sideOffset?: number;
  /** Clase adicional para el panel. */
  className?: string;
}

/**
 * Panel flotante de contenido libre: una nota, un filtro, un formulario corto,
 * un calendario. Para una lista de acciones con semántica de menú, `Menu` /
 * `ContextMenu`.
 */
export function Popover({
  trigger,
  children,
  label,
  open,
  defaultOpen,
  onOpenChange,
  side = 'bottom',
  align = 'start',
  sideOffset,
  className,
}: PopoverProps) {
  return (
    <BasePopover.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => onOpenChange?.(next)}
    >
      <BasePopover.Trigger render={trigger as React.ReactElement<Record<string, unknown>>} />

      <BasePopover.Portal>
        <BasePopover.Positioner
          className="popover__positioner"
          side={side}
          align={align}
          sideOffset={sideOffset ?? tokenSideOffset}
        >
          <BasePopover.Popup
            aria-label={label}
            className={['popover', className].filter(Boolean).join(' ')}
          >
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
