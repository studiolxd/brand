import type { AnchorHTMLAttributes, ReactNode } from 'react';
import './Breadcrumb.css';
export type BreadcrumbItem = {
    label: string;
    href?: string;
};
export type BreadcrumbRenderLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: ReactNode;
    className: string;
};
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    renderLink?: (props: BreadcrumbRenderLinkProps) => ReactNode;
    separator?: ReactNode;
    /**
     * `aria-label` del `<nav>`. Default: «Migas de pan» (castellano).
     * Una app multiidioma debe pasarlo traducido.
     */
    ariaLabel?: string;
    className?: string;
}
export declare function Breadcrumb({ items, renderLink, separator, ariaLabel, className, }: BreadcrumbProps): import("react/jsx-runtime").JSX.Element;
