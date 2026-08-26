import type { ReactNode } from 'react';
import { type MenuItem, type MenuRenderLinkProps } from '../_shared/dropdownItems';
import './Menu.css';
export type { MenuItem, MenuButtonItem, MenuLinkItem, MenuSeparatorItem, MenuLabelItem, MenuRadioItem, MenuRenderLinkProps, } from '../_shared/dropdownItems';
export interface MenuProps {
    /**
     * Elemento que abre el menú. Recibe las props del trigger por `render`,
     * así que vale cualquier cosa que las reenvíe (un `Button`, un icono, un
     * avatar…). `ContextMenu` (tres puntos) y `UserMenu` (avatar) son este
     * menú con un disparador fijado.
     */
    trigger: ReactNode;
    items: MenuItem[];
    /** Valor activo del grupo de radio. Obligatorio si hay ítems `radio`. */
    value?: string;
    onValueChange?: (value: string) => void;
    renderLink?: (props: MenuRenderLinkProps) => ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Abre también al pasar el ratón por el disparador (flyout). Pulsar sigue funcionando. */
    openOnHover?: boolean;
    /** Retardo del hover, en ms. */
    hoverDelay?: number;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    minWidth?: string;
    maxWidth?: string;
    /** Talla de los ítems, la del disparador (32/40/48): el panel desplegado casa con el control plegado, como en el Select. */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
/**
 * El menú desplegable del sistema: define el vocabulario de ítems y la cara
 * (tokens `menu.*`) de todos los menús; `ContextMenu`, `UserMenu`,
 * `OrgSwitcher` o `DropdownField` son este menú con un disparador concreto.
 */
export declare function Menu({ trigger, items, value, onValueChange, renderLink, open, defaultOpen, onOpenChange, openOnHover, hoverDelay, side, align, sideOffset, minWidth, maxWidth, size, className, }: MenuProps): import("react/jsx-runtime").JSX.Element;
