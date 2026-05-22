import type { ComponentType } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent?: ComponentType<any>;
  /** Tamaño del componente. Default: "md" */
  size?: 'sm' | 'md' | 'lg';
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
  linkComponent,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showTotal = false,
  size = 'md',
  ariaLabel = 'Paginación',
  className,
}: PaginationProps) {
  if (total === 0) return null;

  const A = linkComponent ?? 'a';

  const totalPages = pageSize === 'all' ? 1 : Math.ceil(total / pageSize);
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
        <A
          key={item}
          href={isCurrent ? undefined : hrefBuilder(item)}
          className={btnClass}
          aria-current={isCurrent ? 'page' : undefined}
          aria-label={`Página ${item}`}
          onClick={
            !isCurrent && onPageChange
              ? (e) => { e.preventDefault(); onPageChange(item as number); }
              : undefined
          }
        >
          {item}
        </A>
      );
    }

    return (
      <button
        key={item}
        className={btnClass}
        aria-current={isCurrent ? 'page' : undefined}
        aria-label={`Página ${item}`}
        onClick={isCurrent ? undefined : () => onPageChange?.(item as number)}
      >
        {item}
      </button>
    );
  }

  function renderNavBtn(targetPage: number, direction: 'prev' | 'next', isDisabled: boolean) {
    const ariaLabelText = direction === 'prev' ? 'Página anterior' : 'Página siguiente';
    const chevronClass = direction === 'prev' ? 'pagination__chevron--prev' : undefined;
    const chevronSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';
    const icon = <Icon name="chevron" size={chevronSize} className={chevronClass} />;

    if (hrefBuilder) {
      return (
        <A
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
          {icon}
        </A>
      );
    }

    return (
      <button
        className="pagination__btn pagination__btn--nav"
        disabled={isDisabled}
        aria-label={ariaLabelText}
        onClick={() => onPageChange?.(targetPage)}
      >
        {icon}
      </button>
    );
  }

  const hasMeta = showTotal || !!onPageSizeChange;

  return (
    <nav
      className={['pagination', `pagination--${size}`, className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
    >
      {hasMeta && (
        <div className="pagination__meta">
          {showTotal && (
            <span className="pagination__summary">{total} resultados</span>
          )}
          {onPageSizeChange && (
            <div className="pagination__size-selector">
              <Select
                options={pageSizeOptions}
                value={pageSize === 'all' ? 'all' : String(pageSize)}
                onValueChange={onPageSizeChange}
                aria-label="Registros por página"
                size={size}
              />
            </div>
          )}
        </div>
      )}
      {totalPages > 1 && (
        <div className="pagination__controls" role="group" aria-label="Páginas">
          {renderNavBtn(page - 1, 'prev', page <= 1)}
          {pageItems.map((item, i) => renderPageItem(item, i))}
          {renderNavBtn(page + 1, 'next', page >= totalPages)}
        </div>
      )}
    </nav>
  );
}
