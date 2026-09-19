'use client';

import { forwardRef, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { heatmapRampIndex, heatmapStep, HEATMAP_RAMP_STEPS } from './heatmapScale';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './Heatmap.css';

export type { HeatmapScale } from './heatmapScale';

/**
 * Los tres textos de la matriz, y los tres son **cromo**: cómo se llama la
 * tabla, cómo se dice que una casilla no tiene dato y cómo se llama la
 * leyenda. Los nombres de filas y columnas son contenido, y los escribe quien
 * pasa los datos.
 */
export interface HeatmapMessages {
  /** Nombre accesible de la matriz cuando la pantalla no le da uno propio. */
  label: string;
  /** Cómo se dice que una casilla no tiene dato — nadie la midió. */
  empty: string;
  /** Nombre accesible de la leyenda de la rampa. */
  scale: string;
}

/** Una fila: una persona, un puesto. */
export interface HeatmapRow {
  id: string;
  /** Cómo se llama la fila. Admite un nodo: un enlace a la ficha, por ejemplo. */
  label: ReactNode;
}

/** Una columna: una competencia, un mes. */
export interface HeatmapColumn {
  key: string;
  /** Cómo se llama la columna. */
  label: ReactNode;
  /**
   * Grupo al que pertenece (la categoría de la competencia). Las columnas
   * consecutivas con el mismo grupo se agrupan bajo una cabecera común; el
   * orden de las columnas lo decide quien las pasa, no la matriz.
   */
  group?: string;
}

/** Una casilla. Lo que no venga en la lista es una casilla **sin dato**. */
export interface HeatmapCell {
  rowId: string;
  columnKey: string;
  /** La magnitud. `null` es sin dato, que no es lo mismo que el mínimo. */
  value: number | null;
}

export interface HeatmapProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  rows: HeatmapRow[];
  columns: HeatmapColumn[];
  /** Las casillas con dato. Las que falten se pintan sin dato. */
  cells: HeatmapCell[];
  /** Extremo bajo del dominio. Default 0. */
  min?: number;
  /**
   * Extremo alto del dominio. **Sin él sale del mayor valor de `cells`**, que
   * sirve para explorar pero hace que dos matrices del mismo panel no se
   * puedan comparar: en cuanto haya dos, se pasa.
   */
  max?: number;
  /** Pasos de la rampa, de 2 a 6. Default 5. */
  steps?: number;
  /** Encabezado de la columna de filas («Persona», «Puesto»). */
  rowHeader?: ReactNode;
  /** Pinta la cifra dentro de la celda. Default `true`. Con `false` sigue leyéndose. */
  showValues?: boolean;
  /** Cómo se escribe una magnitud. Default: la cifra tal cual, con `Intl`. */
  formatValue?: (value: number) => string;
  /** Locale del formato por defecto. Default `'es-ES'`. */
  locale?: string;
  /** Enseña la leyenda de la rampa. Default `true`. */
  showLegend?: boolean;
  /** Rótulo del extremo bajo de la leyenda. Default: el mínimo formateado. */
  minLabel?: ReactNode;
  /** Rótulo del extremo alto de la leyenda. Default: el máximo formateado. */
  maxLabel?: ReactNode;
  /**
   * Nombre accesible de la matriz. **Sin él**, sale de `heatmap.label` del
   * `BrandMessagesProvider`.
   */
  label?: string;
  /**
   * Cómo se dice que una casilla no tiene dato. **Sin él**, sale de
   * `heatmap.empty`.
   */
  emptyLabel?: string;
  /**
   * Nombre accesible de la leyenda. **Sin él**, sale de `heatmap.scale`. Solo
   * se lee con `showLegend`.
   */
  scaleLabel?: string;
}

/** La clave de una casilla dentro del índice. */
const clave = (rowId: string, columnKey: string) => `${rowId}\u0000${columnKey}`;

/**
 * La matriz de valores con escala de color: competencias por persona,
 * cobertura por puesto.
 *
 * **La cifra va dentro de la celda**, así que el color no es nunca la única
 * señal: quien no distingue un azul de otro lee el número, y quien usa un
 * lector de pantalla oye el nombre de la fila, el de la columna y el valor,
 * porque la tabla tiene encabezados de verdad en los dos ejes.
 *
 * No calcula nada: recibe las casillas y el dominio (`min`/`max`) y reparte.
 * Lo que no venga en `cells` es una casilla **sin dato**, que se pinta rayada
 * y no como el mínimo.
 */
