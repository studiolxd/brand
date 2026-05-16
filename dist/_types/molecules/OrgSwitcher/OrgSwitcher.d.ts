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
}
export declare function OrgSwitcher({ current, organizations, onOrgChange, defaultOpen }: OrgSwitcherProps): import("react/jsx-runtime").JSX.Element;
