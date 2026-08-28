import { type ReactNode } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { type PaginationProps } from '../../molecules/Pagination/Pagination';
import { type TableHeaderProps } from '../../molecules/Table/Table';
import './DataTable.css';
/**
 * Paginación en servidor: `data` es una página ya recortada y el pie refleja
 * los totales que devuelve el servidor. Sin ella la tabla pagina en cliente
 * las filas que recibe.
 */
export interface DataTableServerPagination {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: string) => void;
}
/** Etiquetas accesibles que la tabla reenvía a sus cabeceras ordenables. */
export type DataTableHeaderLabels = Pick<TableHeaderProps, 'actionsLabel' | 'sortedAscLabel' | 'sortedDescLabel' | 'sortableLabel'>;
/** Etiquetas accesibles que la tabla reenvía a su paginación. */
export type DataTablePaginationLabels = Pick<PaginationProps, 'ariaLabel' | 'pageLabel' | 'previousLabel' | 'nextLabel' | 'pagesGroupLabel' | 'pageSizeLabel' | 'totalLabel' | 'pageSizeOptions'>;
export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    /**
     * Id de columna al que engancha el buscador por defecto — filtra en cliente
     * sobre las filas que recibió la tabla. Con `pagination` (paginado en
     * servidor) eso solo buscaría en la página actual: pasa `search`.
     */
    searchColumnId?: string;
    /** Buscador controlado desde fuera, para filtrar en servidor. */
    search?: {
        value: string;
        onChange: (value: string) => void;
    };
    /** Placeholder y nombre accesible del buscador. */
    searchPlaceholder?: string;
    /** Nombre accesible del botón que vacía el buscador. Default castellano. */
    searchClearLabel?: string;
    /** Se renderiza a la derecha del buscador. */
    toolbar?: ReactNode;
    /** Filas por página cuando la tabla pagina en cliente. */
    pageSize?: number;
    /** Texto del estado vacío. */
    emptyMessage?: string;
    isLoading?: boolean;
    pagination?: DataTableServerPagination;
    headerLabels?: DataTableHeaderLabels;
    paginationLabels?: DataTablePaginationLabels;
    className?: string;
}
/**
 * Tabla de datos compuesta: buscador, ordenación, estados de carga y vacío, y
 * paginación (en cliente o en servidor) sobre el `Table` y el `Pagination` del
 * DS. El comportamiento lo aporta TanStack Table.
 *
 * Los textos accesibles llegan por props (el DS no habla de i18n): sin ellos
 * caen a los castellanos por defecto de `Table` y `Pagination`.
 */
export declare function DataTable<TData, TValue>({ columns, data, searchColumnId, search, searchPlaceholder, searchClearLabel, toolbar, pageSize, emptyMessage, isLoading, pagination, headerLabels, paginationLabels, className, }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
