import type { ReactNode } from 'react';
import './Popover.css';
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
export declare function Popover({ trigger, children, label, open, defaultOpen, onOpenChange, side, align, sideOffset, className, }: PopoverProps): import("react/jsx-runtime").JSX.Element;
