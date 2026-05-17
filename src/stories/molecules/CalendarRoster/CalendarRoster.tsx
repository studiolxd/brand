import type { ComponentType } from 'react';
import { Chevron } from '../../atoms/Chevron/Chevron';
import './CalendarRoster.css';

export type RosterCellType =
  | 'schedule'
  | 'holiday'
  | 'vacation'
  | 'absence'
  | 'recovery'
  | 'birthday';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hrefBuilder?: (month: Date) => string;
  /** Componente Link del router. Default: "a" */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent?: ComponentType<any>;
  /** Etiqueta de la columna de nombre. Default: 'Empleado' */
  nameLabel?: string;
  /** Muestra la leyenda al final. Default: true */
  showLegend?: boolean;
  /** Locale para nombres de mes y día. Default: 'es-ES' */
  locale?: string;
  className?: string;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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

const LEGEND_ITEMS: { type: Exclude<RosterCellType, 'schedule'>; label: string }[] = [
  { type: 'holiday',  label: 'Festivo' },
  { type: 'vacation', label: 'Vacaciones' },
  { type: 'absence',  label: 'Ausencia' },
  { type: 'recovery', label: 'Recuperación' },
  { type: 'birthday', label: 'Cumpleaños' },
];

export function CalendarRoster({
  rows,
  month,
  onMonthChange,
  hrefBuilder,
  linkComponent,
  nameLabel = 'Empleado',
  showLegend = true,
  locale = 'es-ES',
  className,
}: CalendarRosterProps) {
  const A = linkComponent ?? 'a';
  const today = new Date();
  const days = getDaysInMonth(month);

  const prevMonth = new Date(month.getFullYear(), month.getMonth() - 1, 1);
  const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);

  const titleFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const title = titleFormatter.format(month);

  const dayLetterFormatter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });

  function renderNav(target: Date, direction: 'prev' | 'next') {
    const label = direction === 'prev' ? 'Mes anterior' : 'Mes siguiente';
    const chevronClass = direction === 'prev' ? 'calendar-roster__chevron--prev' : undefined;

    if (hrefBuilder) {
      return (
        <A
          href={hrefBuilder(target)}
          className="calendar-roster__nav-btn"
          aria-label={label}
          onClick={onMonthChange ? (e: React.MouseEvent) => { e.preventDefault(); onMonthChange(target); } : undefined}
        >
          <Chevron size="sm" className={chevronClass} />
        </A>
      );
    }

    return (
      <button
        type="button"
        className="calendar-roster__nav-btn"
        aria-label={label}
        onClick={() => onMonthChange?.(target)}
      >
        <Chevron size="sm" className={chevronClass} />
      </button>
    );
  }

  const titleId = `roster-title-${month.getFullYear()}-${month.getMonth()}`;

  return (
    <div className={['calendar-roster', className].filter(Boolean).join(' ')}>
      {/* Navegación */}
      <div className="calendar-roster__nav">
        {renderNav(prevMonth, 'prev')}
        <strong id={titleId} className="calendar-roster__title">
          {title}
        </strong>
        {renderNav(nextMonth, 'next')}
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

                return (
                  <th key={day.getDate()} className={thClass} scope="col">
                    <div className="calendar-roster__th-day-number">{dd}</div>
                    <div className="calendar-roster__th-day-sub">{letter}</div>
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

                  const cellClass = [
                    'calendar-roster__cell',
                    weekend && 'calendar-roster__cell--weekend',
                    isHolidayBg && 'calendar-roster__cell--holiday',
                    isToday && 'calendar-roster__cell--today',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <td key={d} className={cellClass}>
                      {cell?.type === 'schedule' && (
                        <span className="calendar-roster__schedule">{cell.label}</span>
                      )}
                      {cell && cell.type !== 'schedule' && (
                        <span
                          className={`calendar-roster__chip calendar-roster__chip--${cell.type}`}
                          title={cell.label}
                        >
                          {cell.type === 'birthday' ? `🎂 ${cell.label}` : cell.label}
                        </span>
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
        <div className="calendar-roster__legend" aria-label="Leyenda">
          {LEGEND_ITEMS.map(({ type, label }) => (
            <span key={type} className="calendar-roster__legend-item">
              <span className={`calendar-roster__legend-swatch calendar-roster__legend-swatch--${type}`} />
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
