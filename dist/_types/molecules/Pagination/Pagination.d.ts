import type { ComponentType } from 'react';
import type { SelectOption } from '../../atoms/Select/Select';
import './Pagination.css';
export interface PaginationProps {
    /**
     * Con páginas numeradas (`pages`, por defecto) o solo anterior/siguiente
     * (`cursor`): para listados por cursor, donde no se sabe cuántas páginas hay.
     */
    mode?: 'pages' | 'cursor';
    /** Total de registros. Con `pageCount` o en modo `cursor` no hace falta. */
    total?: number;
    /** Número de páginas, cuando quien pagina ya lo sabe (en vez de `total` + `pageSize`). */
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
    /** Opciones del selector. Default: 10, 20, 50, 100, Todos */
    pageSizeOptions?: SelectOption[];
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
    /** aria-label del <nav>. Default: «Paginación» (castellano). Una app multiidioma debe pasarlo traducido. */
    ariaLabel?: string;
    /**
     * aria-label de cada botón/enlace de página. Default: `Página ${page}` (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    pageLabel?: (page: number) => string;
    /**
     * aria-label del botón "anterior". Default: "Página anterior" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    previousLabel?: string;
    /**
     * aria-label del botón "siguiente". Default: "Página siguiente" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    nextLabel?: string;
    /**
     * aria-label del `role="group"` que envuelve los controles de página.
     * Default: "Páginas" (castellano). Una app multiidioma debe pasarla traducida.
     */
    pagesGroupLabel?: string;
    /**
     * aria-label del selector de registros por página.
     * Default: "Registros por página" (castellano). Una app multiidioma debe pasarla traducida.
     */
    pageSizeLabel?: string;
    /**
     * Texto del sumario que muestra `showTotal`. Default: `${total} resultados` (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    totalLabel?: (total: number) => string;
    className?: string;
}
export declare function Pagination({ mode, total, pageCount, page, pageSize, hrefs, previousHref, nextHref, onPrevious, onNext, onPageChange, hrefBuilder: hrefBuilderProp, linkComponent, onPageSizeChange, pageSizeOptions, showTotal, size, ariaLabel, pageLabel, previousLabel, nextLabel, pagesGroupLabel, pageSizeLabel, totalLabel, className, }: PaginationProps): import("react/jsx-runtime").JSX.Element | null;
