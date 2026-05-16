import type { ReactNode } from 'react';
import './SidebarNav.css';
export interface SidebarNavItem {
    id: string;
    label: string;
    href: string;
    active?: boolean;
    icon?: ReactNode;
}
export interface SidebarNavGroup {
    id: string;
    label: string;
    items: SidebarNavItem[];
}
export type SidebarNavRenderLinkProps = {
    href: string;
    children: ReactNode;
    className: string;
    'aria-current'?: 'page';
};
export interface SidebarNavProps {
    groups: SidebarNavGroup[];
    defaultValue?: string[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
    renderLink?: (props: SidebarNavRenderLinkProps) => ReactNode;
}
export declare function SidebarNav({ groups, defaultValue, value, onValueChange, renderLink, }: SidebarNavProps): import("react/jsx-runtime").JSX.Element;
