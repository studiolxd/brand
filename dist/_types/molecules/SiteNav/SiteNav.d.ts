import type { ReactNode } from 'react';
import './SiteNav.css';
export interface SiteNavItem {
    id: string;
    label: string;
    href: string;
    /** Página actual: se marca con `aria-current="page"`. */
    current?: boolean;
    /** Destino del enlace (`_blank` para abrir en otra pestaña). Útil para enlaces a otro dominio. */
    target?: string;
    /** Relación del enlace. Con `target="_blank"` y sin valor, se aplica `noopener noreferrer`. */
    rel?: string;
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
    /** Presente solo si el ítem lo declara; el consumidor debe reenviarlo a su enlace. */
    target?: string;
    /** Presente solo si el ítem lo declara o si `target="_blank"` lo impone; reenviar junto a `target`. */
    rel?: string;
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
