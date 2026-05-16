import type { ComponentType } from 'react';
import type { SelectOption } from '../../atoms/Select/Select';
import './Pagination.css';
export interface PaginationProps {
    /** Total de registros */
    total: number;
    /** Página activa (1-indexed) */
    page: number;
    /** Registros por página. "all" muestra todos los registros sin paginación. */
    pageSize: number | 'all';
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
    /** aria-label del <nav>. Default: "Paginación" */
    ariaLabel?: string;
    className?: string;
}
export declare function Pagination({ total, page, pageSize, onPageChange, hrefBuilder, linkComponent, onPageSizeChange, pageSizeOptions, showTotal, ariaLabel, className, }: PaginationProps): import("react/jsx-runtime").JSX.Element | null;
