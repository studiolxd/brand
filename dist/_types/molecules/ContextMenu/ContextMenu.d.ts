import type { ReactNode } from 'react';
import './ContextMenu.css';
export type ContextMenuButtonItem = {
    type: 'button';
    label: string;
    onClick: () => void;
    disabled?: boolean;
    destructive?: boolean;
};
export type ContextMenuLinkItem = {
    type: 'link';
    label: string;
    href: string;
    disabled?: boolean;
    destructive?: boolean;
};
export type ContextMenuSeparator = {
    type: 'separator';
};
export type ContextMenuItem = ContextMenuButtonItem | ContextMenuLinkItem | ContextMenuSeparator;
export type ContextMenuRenderLinkProps = {
    href: string;
    children: ReactNode;
    className: string;
};
export interface ContextMenuProps {
    items: ContextMenuItem[];
    renderLink?: (props: ContextMenuRenderLinkProps) => ReactNode;
    onOpenChange?: (open: boolean) => void;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    minWidth?: string;
    maxWidth?: string;
    triggerSize?: 'sm' | 'md' | 'lg';
    triggerOrientation?: 'horizontal' | 'vertical';
    triggerAriaLabel?: string;
}
export declare function ContextMenu({ items, renderLink, onOpenChange, side, align, minWidth, maxWidth, triggerSize, triggerOrientation, triggerAriaLabel, }: ContextMenuProps): import("react/jsx-runtime").JSX.Element;
