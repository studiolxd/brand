import './Header.css';
export interface NavItem {
    label: string;
    href: string;
}
interface HeaderProps {
    id?: string;
    navItems: NavItem[];
    featuredLink?: NavItem;
    actions?: React.ReactNode;
    logoHref?: string;
    logoLabel?: string;
    navLabel?: string;
    dark?: boolean;
}
export declare function Header({ id, navItems, featuredLink, actions, logoHref, logoLabel, navLabel, dark, }: HeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
