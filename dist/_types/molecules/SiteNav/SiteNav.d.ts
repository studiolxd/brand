import type { ReactNode } from 'react';
import './SiteNav.css';
export interface SiteNavItem {
    id: string;
    label: string;
    href: string;
    /** Página actual: se marca con `aria-current="page"`. */
    current?: boolean;
}
export interface SiteNavGroup {
    id: string;
    /** Cabecera del grupo. */
    label: string;
    /** Si se indica, la cabecera es también un enlace (la portada de la sección). */
    href?: string;
    items: SiteNavItem[];
}
export type SiteNavRenderLinkProps = {
    href: string;
    children: ReactNode;
    className: string;
    'aria-current'?: 'page';
};
export interface SiteNavProps {
    groups: SiteNavGroup[];
    /** Nombre accesible del `nav`. */
    label?: string;
    /** Enlace del router del producto; por defecto, un `<a>`. */
    renderLink?: (props: SiteNavRenderLinkProps) => ReactNode;
    className?: string;
}
/**
 * El índice del sitio: grupos con cabecera y enlaces. Una columna en móvil,
 * una columna por grupo en escritorio. Es lo que llena el panel del
 * `SiteHeader` y, con la misma forma, el pie de página.
 */
export declare function SiteNav({ groups, label, renderLink, className, }: SiteNavProps): import("react/jsx-runtime").JSX.Element;
