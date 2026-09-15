import type { ReactNode } from 'react';
import type { MenuItem, MenuRenderLinkProps } from '../Menu/Menu';
import './UserMenu.css';
/**
 * Lo que el menú de cuenta dice por su cuenta, y es **cromo**: cómo se nombra
 * su botón y cómo se cuentan las notificaciones sin leer. Los dos interpolan un
 * dato —el nombre, el número—, así que son funciones. El nombre, el correo y
 * los ítems son **contenido** y siguen viniendo por props.
 */
export interface UserMenuMessages {
    /** Nombre accesible del botón, a partir del nombre del usuario. */
    trigger: (name: string) => string;
    /** Nombre accesible del contador de notificaciones sin leer. */
    unread: (count: number) => string;
}
export interface UserMenuProps {
    name: string;
    email: string;
    avatarUrl?: string;
    /**
     * Nombre accesible del botón. **Sin default**: sin él, sale de
     * `userMenu.trigger` del `BrandMessagesProvider`, que recibe el nombre.
     */
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
