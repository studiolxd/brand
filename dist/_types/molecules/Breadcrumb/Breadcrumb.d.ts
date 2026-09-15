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
     * `aria-label` del `<nav>`. **Sin default**: sin él, sale de
     * `breadcrumb.label` del `BrandMessagesProvider`.
     */
    ariaLabel?: string;
    className?: string;
}
/**
 * El único texto que las migas dicen por su cuenta, y es **cromo**: el nombre de
 * la región. Los rótulos del rastro son **contenido** y vienen en `items`.
 */
export interface BreadcrumbMessages {
    /** Nombre accesible del `nav`. */
    label: string;
}
export declare function Breadcrumb({ items, renderLink, separator, ariaLabel, className, }: BreadcrumbProps): import("react/jsx-runtime").JSX.Element;
