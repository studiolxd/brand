'use client';

import { useState, type ReactNode } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table';
import { EmptyState } from '../../molecules/EmptyState/EmptyState';
import { Input } from '../../atoms/Input/Input';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
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
   * Id de columna al que engancha el buscador por defecto — filtra en cliente
   * sobre las filas que recibió la tabla. Con `pagination` (paginado en
   * servidor) eso solo buscaría en la página actual: pasa `search`.
   */
  searchColumnId?: string;
  /** Buscador controlado desde fuera, para filtrar en servidor. */
  search?: { value: string; onChange: (value: string) => void };
  /** Placeholder y nombre accesible del buscador. */
  searchPlaceholder?: string;
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
export function DataTable<TData, TValue>({
  columns,
  data,
  searchColumnId,
  search,
  searchPlaceholder,
  toolbar,
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

  return (
    <div className={['data-table', className].filter(Boolean).join(' ')}>
      {(searchColumnId || search || toolbar) && (
        <div className="data-table__toolbar">
          {search ? (
            <Input
              type="search"
              aria-label={searchLabel}
              placeholder={searchLabel}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
            />
          ) : (
            searchColumnId && (
              <Input
                type="search"
                aria-label={searchLabel}
                placeholder={searchLabel}
                value={(table.getColumn(searchColumnId)?.getFilterValue() as string) ?? ''}
                onChange={(e) => table.getColumn(searchColumnId)?.setFilterValue(e.target.value)}
              />
            )
          )}
          {toolbar && <div className="data-table__toolbar-actions">{toolbar}</div>}
        </div>
      )}

      <div className="data-table__scroll">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();
                  return (
                    <TableHeader
                      key={header.id}
                      sortable={canSort}
                      sorted={sorted === 'asc' || sorted === 'desc' ? sorted : false}
                      onSort={canSort ? () => header.column.toggleSorting() : undefined}
                      {...headerLabels}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
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
                    <TableCell key={cell.id}>
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
            {...paginationLabels}
          />
        ) : (
          <Pagination
            total={table.getFilteredRowModel().rows.length}
            page={table.getState().pagination.pageIndex + 1}
            pageSize={table.getState().pagination.pageSize}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            {...paginationLabels}
          />
        )}
      </div>
    </div>
  );
}
