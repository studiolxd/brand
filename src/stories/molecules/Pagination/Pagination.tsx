import type { ComponentType, ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { Select } from '../../atoms/Select/Select';
import type { SelectOption } from '../../atoms/Select/Select';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

/**
 * Las opciones del selector cuando el consumidor no pasa las suyas. Las cifras
 * no son texto traducible; la opción «sin paginar» sí, y llega del catálogo.
 */
function defaultPageSizeOptions(allLabel: string): SelectOption[] {
  return [
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
    { label: allLabel, value: 'all' },
  ];
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
  total,
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
  pageSizeOptions,
  afterPageSize,
  showTotal = false,
  size = 'md',
  ariaLabel,
  pageLabel,
  previousLabel,
  nextLabel,
  pagesGroupLabel,
  pageSizeLabel,
  totalLabel,
  className,
}: PaginationProps) {
  // Cada texto se lee donde se pinta, nunca antes: un paginador sin selector
  // de tamaño no exige el texto del selector.
  const t = useBrandMessages('pagination');
  const hrefBuilder = hrefBuilderProp ?? (hrefs ? (p: number) => hrefs[p] : undefined);
  const A = linkComponent ?? 'a';

  if (mode === 'cursor') {
    const chevronSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';
    const nav = (direction: 'prev' | 'next') => {
      const href = direction === 'prev' ? previousHref : nextHref;
      const handler = direction === 'prev' ? onPrevious : onNext;
      const disabled = !href && !handler;
      const label = direction === 'prev' ? t('previous', previousLabel) : t('next', nextLabel);
      const icon = <Icon name="chevron" size={chevronSize} className={direction === 'prev' ? 'pagination__chevron--prev' : undefined} />;
      if (href) {
        return (
          <A href={href} className="pagination__btn pagination__btn--nav" aria-label={label}>{icon}</A>
        );
      }
      return (
        <button type="button" className="pagination__btn pagination__btn--nav" disabled={disabled} aria-label={label} onClick={handler}>{icon}</button>
      );
    };
    return (
      <nav className={['pagination', `pagination--${size}`, className].filter(Boolean).join(' ')} aria-label={t('label', ariaLabel)}>
        <div className="pagination__controls" role="group" aria-label={t('pagesGroup', pagesGroupLabel)}>
          {nav('prev')}
          {nav('next')}
        </div>
      </nav>
    );
  }

  // Con 0 registros conocidos —por `total` o por `pageCount`— el nav no se
  // pinta NUNCA: no hay nada que paginar, y tampoco nada que exportar por la
  // ranura o resumir con `showTotal`. Con `total` sin informar (no es que sea
  // cero: es que no se sabe) y como mucho una página, sí cede ante la ranura
  // —una tabla que aún no ha resuelto su total pero ya trae algo que
  // exportar—; el selector y `showTotal` no bastan, porque `showTotal` sin
  // total no tiene qué mostrar.
  if (total === 0 || pageCount === 0) return null;
  if (total === undefined && (pageCount ?? 1) <= 1 && !afterPageSize) return null;

  const totalForCalc = total ?? 0;
  const totalPages = pageCount ?? (pageSize === 'all' ? 1 : Math.ceil(totalForCalc / pageSize));
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

    // La página vigente no lleva a ningún sitio: un `<a>` sin `href` no es
    // enfocable ni anunciable como enlace, así que se pinta como botón.
    if (hrefBuilder && !isCurrent) {
      return (
        <A
          key={item}
          href={hrefBuilder(item)}
          className={btnClass}
          aria-label={t('goToPage', pageLabel)(item)}
          onClick={
            onPageChange
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
        type="button"
        className={btnClass}
        aria-current={isCurrent ? 'page' : undefined}
        aria-label={t('goToPage', pageLabel)(item)}
        onClick={isCurrent ? undefined : () => onPageChange?.(item as number)}
      >
        {item}
      </button>
    );
  }

  function renderNavBtn(targetPage: number, direction: 'prev' | 'next', isDisabled: boolean) {
    const ariaLabelText = direction === 'prev' ? t('previous', previousLabel) : t('next', nextLabel);
    const chevronClass = direction === 'prev' ? 'pagination__chevron--prev' : undefined;
    const chevronSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';
    const icon = <Icon name="chevron" size={chevronSize} className={chevronClass} />;

    // Sin página a la que ir no hay destino: igual que arriba, el enlace sin
    // `href` se cambia por un botón deshabilitado, que sí es un control real.
    if (hrefBuilder && !isDisabled) {
      return (
        <A
          href={hrefBuilder(targetPage)}
          className="pagination__btn pagination__btn--nav"
          aria-label={ariaLabelText}
          onClick={
            onPageChange
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
        type="button"
        className="pagination__btn pagination__btn--nav"
        disabled={isDisabled}
        aria-label={ariaLabelText}
        onClick={() => onPageChange?.(targetPage)}
      >
        {icon}
      </button>
    );
  }

  const hasMeta = showTotal || !!onPageSizeChange || !!afterPageSize;

  return (
    <nav
      className={['pagination', `pagination--${size}`, className].filter(Boolean).join(' ')}
      aria-label={t('label', ariaLabel)}
    >
      {hasMeta && (
        <div className="pagination__meta">
          {showTotal && (
            <span className="pagination__summary">{t('total', totalLabel)(totalForCalc)}</span>
          )}
          {onPageSizeChange && (
            <div className="pagination__size-selector">
              <Select
                options={pageSizeOptions ?? defaultPageSizeOptions(t('allOption'))}
                value={pageSize === 'all' ? 'all' : String(pageSize)}
                onValueChange={onPageSizeChange}
                aria-label={t('perPage', pageSizeLabel)}
                size={size}
              />
            </div>
          )}
          {afterPageSize && (
            <div className="pagination__after-page-size">{afterPageSize}</div>
          )}
        </div>
      )}
      {totalPages > 1 && (
        <div className="pagination__controls" role="group" aria-label={t('pagesGroup', pagesGroupLabel)}>
          {renderNavBtn(page - 1, 'prev', page <= 1)}
          {pageItems.map((item, i) => renderPageItem(item, i))}
          {renderNavBtn(page + 1, 'next', page >= totalPages)}
        </div>
      )}
    </nav>
  );
}
