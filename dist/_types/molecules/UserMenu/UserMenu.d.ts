import type { ReactNode } from 'react';
import type { MenuItem, MenuRenderLinkProps } from '../Menu/Menu';
import './UserMenu.css';
export interface UserMenuProps {
    name: string;
    email: string;
    avatarUrl?: string;
    /** Nombre accesible del botón. Por defecto, «Cuenta de ‹nombre›». */
    label?: string;
    /** Sin nombre — avatar, badge y chevron: para la barra del AppHeader. El nombre sigue en el panel y en el nombre accesible. */
    compact?: boolean;
    /** Número de notificaciones sin leer. Si es 0 o undefined, no se muestra el badge. */
    notificationCount?: number;
    items?: MenuItem[];
    renderLink?: (props: MenuRenderLinkProps) => ReactNode;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
}
export declare function UserMenu({ name, email, avatarUrl, notificationCount, items, label, compact, renderLink, onOpenChange, defaultOpen, }: UserMenuProps): import("react/jsx-runtime").JSX.Element;
