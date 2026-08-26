import type { ReactNode } from 'react';
import type { MenuItem, MenuRenderLinkProps } from '../Menu/Menu';
import './OrgSwitcher.css';
export interface OrgOption {
    id: string;
    name: string;
    logoUrl?: string;
}
export interface OrgSwitcherProps {
    /** Nombre accesible del botón. Por defecto, «Organización: ‹nombre›». */
    label?: string;
    /** Ocupa todo el ancho disponible (en la Sidebar). Por defecto mide lo que su contenido. */
    block?: boolean;
    /** Solo el logo. Sin él, lo decide la `Sidebar` (rail). */
    compact?: boolean;
    current: OrgOption;
    organizations: OrgOption[];
    onOrgChange: (id: string) => void;
    defaultOpen?: boolean;
    items?: MenuItem[];
    renderLink?: (props: MenuRenderLinkProps) => ReactNode;
}
export declare function OrgSwitcher({ label, block, compact, current, organizations, onOrgChange, defaultOpen, items, renderLink }: OrgSwitcherProps): import("react/jsx-runtime").JSX.Element;
