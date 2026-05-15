import type { ReactNode } from 'react';
import './Breadcrumb.css';
export type BreadcrumbItem = {
    label: string;
    href?: string;
};
export type BreadcrumbRenderLinkProps = {
    href: string;
    children: ReactNode;
    className: string;
};
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    renderLink?: (props: BreadcrumbRenderLinkProps) => ReactNode;
    separator?: ReactNode;
    ariaLabel?: string;
    className?: string;
}
export declare function Breadcrumb({ items, renderLink, separator, ariaLabel, className, }: BreadcrumbProps): import("react/jsx-runtime").JSX.Element;
