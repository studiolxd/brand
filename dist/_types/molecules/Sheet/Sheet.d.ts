import type { ReactNode } from 'react';
import './Sheet.css';
export interface SheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Borde por el que entra el panel. */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /** Título del panel. Su texto es también el nombre accesible del diálogo. */
    title: ReactNode;
    /** Oculta el título visualmente y lo deja solo como nombre accesible. */
    titleHidden?: boolean;
    description?: ReactNode;
    /** Fila de acciones al pie del panel. */
    footer?: ReactNode;
    children: ReactNode;
    closeLabel?: string;
    /** Elemento que abre el panel. Sin él, la apertura la controla el consumidor. */
    trigger?: ReactNode;
    /**
     * Se dispara cuando termina la animación de entrada o de salida del panel.
     * Sirve para desmontar el panel solo después de que haya salido de pantalla.
     */
    onAnimationEndCapture?: (event: React.AnimationEvent) => void;
    className?: string;
}
/**
 * Fila de acciones del panel. El caso normal se resuelve con la prop `footer`
 * de `Sheet`; esta pieza es para los paneles que cambian de pie según el paso
 * en el que estén y lo renderizan dentro de su propio contenido.
 */
export declare function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
/**
 * Panel que entra deslizándose por un borde de la pantalla. Es el patrón que
 * `Modal` no cubre — este no se centra, ocupa un lateral (o el borde superior
 * o inferior) y deja ver el contexto detrás.
 *
 * Base UI Dialog aporta el portal, el velo, la trampa de foco y el cierre con
 * Escape; el DS pone la superficie y la dirección de entrada.
 */
export declare function Sheet({ open, onOpenChange, side, title, titleHidden, description, footer, children, closeLabel, trigger, onAnimationEndCapture, className, }: SheetProps): import("react/jsx-runtime").JSX.Element;
