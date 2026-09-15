import { type ReactNode } from 'react';
import { type ColumnDef, type RowData } from '@tanstack/react-table';
import { type PaginationProps } from '../../molecules/Pagination/Pagination';
import { type TableHeaderProps } from '../../molecules/Table/Table';
import './DataTable.css';
/**
 * Los textos que la tabla de datos emite por su cuenta. Son dos, y los dos son
 * cromo: el rótulo del buscador y el aviso de que no hay filas. El resto de su
 * texto o llega por props de contenido (`ariaLabel`) o lo ponen sus piezas
 * (`Table`, `Pagination`), cada una desde su propio espacio.
 */
export interface DataTableMessages {
    /** Aviso del estado vacío cuando no hay filas que pintar. */
    empty: string;
    /** Rótulo —oculto a la vista— y placeholder del buscador. */
    search: string;
}
/** Alineación del contenido de una columna. `start` es el default. */
export type DataTableAlign = 'start' | 'center' | 'end';
declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        /**
         * Alineación del contenido de la columna, en cabecera y celda. Default
         * `start`. Números a `end`; acciones y estados a `center`.
         */
        align?: DataTableAlign;
        /**
         * La cabecera de la columna se pinta **solo para lectores de pantalla**:
         * el `header` sigue nombrando la columna, pero no se ve. Es lo que lleva
         * la columna de acciones, cuyo rótulo no aporta nada a quien ve los
         * botones. La celda de cabecera sigue ahí, con su alineación.
         */
        headerHidden?: boolean;
        /**
         * Pega la columna al borde final cuando la tabla desborda su contenedor:
         * la columna de acciones se queda alcanzable con scroll horizontal en vez
         * de caer fuera del recorte. La columna de acciones se escribe siempre
         * `{ align: 'center', headerHidden: true, sticky: 'end' }`.
         */
        sticky?: 'end';
    }
}
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
     * Nombre accesible de la tabla (`aria-label` del `<table>`). Sin él —o sin
     * `ariaLabelledBy`— la tabla llega al lector de pantalla sin nombre. No hay
     * valor por defecto: solo el consumidor sabe qué lista es.
     */
    ariaLabel?: string;
    /** Alternativa a `ariaLabel`: id del elemento que ya titula la tabla. */
    ariaLabelledBy?: string;
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
    /**
     * Placeholder y nombre accesible del buscador. Sin default: cuando no se
     * pasa, sale de `dataTable.search` del `BrandMessagesProvider`.
     */
    searchPlaceholder?: string;
    /**
     * Nombre accesible del botón que vacía el buscador. `DataTable` no le pone
     * ninguno: sin esta prop manda el de `InputField`.
     */
    searchClearLabel?: string;
    /** Se renderiza a la derecha del buscador. */
    toolbar?: ReactNode;
    /**
     * Se renderiza en el pie, **a continuación del selector de registros por
     * página** (ranura `afterPageSize` de `Pagination`) — acciones sobre el
     * conjunto (exportar…), no sobre la selección. Los botones de página se
     * quedan solos, al otro extremo. Sin ella el pie no cambia.
     */
    footerActions?: ReactNode;
    /** Filas por página cuando la tabla pagina en cliente. */
    pageSize?: number;
    /**
     * Texto del estado vacío. Sin default: sale de `dataTable.empty`. Pásalo
     * cuando esta pantalla tenga algo propio que decir («Aún no has invitado a
     * nadie»), que un catálogo común no puede saber.
     */
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
 * Ningún texto viene puesto: los propios salen del espacio `dataTable` del
 * `BrandMessagesProvider`, y los de sus piezas de los suyos (`table`,
 * `pagination`). Las props de texto siguen ahí como anulación puntual.
 */
export declare function DataTable<TData, TValue>({ columns, data, ariaLabel, ariaLabelledBy, searchColumnId, search, searchPlaceholder, searchClearLabel, toolbar, footerActions, pageSize, emptyMessage, isLoading, pagination, headerLabels, paginationLabels, className, }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
