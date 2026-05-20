import { type ReactNode } from 'react';
import './Sidebar.css';
export interface SidebarProps {
    logo?: ReactNode;
    children: ReactNode;
    id?: string;
}
export declare function Sidebar({ logo, children, id }: SidebarProps): import("react/jsx-runtime").JSX.Element;
