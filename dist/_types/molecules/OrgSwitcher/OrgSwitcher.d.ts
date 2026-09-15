import type { ReactNode } from 'react';
import type { MenuItem, MenuRenderLinkProps } from '../Menu/Menu';
import './OrgSwitcher.css';
export interface OrgOption {
    id: string;
    name: string;
    logoUrl?: string;
}
/**
 * El único texto que el conmutador dice por su cuenta, y es **cromo**: cómo se
 * nombra su botón. Interpola la organización activa, así que es una función.
 * Los nombres de las organizaciones son **contenido** y vienen en
 * `organizations`.
 */
export interface OrgSwitcherMessages {
    /** Nombre accesible del botón, a partir del nombre de la organización. */
    trigger: (name: string) => string;
}
export interface OrgSwitcherProps {
    /**
     * Nombre accesible del botón. **Sin default**: sin él, sale de
     * `orgSwitcher.trigger` del `BrandMessagesProvider`, que recibe el nombre de
     * la organización activa.
     */
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
