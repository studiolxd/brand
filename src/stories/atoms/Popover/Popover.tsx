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

/**
 * Detalle del evento con el que Base UI cuenta por qué se abre o se cierra el
 * panel. Trae el evento nativo (`event`), el motivo (`reason`) y `cancel()`,
 * que deja el panel como estaba. Se deriva del propio motor para no copiar su
 * forma a mano.
 */
export type PopoverChangeDetails = Parameters<
  NonNullable<React.ComponentProps<typeof BasePopover.Root>['onOpenChange']>
>[1];

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
  /**
   * Se llama al abrirse y al cerrarse. El segundo argumento es el detalle de
   * Base UI: por qué pasa y cómo cancelarlo.
   */
  onOpenChange?: (open: boolean, details: PopoverChangeDetails) => void;
  /**
   * El panel va a cerrarse por un clic **fuera** de él. `details.cancel()` lo
   * deja abierto: es el escape para el clic que cae en un portal del producto
   * (un selector nativo, un datepicker de terceros) que el motor no reconoce
   * como parte del panel.
   */
  onPointerDownOutside?: (details: PopoverChangeDetails) => void;
  /**
   * El panel va a cerrarse porque el foco se fue fuera. `details.cancel()` lo
   * deja abierto.
   */
  onFocusOutside?: (details: PopoverChangeDetails) => void;
  /** El panel va a cerrarse con Escape. `details.cancel()` lo deja abierto. */
  onEscapeKeyDown?: (details: PopoverChangeDetails) => void;
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
 *
 * Los tres motivos de cierre automático —clic fuera, foco fuera y Escape—
 * tienen su propio handler, y cada uno puede cancelarse: es lo que permite
 * mantener el panel abierto cuando el clic cae en algo que el motor no
 * reconoce como suyo.
 */
export function Popover({
  trigger,
  children,
  label,
  open,
  defaultOpen,
  onOpenChange,
  onPointerDownOutside,
  onFocusOutside,
  onEscapeKeyDown,
  side = 'bottom',
  align = 'start',
  sideOffset,
  className,
}: PopoverProps) {
  return (
    <BasePopover.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next, details) => {
        // Los tres escapes de cierre, cada uno con su nombre: el consumidor
        // decide si deja que el motor cierre (`details.cancel()` lo impide).
        if (!next) {
          if (details.reason === 'outside-press') onPointerDownOutside?.(details);
          else if (details.reason === 'focus-out') onFocusOutside?.(details);
          else if (details.reason === 'escape-key') onEscapeKeyDown?.(details);
        }
        onOpenChange?.(next, details);
      }}
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
