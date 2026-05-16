import type { ReactNode } from 'react';
import type { ContextMenuItem, ContextMenuRenderLinkProps } from '../ContextMenu/ContextMenu';
import './UserMenu.css';
export interface UserMenuProps {
    name: string;
    email: string;
    avatarUrl?: string;
    items?: ContextMenuItem[];
    renderLink?: (props: ContextMenuRenderLinkProps) => ReactNode;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
}
export declare function UserMenu({ name, email, avatarUrl, items, renderLink, onOpenChange, defaultOpen, }: UserMenuProps): import("react/jsx-runtime").JSX.Element;
