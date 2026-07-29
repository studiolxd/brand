import type { ReactNode } from 'react';
import './Sidebar.css';
export interface SidebarProps {
    logo?: ReactNode;
    children: ReactNode;
    /** Slot inferior fijo (p. ej. UserMenu), fuera del scroll del panel. */
    footer?: ReactNode;
    id?: string;
    /** Mantiene el rail siempre desplegado en escritorio, sin depender de hover/foco. */
    expanded?: boolean;
}
export declare function Sidebar({ logo, children, footer, id, expanded }: SidebarProps): import("react").JSX.Element;
