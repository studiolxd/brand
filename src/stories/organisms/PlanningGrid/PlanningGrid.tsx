'use client';

import { forwardRef, useId, useMemo, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Input } from '../../atoms/Input/Input';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { parsePlanningHours } from './planningHours';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './PlanningGrid.css';

/**
 * Los textos de la rejilla. Todo es **cromo**: cómo se llama la tabla, cómo se
 * nombra el campo de cada cruce y cómo se llaman las tres filas del pie. Los
 * nombres de filas y columnas son contenido y los escribe quien los pasa; las
 * horas son formato y salen de `locale`.
 */
export interface PlanningGridMessages {
  /** Nombre accesible de la rejilla cuando la pantalla no le da uno propio. */
  label: string;
  /** Nombre accesible del campo de un cruce, a partir de los dos ejes. */
  cellLabel: (row: string, column: string) => string;
  /** Etiqueta de la columna de totales de fila. */
  rowTotal: string;
  /** Etiqueta de la fila de totales de columna. */
  columnTotal: string;
  /** Etiqueta de la fila de horas disponibles. */
  capacity: string;
  /** Etiqueta de la fila de resto (disponible − asignado). */
  remaining: string;
  /** Lo que se lee tras un resto negativo: hay más horas asignadas que disponibles. */
  over: string;
}

/** Una fila: un proyecto, una persona. Lo que se planifica. */
export interface PlanningGridRow {
  id: string;
  /** El nombre, **en texto plano**: con él se nombra el campo de cada cruce. */
  name: string;
  /** Cómo se pinta el nombre. Sin ella, el propio `name`. Admite un enlace. */
  label?: ReactNode;
  /** La fila entera no se edita. */
  readOnly?: boolean;
}

/** Una columna: una semana, un día, una persona. Contra qué se planifica. */
export interface PlanningGridColumn {
  key: string;
  /** El nombre, **en texto plano**: con él se nombra el campo de cada cruce. */
  name: string;
  /** Cómo se pinta el nombre. Sin ella, el propio `name`. */
  label?: ReactNode;
  /** Segunda línea del encabezado: el rango de fechas de la semana, la fecha del día. */
  sublabel?: ReactNode;
  /** Horas disponibles de la columna. Sin ella, la columna no tiene tope. */
  capacity?: number;
  /** La columna entera no se edita: una semana pasada, un día no laborable. */
  readOnly?: boolean;
  /** La columna en curso: se recuadra. */
  current?: boolean;
}

/** Un cruce con horas. Lo que no venga en la lista vale cero. */
export interface PlanningGridCell {
  rowId: string;
  columnKey: string;
  /** Las horas. `null` es lo mismo que cero a efectos de suma, y se pinta vacío. */
  value: number | null;
  /** Este cruce en concreto no se edita. */
  readOnly?: boolean;
  /** El cambio está en vuelo: la celda se atenúa. */
  pending?: boolean;
  /** Lo que falló al guardar este cruce. Pone el campo en error y se anuncia. */
  error?: string;
}

export interface PlanningGridProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  rows: PlanningGridRow[];
  columns: PlanningGridColumn[];
  /** Los cruces con horas. Los que falten valen cero. */
  cells: PlanningGridCell[];
  /**
   * Se llama al **confirmar** un cruce —al salir del campo o con Intro—, no en
   * cada tecla: la rejilla guarda contra un servidor, y una petición por
   * pulsación no es una rejilla, es una tormenta.
   */
  onCellChange?: (rowId: string, columnKey: string, value: number) => void;
  /** La rejilla entera se mira, no se edita. Sin `onCellChange` ya lo está. */
  readOnly?: boolean;
  /** Encabezado de la columna de filas («Proyecto», «Persona»). */
  rowHeader?: ReactNode;
  /** Columna de totales por fila, al final. Default `true`. */
  showRowTotals?: boolean;
  /** Fila de totales por columna, al pie. Default `true`. */
  showColumnTotals?: boolean;
  /**
   * Fila de horas disponibles al pie. Default `false`, y solo sale si alguna
   * columna declara `capacity`: repetir el tope en cada columna solo hace
   * falta cuando cambia de una a otra.
   */
  showCapacity?: boolean;
  /**
   * Fila de resto (disponible − asignado) al pie. Default `true`, y solo sale
   * si alguna columna declara `capacity`.
   */
  showRemaining?: boolean;
  /** Tope de horas de un cruce. Default 999. */
  max?: number;
  /** Locale del formato de horas. Default `'es-ES'`. */
  locale?: string;
  /** Cómo se escriben unas horas. Default: la cifra con `Intl` y una `h`. */
  formatHours?: (hours: number) => string;
  /** Talla de los campos. Default `sm`: son celdas de una rejilla. */
  size?: 'sm' | 'md' | 'lg';
  /** Nombre accesible de la rejilla. Sin él, sale de `planningGrid.label`. */
  label?: string;
  /** Nombre accesible del campo de un cruce. Sin él, sale de `planningGrid.cellLabel`. */
  cellLabel?: (row: string, column: string) => string;
}

