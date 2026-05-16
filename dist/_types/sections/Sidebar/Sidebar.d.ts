import { type ReactNode } from 'react';
import './Sidebar.css';
export interface SidebarProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
    id?: string;
}
export declare function Sidebar({ open: openProp, onOpenChange, children, id }: SidebarProps): import("react/jsx-runtime").JSX.Element;
