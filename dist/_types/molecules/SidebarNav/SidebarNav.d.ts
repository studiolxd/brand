import type { ReactNode } from 'react';
import './SidebarNav.css';
export interface SidebarNavItem {
    id: string;
    label: string;
    href: string;
    active?: boolean;
    icon?: ReactNode;
    /**
     * La entrada existe pero no lleva a ninguna parte todavía: se enseña con su
     * marca («sin docs») y sin enlace, en vez de esconderla.
     */
    empty?: boolean;
}
export interface SidebarNavLinkEntry {
    kind: 'link';
    id: string;
    label: string;
    href: string;
    active?: boolean;
    icon?: ReactNode;
    /** Igual que en `SidebarNavItem`: se enseña marcada y sin enlace. */
    empty?: boolean;
}
export interface SidebarNavGroupEntry {
    kind: 'group';
    id: string;
    label: string;
    /** Cuando se especifica, el label de la categoría se renderiza como enlace. */
    href?: string;
    /** Icono del grupo, visible en modo colapsado. */
    icon?: ReactNode;
    items: SidebarNavItem[];
}
export type SidebarNavEntry = SidebarNavLinkEntry | SidebarNavGroupEntry;
export type SidebarNavRenderLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: ReactNode;
    className: string;
    title?: string;
    'aria-current'?: 'page';
};
export interface SidebarNavProps {
    /**
     * Nombre accesible del `nav`. **Sin default**: sin él, sale de
     * `sidebarNav.label` del `BrandMessagesProvider`.
     */
    label?: string;
    /**
     * Marca de las entradas vacías (`empty`). **Sin default**: sale de
     * `sidebarNav.empty`. Solo se lee cuando hay alguna entrada vacía.
     */
    emptyLabel?: string;
    /** Solo iconos: los enlaces con tooltip, los grupos como menú. Sin él, lo decide la `Sidebar` (rail). */
    rail?: boolean;
    entries: SidebarNavEntry[];
    defaultValue?: string[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
    renderLink?: (props: SidebarNavRenderLinkProps) => ReactNode;
}
/**
 * Los dos textos de la navegación, los dos **cromo**: el nombre de la región
 * («Principal», el mismo en toda la suite) y la marca que se pone a una entrada
 * sin contenido. Los rótulos de las entradas son **contenido** y siguen
 * viniendo en `entries`.
 */
export interface SidebarNavMessages {
    /** Nombre accesible del `nav`. */
    label: string;
    /** Marca de las entradas sin contenido. */
    empty: string;
}
export declare function SidebarNav({ label, emptyLabel, rail, entries, defaultValue, value, onValueChange, renderLink, }: SidebarNavProps): import("react/jsx-runtime").JSX.Element;