const clave = (rowId: string, columnKey: string) => `${rowId}\u0000${columnKey}`;

/**
 * La rejilla editable de horas: fila × columna —persona por semana, proyecto
 * por día—, con los totales de cada eje y la disponibilidad de cada columna.
 *
 * **No guarda ni valida contra nada.** Llama a `onCellChange` al confirmar un
 * cruce y espera que le vuelvan a pasar las celdas; el estado en vuelo y el
 * error de guardado viajan **en la propia celda** (`pending`, `error`), que es
 * lo que permite que dos cruces estén en vuelo a la vez sin que la rejilla
 * tenga que llevar la cuenta.
 *
 * Los totales sí los suma ella: son la suma de lo que tiene delante, y no hay
 * dos formas de hacerla.
 */
export const PlanningGrid = forwardRef<HTMLDivElement, PlanningGridProps>(function PlanningGrid({
  rows,
  columns,
  cells,
  onCellChange,
  readOnly = false,
  rowHeader,
  showRowTotals = true,
  showColumnTotals = true,
  showCapacity = false,
  showRemaining = true,
  max = 999,
  locale = 'es-ES',
  formatHours,
  size = 'sm',
  label,
  cellLabel,
  className,
  ...rest
}, ref) {
  const t = useBrandMessages('planningGrid');

  const índice = useMemo(() => {
    const mapa = new Map<string, PlanningGridCell>();
    for (const cell of cells) mapa.set(clave(cell.rowId, cell.columnKey), cell);
    return mapa;
  }, [cells]);

  const número = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }), [locale]);
  const escribe = formatHours ?? ((hours: number) => `${número.format(hours)} h`);

  const valor = (rowId: string, columnKey: string) => índice.get(clave(rowId, columnKey))?.value ?? 0;

  const totalFila = (rowId: string) => columns.reduce((suma, column) => suma + valor(rowId, column.key), 0);
  const totalColumna = (columnKey: string) => rows.reduce((suma, row) => suma + valor(row.id, columnKey), 0);

  const hayCapacidad = columns.some((column) => column.capacity !== undefined);
  const editable = !readOnly && onCellChange !== undefined;
  const nombreCelda = cellLabel ?? t('cellLabel');

  return (
    <div ref={ref} className={['planning-grid', className].filter(Boolean).join(' ')} {...rest}>
      <div className="planning-grid__wrap">
        <table className="planning-grid__table">
          <caption className="visually-hidden">{t('label', label)}</caption>

          <thead>
            <tr>
              <th className="planning-grid__corner" scope="col">{rowHeader}</th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={[
                    'planning-grid__column-header',
                    column.current ? 'planning-grid__column-header--current' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {column.label ?? column.name}
                  {column.sublabel ? <span className="planning-grid__column-sub">{column.sublabel}</span> : null}
                </th>
              ))}
              {showRowTotals ? (
                <th className="planning-grid__column-header" scope="col">{t('rowTotal')}</th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th className="planning-grid__row-header" scope="row">{row.label ?? row.name}</th>

                {columns.map((column) => {
                  const cell = índice.get(clave(row.id, column.key));
                  const bloqueada = readOnly || row.readOnly || column.readOnly || cell?.readOnly || !editable;
                  const horas = cell?.value ?? null;

                  return (
                    <td
                      key={column.key}
                      className={[
                        'planning-grid__cell',
                        bloqueada ? 'planning-grid__cell--readonly' : '',
                        cell?.pending ? 'planning-grid__cell--pending' : '',
                      ].filter(Boolean).join(' ')}
                    >
                      {bloqueada ? (
                        horas ? escribe(horas) : null
                      ) : (
                        <CeldaEditable
                          key={`${row.id}-${column.key}-${horas ?? ''}`}
                          value={horas}
                          max={max}
                          size={size}
                          locale={locale}
                          error={cell?.error}
                          label={nombreCelda(row.name, column.name)}
                          onCommit={(siguiente) => onCellChange?.(row.id, column.key, siguiente)}
                        />
                      )}
                    </td>
                  );
                })}

                {showRowTotals ? (
                  <td className="planning-grid__footer-cell">{escribe(totalFila(row.id))}</td>
                ) : null}
              </tr>
            ))}
          </tbody>

          {showColumnTotals || ((showRemaining || showCapacity) && hayCapacidad) ? (
            <tfoot>
              {showColumnTotals ? (
                <tr>
                  <th className="planning-grid__footer-header" scope="row">{t('columnTotal')}</th>
                  {columns.map((column) => (
                    <td key={column.key} className="planning-grid__footer-cell">
                      {escribe(totalColumna(column.key))}
                    </td>
                  ))}
                  {showRowTotals ? (
                    <td className="planning-grid__footer-cell">
                      {escribe(rows.reduce((suma, row) => suma + totalFila(row.id), 0))}
                    </td>
                  ) : null}
                </tr>
              ) : null}

              {showCapacity && hayCapacidad ? (
                <tr>
                  <th className="planning-grid__footer-header" scope="row">{t('capacity')}</th>
                  {columns.map((column) => (
                    <td key={column.key} className="planning-grid__footer-cell">
                      {column.capacity === undefined ? null : escribe(column.capacity)}
                    </td>
                  ))}
                  {showRowTotals ? <td className="planning-grid__footer-cell" /> : null}
                </tr>
              ) : null}

              {showRemaining && hayCapacidad ? (
                <tr>
                  <th className="planning-grid__footer-header" scope="row">{t('remaining')}</th>
                  {columns.map((column) => {
                    if (column.capacity === undefined) {
                      return <td key={column.key} className="planning-grid__footer-cell" />;
                    }
                    const resto = column.capacity - totalColumna(column.key);
                    const pasado = resto < 0;
                    return (
                      <td
                        key={column.key}
                        className={[
                          'planning-grid__footer-cell',
                          pasado ? 'planning-grid__footer-cell--over' : '',
                        ].filter(Boolean).join(' ')}
                      >
                        {escribe(resto)}
                        {/* El color no es la única señal de que se han pasado. */}
                        {pasado ? <VisuallyHidden>{` (${t('over')})`}</VisuallyHidden> : null}
                      </td>
                    );
                  })}
                  {showRowTotals ? <td className="planning-grid__footer-cell" /> : null}
                </tr>
              ) : null}
            </tfoot>
          ) : null}
        </table>
      </div>
    </div>
  );
});

