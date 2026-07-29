import type { ReactNode } from 'react';
import './Sidebar.css';
export interface SidebarProps {
    logo?: ReactNode;
    children: ReactNode;
    /** Slot inferior fijo (p. ej. UserMenu), fuera del scroll del panel. */
    footer?: ReactNode;
    id?: string;
}
export declare function Sidebar({ logo, children, footer, id }: SidebarProps): import("react").JSX.Element;
