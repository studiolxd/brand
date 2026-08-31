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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  mode = 'pages',
  total = 0,
  pageCount,
  page = 1,
  pageSize = 10,
  hrefs,
  previousHref,
  nextHref,
  onPrevious,
  onNext,
  onPageChange,
  hrefBuilder: hrefBuilderProp,
  linkComponent,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showTotal = false,
  size = 'md',
  ariaLabel = 'Paginación',
  pageLabel = (p) => `Página ${p}`,
  previousLabel = 'Página anterior',
  nextLabel = 'Página siguiente',
  pagesGroupLabel = 'Páginas',
  pageSizeLabel = 'Registros por página',
  totalLabel = (t) => `${t} resultados`,
  className,
}: PaginationProps) {
  const hrefBuilder = hrefBuilderProp ?? (hrefs ? (p: number) => hrefs[p] : undefined);
  const A = linkComponent ?? 'a';

  if (mode === 'cursor') {
    const chevronSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';
    const nav = (direction: 'prev' | 'next') => {
      const href = direction === 'prev' ? previousHref : nextHref;
      const handler = direction === 'prev' ? onPrevious : onNext;
      const disabled = !href && !handler;
      const label = direction === 'prev' ? previousLabel : nextLabel;
      const icon = <Icon name="chevron" size={chevronSize} className={direction === 'prev' ? 'pagination__chevron--prev' : undefined} />;
      if (href) {
        return (
          <A href={href} className="pagination__btn pagination__btn--nav" aria-label={label}>{icon}</A>
        );
      }
      return (
        <button className="pagination__btn pagination__btn--nav" disabled={disabled} aria-label={label} onClick={handler}>{icon}</button>
      );
    };
    return (
      <nav className={['pagination', `pagination--${size}`, className].filter(Boolean).join(' ')} aria-label={ariaLabel}>
        <div className="pagination__controls" role="group" aria-label={pagesGroupLabel}>
          {nav('prev')}
          {nav('next')}
        </div>
      </nav>
    );
  }

  if (pageCount === undefined && total === 0) return null;

  const totalPages = pageCount ?? (pageSize === 'all' ? 1 : Math.ceil(total / pageSize));
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
          aria-label={pageLabel(item)}
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
        aria-label={pageLabel(item)}
        onClick={isCurrent ? undefined : () => onPageChange?.(item as number)}
      >
        {item}
      </button>
    );
  }

  function renderNavBtn(targetPage: number, direction: 'prev' | 'next', isDisabled: boolean) {
    const ariaLabelText = direction === 'prev' ? previousLabel : nextLabel;
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
            <span className="pagination__summary">{totalLabel(total)}</span>
          )}
          {onPageSizeChange && (
            <div className="pagination__size-selector">
              <Select
                options={pageSizeOptions}
                value={pageSize === 'all' ? 'all' : String(pageSize)}
                onValueChange={onPageSizeChange}
                aria-label={pageSizeLabel}
                size={size}
              />
            </div>
          )}
        </div>
      )}
      {totalPages > 1 && (
        <div className="pagination__controls" role="group" aria-label={pagesGroupLabel}>
          {renderNavBtn(page - 1, 'prev', page <= 1)}
          {pageItems.map((item, i) => renderPageItem(item, i))}
          {renderNavBtn(page + 1, 'next', page >= totalPages)}
        </div>
      )}
    </nav>
  );
}
