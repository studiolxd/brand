import type { ComponentType, MouseEvent, ReactNode } from 'react';
import { Tag } from '../../atoms/Tag/Tag';
import type { TagVariant } from '../../atoms/Tag/Tag';
import { PrevNextNav } from '../PrevNextNav/PrevNextNav';
import { isSameDay, shiftMonth } from '../_shared/calendarGrid';
import './CalendarRoster.css';
import { useBrandMessages } from '../../messages/BrandMessagesContext';

/**
 * El cromo del cuadrante: el encabezado de la columna de nombres y la leyenda
 * con sus seis tipos. Las **flechas de mes no están aquí**: son el mismo texto
 * que el del `Calendar` y salen de `calendar.previousMonth` / `.nextMonth`.
 *
 * Los seis tipos van clave a clave, no como lista: una lista en el catálogo
 * obligaría a la aplicación a montar el array entero con sus `type` correctos
 * solo para traducir seis palabras. `legendItems` sigue existiendo para
 * sustituir la leyenda **entera** —otro orden, otros tipos—, y gana.
 */
export interface CalendarRosterMessages {
  /** Encabezado de la columna de nombres (empleado, recurso, aula…). */
  name: string;
  /** Nombre accesible de la leyenda. */
  legend: string;
  /** Un día festivo. */
  holiday: string;
  /** Vacaciones. */
  vacation: string;
  /** Una ausencia. */
  absence: string;
  /** Una recuperación de horas. */
  recovery: string;
  /** Un cumpleaños. */
  birthday: string;
  /** Un día no laborable. */
  nonWorking: string;
}

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
  /**
   * Etiqueta de la columna de nombre. **Sin default**: sin ella, sale de
   * `calendarRoster.name` del `BrandMessagesProvider`.
   */
  nameLabel?: string;
  /**
   * Lo que precede a la etiqueta de un cumpleaños. Default: `'🎂 '`
   * (castellano/universal). Es contenido **visible** y se lee en voz alta:
   * pásalo vacío para quitarlo, u otro texto para sustituirlo.
   */
  birthdayPrefix?: string;
  /** Muestra la leyenda al final. Default: true */
  showLegend?: boolean;
  /**
   * Entradas de la leyenda, en orden. **Sin default**: sin ella, la leyenda se
   * arma con los seis tipos del sistema y sus textos de
   * `calendarRoster.*`. Se pasa entera para cambiar el orden o quitar tipos,
   * no para traducir.
   */
  legendItems?: LegendItem[];
  /**
   * aria-label de la leyenda. **Sin default**: sin ella, sale de
   * `calendarRoster.legend`. Solo se lee con `showLegend`.
   */
  legendLabel?: string;
  /**
   * aria-label del botón de mes anterior. **Sin default**: sin él, sale de
   * `calendar.previousMonth` del `BrandMessagesProvider` — es el mismo texto
   * que el del `Calendar`, así que es el mismo espacio.
   */
  previousMonthLabel?: string;
  /**
   * aria-label del botón de mes siguiente. **Sin default**: sin él, sale de
   * `calendar.nextMonth` del `BrandMessagesProvider`.
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

/**
 * Los seis tipos de la leyenda y la clave del catálogo que los nombra, en el
 * orden en que se pintan. El texto no está aquí: lo pone `calendarRoster.*`.
 */
const LEGEND_TYPES: { type: LegendItem['type']; key: 'holiday' | 'vacation' | 'absence' | 'recovery' | 'birthday' | 'nonWorking' }[] = [
  { type: 'holiday',     key: 'holiday' },
  { type: 'vacation',    key: 'vacation' },
  { type: 'absence',     key: 'absence' },
  { type: 'recovery',    key: 'recovery' },
  { type: 'birthday',    key: 'birthday' },
  { type: 'non-working', key: 'nonWorking' },
];

export function CalendarRoster({
  rows,
  month,
  onMonthChange,
  hrefBuilder,
  linkComponent,
  renderCell,
  nameLabel,
  birthdayPrefix = '🎂 ',
  showLegend = true,
  locale = 'es-ES',
  legendItems,
  legendLabel,
  previousMonthLabel,
  nextMonthLabel,
  className,
}: CalendarRosterProps) {
  const t = useBrandMessages('calendar');
  const tr = useBrandMessages('calendarRoster');
  // La leyenda se arma DONDE se pinta: sin `showLegend` no se exige ninguna
  // de las seis claves.
  const leyenda = legendItems ?? (showLegend ? LEGEND_TYPES.map(({ type, key }) => ({ type, label: tr(key) })) : []);
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
          prevLabel={t('previousMonth', previousMonthLabel)}
          nextLabel={t('nextMonth', nextMonthLabel)}
          linkComponent={linkComponent}
        />
      </div>

      {/* Tabla con scroll horizontal */}
      <div className="calendar-roster__wrap">
        <table className="calendar-roster__table" aria-labelledby={titleId}>
          <thead>
            <tr>
              <th className="calendar-roster__th-name" scope="col">
                {tr('name', nameLabel)}
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
                {/* Cabecera de fila: en una tabla de 31 columnas es lo que
                    ata cada turno a su persona al leerla con lector. */}
                <th scope="row" className="calendar-roster__th-name-row" title={row.name}>
                  {row.name}
                </th>
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
                              {cell.type === 'birthday' ? `${birthdayPrefix}${cell.label}` : cell.label}
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
        <div className="calendar-roster__legend" role="group" aria-label={tr('legend', legendLabel)}>
          {leyenda.map(({ type, label }) => (
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
