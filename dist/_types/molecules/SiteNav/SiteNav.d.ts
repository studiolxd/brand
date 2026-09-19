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
    /**
     * Producto anunciado y todavía no disponible: el ítem se ve en su sitio pero
     * **apagado y sin navegación** — no es un enlace, no pasa por `renderLink` y
     * el tabulador no se detiene en él.
     */
    disabled?: boolean;
    /**
     * Texto del distintivo junto al rótulo («Próximamente», «Nuevo», «Beta»…).
     * Llega **ya traducido**: es contenido de ESTE sitio, como el propio rótulo,
     * no cromo del índice.
     */
    badge?: string;
}
export interface SiteNavGroup {
    id: string;
    /** Cabecera del grupo. */
    label: string;
    /** Si se indica, la cabecera es también un enlace (la portada de la sección). */
    href?: string;
    /**
     * En cuántas columnas se reparten los ítems de ESTE grupo, bajo **un solo
     * título**. Por defecto `1`, el grupo de siempre. Con `2` —el caso de un
     * grupo largo, como «Aplicaciones»— el grupo ocupa en la rejilla el ancho de
     * dos y sus ítems se pintan en dos columnas dentro de él; por debajo de `md`
     * vuelve a una, como todo lo demás. No es otro componente ni dos grupos: la
     * cabecera sigue siendo una, y con ella el encabezado por el que se recorre
     * el índice.
     */
    columns?: 1 | 2;
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
 *
 * En el breakpoint ancho el número de columnas sigue al número de grupos
 * (hasta `COLUMNS_MAX`), para que un quinto grupo no caiga solo en una
 * segunda fila; en `md` y `lg` el número de columnas es fijo. El dato viaja
 * en `data-columns`, no en un atributo `style`: una app con
 * `style-src 'self'` descarta el atributo sin avisar y el grupo de más caía
 * a la segunda fila.
 *
 * Un grupo puede valer por dos (`columns: 2`): ocupa el ancho de dos en la
 * rejilla y reparte sus ítems en dos columnas bajo un solo título. El dato va
 * también en un atributo, `data-group-columns`, por el mismo motivo.
 */
/**
 * El único texto que el índice dice por su cuenta, y es **cromo**: el nombre de
 * la región de navegación. Los grupos y sus enlaces son **contenido** y vienen
 * en `groups`.
 */
export interface SiteNavMessages {
    /** Nombre accesible del `nav`. */
    label: string;
}
export declare function SiteNav({ groups, label, renderLink, className, }: SiteNavProps): import("react/jsx-runtime").JSX.Element;
