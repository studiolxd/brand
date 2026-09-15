import type { ComponentType, ReactNode } from 'react';
import type { SelectOption } from '../../atoms/Select/Select';
import './Pagination.css';
/**
 * Los textos que el paginador emite por su cuenta. Los nombres calcan el
 * espacio `pagination` del catálogo de la suite, así que montarlo es mapear
 * clave a clave y no traducir de nuevo.
 *
 * Todas obligatorias: es el proveedor quien garantiza que ninguna falte, y
 * quien las pinta ya no tiene un castellano por defecto donde caer.
 */
export interface PaginationMessages {
    /** `aria-label` del `<nav>`. */
    label: string;
    /** `aria-label` del `role="group"` que envuelve los controles de página. */
    pagesGroup: string;
    /** `aria-label` del control «anterior». */
    previous: string;
    /** `aria-label` del control «siguiente». */
    next: string;
    /** `aria-label` de cada botón/enlace de página, con su número. */
    goToPage: (page: number) => string;
    /** `aria-label` del selector de registros por página. */
    perPage: string;
    /** Sumario de `showTotal`, con el número de registros. */
    total: (total: number) => string;
    /** Rótulo de la opción «sin paginar» del selector de registros por página. */
    allOption: string;
}
export interface PaginationProps {
    /**
     * Con páginas numeradas (`pages`, por defecto) o solo anterior/siguiente
     * (`cursor`): para listados por cursor, donde no se sabe cuántas páginas hay.
     */
    mode?: 'pages' | 'cursor';
    /**
     * Total de registros. Con `pageCount` o en modo `cursor` no hace falta.
     * Con `0` el paginador **no se pinta nunca** —ni con `pageCount` informado,
     * ni con `showTotal`, ni con la ranura `afterPageSize` llena: no hay nada
     * que paginar ni que exportar—. Ver la regla completa en `pageCount`.
     */
    total?: number;
    /**
     * Número de páginas, cuando quien pagina ya lo sabe (en vez de `total` +
     * `pageSize`). Con `0`, igual que `total={0}`: el paginador no se pinta.
     *
     * Regla completa de cuándo el `<nav>` devuelve `null` (modo `pages`; en
     * `cursor` no aplica, ver su prop): `total === 0`, o `pageCount === 0`, o
     * (`total` sin informar y `pageCount` sin informar o `<= 1` y sin
     * `afterPageSize`). Con una sola página pero `total` informado y mayor que
     * 0, como hoy: se pinta si hay selector, ranura o `showTotal`.
     */
    pageCount?: number;
    /** Página activa (1-indexed). En modo `cursor`, opcional. */
    page?: number;
    /** Registros por página. "all" muestra todos los registros sin paginación. */
    pageSize?: number | 'all';
    /** Enlaces por página, ya calculados (útil desde un Server Component, donde no se puede pasar una función). */
    hrefs?: Record<number, string>;
    /** Modo `cursor`: enlaces de anterior/siguiente. Sin ellos, el botón va deshabilitado. */
    previousHref?: string;
    nextHref?: string;
    /** Modo `cursor`: manejadores de anterior/siguiente cuando no hay enlaces. */
    onPrevious?: () => void;
    onNext?: () => void;
    /**
     * Callback al cambiar de página. Opcional cuando se usa hrefBuilder
     * (la navegación ocurre mediante el href nativo del <a>).
     */
    onPageChange?: (page: number) => void;
    /**
     * Si se pasa, los botones de página y los de Anterior/Siguiente
     * se renderizan como <a href={hrefBuilder(n)}> en lugar de <button>.
     * Útil para SSR, SEO y comportamientos nativos del navegador.
     */
    hrefBuilder?: (page: number) => string;
    /** Si se pasa, aparece el selector de registros por página */
    onPageSizeChange?: (size: string) => void;
    /**
     * Opciones del selector. Sin ellas, 10/20/50/100 y la opción «sin paginar»,
     * cuyo rótulo sale de `pagination.allOption` (las cifras no se traducen).
     */
    pageSizeOptions?: SelectOption[];
    /**
     * Ranura a continuación del selector de registros por página, dentro del
     * mismo grupo que el total: acciones sobre el conjunto (exportar, imprimir).
     * Los botones de página se quedan solos al otro extremo. Con la ranura llena
     * el nav se pinta aunque no haya páginas que recorrer.
     */
    afterPageSize?: ReactNode;
    /** Mostrar "X resultados" antes de los controles. Default: false */
    showTotal?: boolean;
    /**
     * Componente Link del router. Default: "a" (recarga completa).
     * Acepta next/link, react-router Link, etc. — cualquier componente
     * que acepte las props estándar de <a> (href, className, …).
     */
    linkComponent?: ComponentType<any>;
    /** Tamaño del componente. Default: "md" */
    size?: 'sm' | 'md' | 'lg';
    /**
     * `aria-label` del `<nav>`. Sin default: cuando no se pasa, sale de
     * `pagination.label` del `BrandMessagesProvider`.
     */
    ariaLabel?: string;
    /** `aria-label` de cada botón/enlace de página. Sin default: `pagination.goToPage`. */
    pageLabel?: (page: number) => string;
    /** `aria-label` del botón «anterior». Sin default: `pagination.previous`. */
    previousLabel?: string;
    /** `aria-label` del botón «siguiente». Sin default: `pagination.next`. */
    nextLabel?: string;
    /**
     * `aria-label` del `role="group"` que envuelve los controles de página.
     * Sin default: `pagination.pagesGroup`.
     */
    pagesGroupLabel?: string;
    /** `aria-label` del selector de registros por página. Sin default: `pagination.perPage`. */
    pageSizeLabel?: string;
    /** Texto del sumario que muestra `showTotal`. Sin default: `pagination.total`. */
    totalLabel?: (total: number) => string;
    className?: string;
}
export declare function Pagination({ mode, total, pageCount, page, pageSize, hrefs, previousHref, nextHref, onPrevious, onNext, onPageChange, hrefBuilder: hrefBuilderProp, linkComponent, onPageSizeChange, pageSizeOptions, afterPageSize, showTotal, size, ariaLabel, pageLabel, previousLabel, nextLabel, pagesGroupLabel, pageSizeLabel, totalLabel, className, }: PaginationProps): import("react/jsx-runtime").JSX.Element | null;
