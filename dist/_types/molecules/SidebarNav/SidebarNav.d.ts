import type { ReactNode } from 'react';
import './SidebarNav.css';
export interface SidebarNavItem {
    id: string;
    label: string;
    href: string;
    active?: boolean;
    icon?: ReactNode;
}
export interface SidebarNavLinkEntry {
    kind: 'link';
    id: string;
    label: string;
    href: string;
    active?: boolean;
    icon?: ReactNode;
}
export interface SidebarNavGroupEntry {
    kind: 'group';
    id: string;
    label: string;
    /** Cuando se especifica, el label de la categoría se renderiza como enlace. */
    href?: string;
    items: SidebarNavItem[];
}
export type SidebarNavEntry = SidebarNavLinkEntry | SidebarNavGroupEntry;
export type SidebarNavRenderLinkProps = {
    href: string;
    children: ReactNode;
    className: string;
    'aria-current'?: 'page';
};
export interface SidebarNavProps {
    entries: SidebarNavEntry[];
    defaultValue?: string[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
    renderLink?: (props: SidebarNavRenderLinkProps) => ReactNode;
}
export declare function SidebarNav({ entries, defaultValue, value, onValueChange, renderLink, }: SidebarNavProps): import("react/jsx-runtime").JSX.Element;
