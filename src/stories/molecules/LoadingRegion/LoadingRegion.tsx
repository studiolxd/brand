import { useId } from 'react';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './LoadingRegion.css';

export interface LoadingRegionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
  /**
   * Lo que se espera, con puntos suspensivos («Cargando bancos…»). Se anuncia,
   * no se ve. **Sin default**: sin él, sale de `spinner.label` del
   * `BrandMessagesProvider`. No se lee cuando `announce` es `false`.
   */
  label?: string;
  /**
   * `false` cuando la espera ya la anuncia una región viva que existe antes y
   * después de cargar: la región queda solo a la vista (`aria-hidden`), para
   * no anunciarla dos veces.
   */
  announce?: boolean;
  /** Los esqueletos: `SkeletonText`, `SkeletonList`, `SkeletonTable`, `SkeletonGrid` o `Skeleton` sueltos. */
  children: React.ReactNode;
}

/**
 * La espera de un contenido cuya forma se conoce: reserva su sitio con
 * esqueletos y la página no salta al llegar. El `Skeleton` es decorativo; quien
 * anuncia es esta región, con `role="status"`, `aria-busy` y el texto de la
 * espera oculto a la vista. Apila sus hijos con aire entre bloques.
 */
export function LoadingRegion({ label, announce = true, children, className, ...rest }: LoadingRegionProps) {
  const t = useBrandMessages('spinner');
  const labelId = useId();
  const classes = ['loading-region', className].filter(Boolean).join(' ');

  // El texto se lee DONDE se pinta: la región muda no exige `spinner.label`.
  if (!announce) {
    return (
      <div className={classes} aria-hidden="true" {...rest}>
        {children}
      </div>
    );
  }
  return (
    <div className={classes} role="status" aria-busy="true" aria-labelledby={labelId} {...rest}>
      <VisuallyHidden id={labelId}>{t('label', label)}</VisuallyHidden>
      {children}
    </div>
  );
}

function times(n: number) {
  return Array.from({ length: Math.max(0, Math.floor(n)) }, (_, i) => i);
}

export interface SkeletonTextProps {
  /** Líneas del párrafo; la última sale más corta. */
  lines?: number;
}

/** Un bloque de texto —un párrafo, una lista de definiciones— que aún no llegó. Decorativo. */
export function SkeletonText({ lines = 3 }: SkeletonTextProps) {
  return (
    <div className="skeleton-text" aria-hidden="true">
      {times(lines).map((i) => (
        <Skeleton
          key={i}
          className={['skeleton-text__line', i === lines - 1 && lines > 1 ? 'skeleton-text__line--last' : '']
            .filter(Boolean)
            .join(' ')}
        />
      ))}
    </div>
  );
}

export interface SkeletonListProps {
  /** Filas de la lista. */
  rows?: number;
}

/** Una lista que aún no llegó: una barra por fila, del alto de un control. Decorativo. */
export function SkeletonList({ rows = 4 }: SkeletonListProps) {
  return (
    <div className="skeleton-list" aria-hidden="true">
      {times(rows).map((i) => (
        <Skeleton key={i} className="skeleton-list__row" />
      ))}
    </div>
  );
}

export interface SkeletonTableProps {
  /** Filas de cuerpo, sin contar la cabecera. */
  rows?: number;
}

/**
 * Una tabla que aún no llegó: la cabecera y sus filas. No calca el diseño —no
 * hace falta—, solo ocupa un sitio parecido. Decorativo.
 */
export function SkeletonTable({ rows = 4 }: SkeletonTableProps) {
  return (
    <div className="skeleton-table" aria-hidden="true">
      <Skeleton className="skeleton-table__header" />
      {times(rows).map((i) => (
        <Skeleton key={i} className="skeleton-table__row" />
      ))}
    </div>
  );
}

export interface SkeletonGridProps {
  /** Columnas de la rejilla. */
  columns?: 2 | 3 | 4;
  /** Filas de la rejilla: se pintan `columns × rows` celdas. */
  rows?: number;
}

/** Una rejilla de tarjetas o miniaturas que aún no llegó. Decorativo. */
export function SkeletonGrid({ columns = 3, rows = 2 }: SkeletonGridProps) {
  return (
    <div className="skeleton-grid" data-columns={columns} aria-hidden="true">
      {times(columns * rows).map((i) => (
        <Skeleton key={i} className="skeleton-grid__item" />
      ))}
    </div>
  );
}
