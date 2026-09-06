'use client';

import { useId, useState, type ReactNode } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type SortingState,
} from '@tanstack/react-table';
import { EmptyState } from '../../molecules/EmptyState/EmptyState';
import { InputField } from '../../molecules/InputField/InputField';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { Pagination, type PaginationProps } from '../../molecules/Pagination/Pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableHeaderProps,
} from '../../molecules/Table/Table';
import './DataTable.css';

/** Alineación del contenido de una columna. `start` es el default. */
export type DataTableAlign = 'start' | 'center' | 'end';

/*
  Module augmentation de TanStack: `meta` es su punto de extensión tipado, y
  así la alineación viaja con la definición de la columna (donde ya viven
  `header` y `cell`) en vez de en una lista paralela de ids.
*/
declare module '@tanstack/react-table' {
  // TanStack declara los dos parámetros; la interfaz no los usa, pero la
  // firma debe coincidir para que la fusión sea válida.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
 * Modificador BEM de alineación, o cadena vacía para `start` (el default no
 * emite clase).
 */
function alignClass<TData, TValue>(
  element: 'cell' | 'header-cell',
  column: Column<TData, TValue>
): string {
  const align = column.columnDef.meta?.align;
  return align && align !== 'start' ? `data-table__${element}--${align}` : '';
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
export type DataTableHeaderLabels = Pick<
  TableHeaderProps,
  'actionsLabel' | 'sortedAscLabel' | 'sortedDescLabel' | 'sortableLabel'
>;

/** Etiquetas accesibles que la tabla reenvía a su paginación. */
export type DataTablePaginationLabels = Pick<
  PaginationProps,
  | 'ariaLabel'
  | 'pageLabel'
  | 'previousLabel'
  | 'nextLabel'
  | 'pagesGroupLabel'
  | 'pageSizeLabel'
  | 'totalLabel'
  | 'pageSizeOptions'
>;

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
  search?: { value: string; onChange: (value: string) => void };
  /** Placeholder y nombre accesible del buscador. */
  searchPlaceholder?: string;
  /** Nombre accesible del botón que vacía el buscador. Default castellano. */
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
export function DataTable<TData, TValue>({
  columns,
  data,
  ariaLabel,
  ariaLabelledBy,
  searchColumnId,
  search,
  searchPlaceholder,
  searchClearLabel,
  toolbar,
  footerActions,
  pageSize = 10,
  emptyMessage = 'Sin resultados',
  isLoading,
  pagination,
  headerLabels,
  paginationLabels,
  className,
}: DataTableProps<TData, TValue>) {
  // useReactTable devuelve refs de función inestables, incompatibles con el
  // React Compiler.
  'use no memo';
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // Una tabla paginada en servidor recibe exactamente una página: volver a
    // recortarla escondería filas que el servidor ya eligió.
    ...(pagination
      ? { manualPagination: true }
      : {
          getPaginationRowModel: getPaginationRowModel(),
          initialState: { pagination: { pageSize } },
        }),
  });

  const skeletonRows = pagination?.pageSize ?? pageSize;
  const searchLabel = searchPlaceholder ?? 'Buscar';
  const searchId = `${useId()}-search`;

  return (
    <div className={['data-table', className].filter(Boolean).join(' ')}>
      {(searchColumnId || search || toolbar) && (
        <div className="data-table__toolbar">
          {search ? (
            <InputField
              className="data-table__search"
              id={searchId}
              kind="search"
              clearable
              label={searchLabel}
              labelHidden
              {...(searchClearLabel ? { clearLabel: searchClearLabel } : {})}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
            />
          ) : (
            searchColumnId && (
              <InputField
                className="data-table__search"
                id={searchId}
                kind="search"
                clearable
                label={searchLabel}
                labelHidden
                {...(searchClearLabel ? { clearLabel: searchClearLabel } : {})}
                value={(table.getColumn(searchColumnId)?.getFilterValue() as string) ?? ''}
                onChange={(e) => table.getColumn(searchColumnId)?.setFilterValue(e.target.value)}
              />
            )
          )}
          {toolbar && <div className="data-table__toolbar-actions">{toolbar}</div>}
        </div>
      )}

      <div className="data-table__scroll">
        <Table aria-label={ariaLabel} aria-labelledby={ariaLabelledBy} aria-busy={isLoading || undefined}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();
                  const align = alignClass('header-cell', header.column);
                  const hidden = header.column.columnDef.meta?.headerHidden === true;
                  const content = header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext());
                  return (
                    <TableHeader
                      key={header.id}
                      className={['data-table__header-cell', align].filter(Boolean).join(' ')}
                      sortable={canSort}
                      sorted={sorted === 'asc' || sorted === 'desc' ? sorted : false}
                      onSort={canSort ? () => header.column.toggleSorting() : undefined}
                      sticky={header.column.columnDef.meta?.sticky}
                      {...headerLabels}
                    >
                      {hidden ? <VisuallyHidden>{content}</VisuallyHidden> : content}
                    </TableHeader>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                <TableRow key={rowIndex} aria-hidden="true">
                  {columns.map((_column, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyState size="sm" title={emptyMessage} />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} selected={row.getIsSelected()}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={['data-table__cell', alignClass('cell', cell.column)]
                        .filter(Boolean)
                        .join(' ')}
                      sticky={cell.column.columnDef.meta?.sticky}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="data-table__footer">
        {pagination ? (
          <Pagination
            total={pagination.total}
            page={pagination.page}
            pageSize={pagination.pageSize}
            onPageChange={pagination.onPageChange}
            onPageSizeChange={pagination.onPageSizeChange}
            showTotal
            afterPageSize={footerActions}
            {...paginationLabels}
          />
        ) : (
          <Pagination
            total={table.getFilteredRowModel().rows.length}
            page={table.getState().pagination.pageIndex + 1}
            pageSize={table.getState().pagination.pageSize}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            afterPageSize={footerActions}
            {...paginationLabels}
          />
        )}
      </div>
    </div>
  );
}
