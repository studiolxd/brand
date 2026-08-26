import type { ReactNode } from 'react';
import { type MenuItem, type MenuRenderLinkProps } from '../Menu/Menu';
/** Los ítems del ContextMenu son los del `Menu`. */
export type ContextMenuItem = MenuItem;
export type ContextMenuRenderLinkProps = MenuRenderLinkProps;
export interface ContextMenuProps {
    items: MenuItem[];
    renderLink?: (props: MenuRenderLinkProps) => ReactNode;
    onOpenChange?: (open: boolean) => void;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    minWidth?: string;
    maxWidth?: string;
    /** Talla del botón de tres puntos (talla del sistema). */
    triggerSize?: 'sm' | 'md' | 'lg';
    triggerOrientation?: 'horizontal' | 'vertical';
    /** Nombre accesible del botón. */
    label?: string;
}
/**
 * El menú de acciones de una fila, una tarjeta, un elemento: un `Menu` cuyo
 * disparador es el botón de tres puntos (`DotsButton`). Todo lo demás —ítems,
 * enlaces del router, colocación, cara— es del `Menu`.
 */
export declare function ContextMenu({ items, renderLink, onOpenChange, side, align, minWidth, maxWidth, triggerSize, triggerOrientation, label, }: ContextMenuProps): import("react/jsx-runtime").JSX.Element;
