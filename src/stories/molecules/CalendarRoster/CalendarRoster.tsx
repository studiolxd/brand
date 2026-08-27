import type { ComponentType, MouseEvent, ReactNode } from 'react';
import { Tag } from '../../atoms/Tag/Tag';
import type { TagVariant } from '../../atoms/Tag/Tag';
import { PrevNextNav } from '../PrevNextNav/PrevNextNav';
import { isSameDay, shiftMonth } from '../_shared/calendarGrid';
import './CalendarRoster.css';

export type RosterCellType =
  | 'schedule'
  | 'holiday'
  | 'vacation'
  | 'absence'
  | 'recovery'
  | 'birthday'
  | 'non-working';

export interface RosterCell {
  type: RosterCellType;
  /** Texto visible: nombre del festivo, turno "16:00–20:00", "Vacaciones"… */
  label: string;
}

export interface RosterRow {
  id: string;
  /** Nombre completo del empleado / recurso */
  name: string;
  /**
   * Celdas indexadas por número de día (1 = día 1 del mes).
   * Solo hay que incluir los días con datos; el resto quedan vacíos.
   */
  cells: Partial<Record<number, RosterCell | null>>;
}

export interface LegendItem {
  type: Exclude<RosterCellType, 'schedule'>;
  label: string;
}

export interface CalendarRosterProps {
  /** Filas del cuadrante (empleados / recursos) */
  rows: RosterRow[];
  /** Mes visible (controlado) */
  month: Date;
  /** Callback al cambiar de mes — para navegación SPA */
  onMonthChange?: (month: Date) => void;
  /**
   * Genera el href para cada mes de navegación.
   * Si se pasa, los botones prev/next se renderizan como <a>.
   * Compatible con SSR y Next.js. Toma precedencia sobre onMonthChange.
   */
   
  hrefBuilder?: (month: Date) => string;
  /** Componente Link del router. Default: "a" */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent?: ComponentType<any>;
  /**
   * Render prop para personalizar el contenido interno de cada celda.
   * El componente sigue siendo responsable del <td> y sus clases (--weekend, --today, --holiday, --non-working).
   * Cuando se pasa, sustituye al renderizado por defecto de chips/schedule.
   */
  renderCell?: (day: number, date: Date, cell: RosterCell | null) => ReactNode;
  /** Etiqueta de la columna de nombre. Default: 'Empleado' */
  nameLabel?: string;
  /** Muestra la leyenda al final. Default: true */
  showLegend?: boolean;
  /**
   * Entradas de la leyenda, en orden. Default: las seis del sistema con sus etiquetas
   * en castellano. Es texto **visible**: una app multiidioma debe pasarlas traducidas.
   */
  legendItems?: LegendItem[];
  /**
   * aria-label de la leyenda. Default: "Leyenda" (castellano).
   * Una app multiidioma debe pasarla traducida.
   */
  legendLabel?: string;
  /**
   * aria-label del botón de mes anterior. Default: "Mes anterior" (castellano).
   * Una app multiidioma debe pasarla traducida.
   */
  previousMonthLabel?: string;
  /**
   * aria-label del botón de mes siguiente. Default: "Mes siguiente" (castellano).
   * Una app multiidioma debe pasarla traducida.
   */
  nextMonthLabel?: string;
  /** Locale para nombres de mes y día. Default: 'es-ES' */
  locale?: string;
  className?: string;
}

function isWeekend(date: Date): boolean {
  const d = date.getDay();
  return d === 0 || d === 6;
}

function getDaysInMonth(month: Date): Date[] {
  const year = month.getFullYear();
  const m = month.getMonth();
  const total = new Date(year, m + 1, 0).getDate();
  return Array.from({ length: total }, (_, i) => new Date(year, m, i + 1));
}

const CELL_TYPE_VARIANT: Record<Exclude<RosterCellType, 'schedule' | 'non-working'>, TagVariant> = {
  holiday:  'neutral',
  vacation: 'info',
  absence:  'danger',
  recovery: 'success',
  birthday: 'info',
};

const LEGEND_ITEMS: LegendItem[] = [
  { type: 'holiday',     label: 'Festivo' },
  { type: 'vacation',    label: 'Vacaciones' },
  { type: 'absence',     label: 'Ausencia' },
  { type: 'recovery',    label: 'Recuperación' },
  { type: 'birthday',    label: 'Cumpleaños' },
  { type: 'non-working', label: 'No laborable' },
];