export const Heatmap = forwardRef<HTMLDivElement, HeatmapProps>(function Heatmap({
  rows,
  columns,
  cells,
  min = 0,
  max,
  steps = 5,
  rowHeader,
  showValues = true,
  formatValue,
  locale = 'es-ES',
  showLegend = true,
  minLabel,
  maxLabel,
  label,
  emptyLabel,
  scaleLabel,
  className,
  ...rest
}, ref) {
  const t = useBrandMessages('heatmap');

  const índice = useMemo(() => {
    const mapa = new Map<string, number | null>();
    for (const cell of cells) mapa.set(clave(cell.rowId, cell.columnKey), cell.value);
    return mapa;
  }, [cells]);

  const techo = useMemo(() => {
    if (max !== undefined) return max;
    const valores = cells.map((c) => c.value).filter((v): v is number => v !== null && Number.isFinite(v));
    return valores.length > 0 ? Math.max(...valores) : min + 1;
  }, [cells, max, min]);

  const pasos = Math.max(2, Math.min(HEATMAP_RAMP_STEPS, Math.round(steps)));
  const escala = { min, max: techo, steps: pasos };

  const número = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }), [locale]);
  const escribe = formatValue ?? ((value: number) => número.format(value));

  // Los grupos: columnas consecutivas con el mismo `group`. Una matriz sin
  // grupos no pinta la fila de cabeceras de grupo.
  const grupos = useMemo(() => {
    const salida: { group: string | undefined; span: number }[] = [];
    for (const column of columns) {
      const último = salida[salida.length - 1];
      if (último && último.group === column.group) último.span += 1;
      else salida.push({ group: column.group, span: 1 });
    }
    return salida;
  }, [columns]);

  const hayGrupos = columns.some((column) => column.group !== undefined);

  return (
    <div ref={ref} className={['heatmap', className].filter(Boolean).join(' ')} {...rest}>
      <div className="heatmap__wrap">
        <table className="heatmap__table">
          <caption className="visually-hidden">{t('label', label)}</caption>

          <thead>
            {hayGrupos ? (
              <tr>
                <td className="heatmap__corner" />
                {grupos.map((grupo, i) => (
                  <th
                    key={`${grupo.group ?? ''}-${i}`}
                    className="heatmap__group"
                    scope="colgroup"
                    colSpan={grupo.span}
                  >
                    {grupo.group}
                  </th>
                ))}
              </tr>
            ) : null}
            <tr>
              <th className="heatmap__corner" scope="col">{rowHeader}</th>
              {columns.map((column) => (
                <th key={column.key} className="heatmap__column-header" scope="col">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th className="heatmap__row-header" scope="row">{row.label}</th>
                {columns.map((column) => {
                  const valor = índice.get(clave(row.id, column.key)) ?? null;
                  const paso = heatmapStep(valor, escala);
                  const clases = [
                    'heatmap__cell',
                    paso === null
                      ? 'heatmap__cell--empty'
                      : `heatmap__cell--step-${heatmapRampIndex(paso, pasos)}`,
                  ].join(' ');
                  const texto = valor === null ? t('empty', emptyLabel) : escribe(valor);

                  return (
                    <td key={column.key} className={clases}>
                      {showValues && valor !== null ? texto : <VisuallyHidden>{texto}</VisuallyHidden>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showLegend ? (
        <p className="heatmap__legend">
          <span>{minLabel ?? escribe(min)}</span>
          {/* La rampa es decorativa: los dos extremos, que son lo que dice qué
              significa el color, van en texto a sus lados. */}
          <span className="heatmap__ramp" role="img" aria-label={t('scale', scaleLabel)}>
            {Array.from({ length: pasos }, (_, i) => (
              <span
                key={i}
                className={`heatmap__swatch heatmap__swatch--step-${heatmapRampIndex(i + 1, pasos)}`}
              />
            ))}
          </span>
          <span>{maxLabel ?? escribe(techo)}</span>
        </p>
      ) : null}
    </div>
  );
});
