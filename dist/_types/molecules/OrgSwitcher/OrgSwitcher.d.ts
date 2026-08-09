import type { ReactNode } from 'react';
import type { ContextMenuItem, ContextMenuRenderLinkProps } from '../ContextMenu/ContextMenu';
import './OrgSwitcher.css';
export interface OrgOption {
    id: string;
    name: string;
    logoUrl?: string;
}
export interface OrgSwitcherProps {
    current: OrgOption;
    organizations: OrgOption[];
    onOrgChange: (id: string) => void;
    defaultOpen?: boolean;
    items?: ContextMenuItem[];
    renderLink?: (props: ContextMenuRenderLinkProps) => ReactNode;
}
export declare function OrgSwitcher({ current, organizations, onOrgChange, defaultOpen, items, renderLink }: OrgSwitcherProps): import("react/jsx-runtime").JSX.Element;