export function CalendarRoster({
  rows,
  month,
  onMonthChange,
  hrefBuilder,
  linkComponent,
  renderCell,
  nameLabel = 'Empleado',
  showLegend = true,
  locale = 'es-ES',
  legendItems = LEGEND_ITEMS,
  legendLabel = 'Leyenda',
  previousMonthLabel = 'Mes anterior',
  nextMonthLabel = 'Mes siguiente',
  className,
}: CalendarRosterProps) {
  const today = new Date();
  const days = getDaysInMonth(month);

  const prevMonth = shiftMonth(month, -1);
  const nextMonth = shiftMonth(month, 1);

  const titleFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const title = titleFormatter.format(month);

  const dayLetterFormatter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
  const dayNameFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long' });

  // Con `hrefBuilder` los controles son enlaces de verdad; si además hay
  // `onMonthChange`, el handler corta la navegación y la resuelve el router.
  const navHandler = onMonthChange
    ? (target: Date) => (event: MouseEvent<HTMLElement>) => {
        if (hrefBuilder) event.preventDefault();
        onMonthChange(target);
      }
    : undefined;

  const titleId = `roster-title-${month.getFullYear()}-${month.getMonth()}`;

  return (
    <div className={['calendar-roster', className].filter(Boolean).join(' ')}>
      {/* Navegación */}
      <div className="calendar-roster__nav">
        <PrevNextNav
          label={title}
          labelId={titleId}
          prevHref={hrefBuilder?.(prevMonth)}
          nextHref={hrefBuilder?.(nextMonth)}
          prevOnClick={navHandler?.(prevMonth)}
          nextOnClick={navHandler?.(nextMonth)}
          prevLabel={previousMonthLabel}
          nextLabel={nextMonthLabel}
          linkComponent={linkComponent}
        />
      </div>

      {/* Tabla con scroll horizontal */}
      <div className="calendar-roster__wrap">
        <table className="calendar-roster__table" aria-labelledby={titleId}>
          <thead>
            <tr>
              <th className="calendar-roster__th-name" scope="col">
                {nameLabel}
              </th>
              {days.map((day) => {
                const isToday = isSameDay(day, today);
                const weekend = isWeekend(day);
                const thClass = [
                  'calendar-roster__th-day',
                  weekend && 'calendar-roster__th-day--weekend',
                  isToday && 'calendar-roster__th-day--today',
                ]
                  .filter(Boolean)
                  .join(' ');

                const dd = String(day.getDate()).padStart(2, '0');
                const letter = dayLetterFormatter.format(day);
                const dayName = dayNameFormatter.format(day);

                return (
                  <th key={day.getDate()} className={thClass} scope="col">
                    <div className="calendar-roster__th-day-number">{dd}</div>
                    <div className="calendar-roster__th-day-sub">
                      <abbr title={dayName}>{letter}</abbr>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="calendar-roster__td-name" title={row.name}>
                  {row.name}
                </td>
                {days.map((day) => {
                  const d = day.getDate();
                  const cell = row.cells[d] ?? null;
                  const weekend = isWeekend(day);
                  const isToday = isSameDay(day, today);
                  const isHolidayBg = cell?.type === 'holiday';
                  const isNonWorking = cell?.type === 'non-working';

                  const cellClass = [
                    'calendar-roster__cell',
                    weekend && 'calendar-roster__cell--weekend',
                    isHolidayBg && 'calendar-roster__cell--holiday',
                    isNonWorking && 'calendar-roster__cell--non-working',
                    isToday && 'calendar-roster__cell--today',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <td key={d} className={cellClass}>
                      {renderCell ? (
                        renderCell(d, day, cell)
                      ) : (
                        <>
                          {cell?.type === 'schedule' && (
                            <span className="calendar-roster__schedule">{cell.label}</span>
                          )}
                          {cell && cell.type !== 'schedule' && cell.type !== 'non-working' && (
                            <Tag variant={CELL_TYPE_VARIANT[cell.type]}>
                              {cell.type === 'birthday' ? `🎂 ${cell.label}` : cell.label}
                            </Tag>
                          )}
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leyenda */}
      {showLegend && (
        <div className="calendar-roster__legend" aria-label={legendLabel}>
          {legendItems.map(({ type, label }) => (
            <span key={type} className="calendar-roster__legend-item">
              {type === 'non-working' ? (
                <>
                  <span className="calendar-roster__legend-swatch calendar-roster__legend-swatch--non-working" />
                  {label}
                </>
              ) : (
                <Tag variant={CELL_TYPE_VARIANT[type]}>{label}</Tag>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