/**
 * El campo de un cruce. Se monta **sin control** y confirma al salir o con
 * Intro: mientras se escribe «7,5» hay un momento en el que el texto es «7,»,
 * que no es un número, y un campo controlado por el valor numérico lo borraría.
 */
function CeldaEditable({
  value,
  max,
  size,
  locale,
  error,
  label,
  onCommit,
}: {
  value: number | null;
  max: number;
  size: 'sm' | 'md' | 'lg';
  locale: string;
  error?: string;
  label: string;
  onCommit: (value: number) => void;
}) {
  const inicial = value === null ? '' : new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
  const [texto, setTexto] = useState(inicial);
  const errorId = useId();

  const confirma = () => {
    const leído = parsePlanningHours(texto);
    if (leído === null) {
      setTexto(inicial);
      return;
    }
    const acotado = Math.min(max, leído);
    if (acotado !== (value ?? 0)) onCommit(acotado);
  };

  return (
    <>
      <Input
        className="planning-grid__input"
        size={size}
        inputMode="decimal"
        aria-label={label}
        aria-describedby={error ? errorId : undefined}
        error={Boolean(error)}
        value={texto}
        onChange={(event) => setTexto(event.target.value)}
        onBlur={confirma}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            event.currentTarget.blur();
          }
        }}
      />
      {/* El error de guardado de un cruce no cabe escrito en la celda sin
          romper la rejilla: va oculto, enlazado al campo y con `role="alert"`
          para que se anuncie cuando llega. */}
      {error ? <VisuallyHidden id={errorId} role="alert">{error}</VisuallyHidden> : null}
    </>
  );
}
