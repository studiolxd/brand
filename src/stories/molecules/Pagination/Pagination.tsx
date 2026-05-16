import { Select } from '../../atoms/Select/Select';
import type { SelectOption } from '../../atoms/Select/Select';
import './Pagination.css';

const DEFAULT_PAGE_SIZE_OPTIONS: SelectOption[] = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
  { label: 'Todos', value: 'all' },
];

export interface PaginationProps {
  /** Total de registros */
  total: number;
  /** Página activa (1-indexed) */
  page: number;
  /** Registros por página. Si pageSize <= 0 se interpreta como "todos". */
  pageSize: number;
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
  /** aria-label del <nav>. Default: "Paginación" */
  ariaLabel?: string;
  className?: string;
}

function getPageWindow(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (page <= 3) {
    return [1, 2, 3, '...'];
  }
  if (page >= totalPages - 2) {
    return ['...', totalPages - 2, totalPages - 1, totalPages];
  }
  return ['...', page - 1, page, page + 1, '...'];
}

export function Pagination({
  total,
  page,
  pageSize,
  onPageChange,
  hrefBuilder,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showTotal = false,
  ariaLabel = 'Paginación',
  className,
}: PaginationProps) {
  if (total === 0) return null;

  const totalPages = pageSize > 0 ? Math.ceil(total / pageSize) : 1;
  const pageItems = totalPages > 1 ? getPageWindow(page, totalPages) : [];

  function renderPageItem(item: number | '...', index: number) {
    if (item === '...') {
      return (
        <span key={`ellipsis-${index}`} className="pagination__ellipsis" aria-hidden="true">
          …
        </span>
      );
    }

    const isCurrent = item === page;
    const btnClass = ['pagination__btn', isCurrent ? 'pagination__btn--current' : '']
      .filter(Boolean)
      .join(' ');

    if (hrefBuilder) {
      return (
        <a
          key={item}
          href={isCurrent ? undefined : hrefBuilder(item)}
          className={btnClass}
          aria-current={isCurrent ? 'page' : undefined}
          aria-disabled={isCurrent ? 'true' : undefined}
          aria-label={`Página ${item}`}
          onClick={
            !isCurrent && onPageChange
              ? (e) => { e.preventDefault(); onPageChange(item as number); }
              : undefined
          }
        >
          {item}
        </a>
      );
    }

    return (
      <button
        key={item}
        className={btnClass}
        disabled={isCurrent}
        aria-current={isCurrent ? 'page' : undefined}
        aria-label={`Página ${item}`}
        onClick={() => onPageChange?.(item as number)}
      >
        {item}
      </button>
    );
  }

  function renderNavBtn(targetPage: number, label: string, ariaLabelText: string, isDisabled: boolean) {
    if (hrefBuilder) {
      return (
        <a
          href={isDisabled ? undefined : hrefBuilder(targetPage)}
          className="pagination__btn pagination__btn--nav"
          aria-label={ariaLabelText}
          aria-disabled={isDisabled ? 'true' : undefined}
          onClick={
            !isDisabled && onPageChange
              ? (e) => { e.preventDefault(); onPageChange(targetPage); }
              : undefined
          }
        >
          {label}
        </a>
      );
    }

    return (
      <button
        className="pagination__btn pagination__btn--nav"
        disabled={isDisabled}
        aria-label={ariaLabelText}
        onClick={() => onPageChange?.(targetPage)}
      >
        {label}
      </button>
    );
  }

  return (
    <nav
      className={['pagination', className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
    >
      {showTotal && (
        <span className="pagination__summary">{total} resultados</span>
      )}
      {onPageSizeChange && (
        <div className="pagination__size-selector">
          <span className="pagination__size-label">Registros por página</span>
          <Select
            options={pageSizeOptions}
            value={String(pageSize)}
            onValueChange={onPageSizeChange}
            aria-label="Registros por página"
          />
        </div>
      )}
      {totalPages > 1 && (
        <div className="pagination__controls" role="group" aria-label="Páginas">
          {renderNavBtn(page - 1, 'Anterior', 'Página anterior', page <= 1)}
          {pageItems.map((item, i) => renderPageItem(item, i))}
          {renderNavBtn(page + 1, 'Siguiente', 'Página siguiente', page >= totalPages)}
        </div>
      )}
    </nav>
  );
}
