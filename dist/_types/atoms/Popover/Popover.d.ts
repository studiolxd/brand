import type { ReactNode } from 'react';
import { Popover as BasePopover } from '@base-ui-components/react/popover';
import './Popover.css';
/**
 * Detalle del evento con el que Base UI cuenta por qué se abre o se cierra el
 * panel. Trae el evento nativo (`event`), el motivo (`reason`) y `cancel()`,
 * que deja el panel como estaba. Se deriva del propio motor para no copiar su
 * forma a mano.
 */
export type PopoverChangeDetails = Parameters<NonNullable<React.ComponentProps<typeof BasePopover.Root>['onOpenChange']>>[1];
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
export declare function Popover({ trigger, children, label, open, defaultOpen, onOpenChange, onPointerDownOutside, onFocusOutside, onEscapeKeyDown, side, align, sideOffset, className, }: PopoverProps): import("react/jsx-runtime").JSX.Element;
