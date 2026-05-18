import { useState, useCallback, type ReactNode } from 'react';
import { Chevron } from '../../atoms/Chevron/Chevron';
import { Tag } from '../../atoms/Tag/Tag';
import { Modal } from '../Modal/Modal';
import './CalendarPlanner.css';

type TagVariant =
  | 'default' | 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2'
  | 'neutral' | 'info' | 'warning' | 'success' | 'danger';

export interface PlannerEvent {
  id: string;
  date: Date;
  label: string;
  variant?: TagVariant;
}

export interface CalendarPlannerProps {
  /** Eventos a mostrar en el planificador */
  events?: PlannerEvent[];
  /**
   * Render prop para personalizar el contenido de cada celda.
   * Si se pasa, sustituye al renderizado por defecto de tags.
   */
  renderDay?: (date: Date, events: PlannerEvent[]) => ReactNode;
  /** Número máximo de eventos visibles por celda antes de truncar. Default: 3 */
  maxItemsPerDay?: number;
  /** Callback al pulsar "+N más" en una celda */
  onMoreClick?: (date: Date, events: PlannerEvent[]) => void;
  /**
   * Callback al hacer click en cualquier celda de día (incluso días vacíos y externos).
   * Recibe la fecha de la celda y el array de eventos de ese día (vacío si no hay ninguno).
   * Compatible con renderDay: el click se dispara en el contenedor de la celda.
   */
  onDayClick?: (date: Date, events: PlannerEvent[]) => void;
  /** Mes visible (modo controlado) */
  month?: Date;
  /** Mes inicial en modo no controlado */
  defaultMonth?: Date;
  /** Callback al cambiar de mes */
  onMonthChange?: (month: Date) => void;
  /** Muestra los botones de navegación prev/next. Default: true */
  navigable?: boolean;
  /** Locale para nombres de mes y día. Default: 'es-ES' */
  locale?: string;
  /** Tamaño del componente. Default: 'md' */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface CalendarDay {
  date: Date;
  outside: boolean;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getCalendarDays(month: Date): CalendarDay[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);

  let startOffset = first.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  // Mínimo de celdas necesarias: solo las semanas que realmente ocupa el mes
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  const days: CalendarDay[] = [];

  for (let i = startOffset; i > 0; i--) {
    const d = new Date(first);
    d.setDate(d.getDate() - i);
    days.push({ date: d, outside: true });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: new Date(month.getFullYear(), month.getMonth(), i), outside: false });
  }

  const remaining = totalCells - days.length;
  const lastDay = days[days.length - 1].date;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(lastDay);
    d.setDate(d.getDate() + i);
    days.push({ date: d, outside: true });
  }

  return days;
}

function chunkWeeks(days: CalendarDay[]): CalendarDay[][] {
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function CalendarPlanner({
  events = [],
  renderDay,
  maxItemsPerDay = 3,
  onMoreClick,
  onDayClick,
  month: monthProp,
  defaultMonth,
  onMonthChange,
  navigable = true,
  locale = 'es-ES',
  size = 'md',
  className,
}: CalendarPlannerProps) {
  const [internalMonth, setInternalMonth] = useState<Date>(
    () => monthProp ?? defaultMonth ?? new Date()
  );
  const [modalDay, setModalDay] = useState<{ date: Date; events: PlannerEvent[] } | null>(null);

  const closeModal = useCallback(() => setModalDay(null), []);

  const currentMonth = monthProp ?? internalMonth;

  const handleMonthChange = useCallback(
    (next: Date) => {
      setInternalMonth(next);
      onMonthChange?.(next);
    },
    [onMonthChange]
  );

  const today = new Date();
  const chevronSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';

  const titleFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const title = titleFormatter.format(currentMonth);

  const modalTitleFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2025, 0, 6 + i);
    return weekdayFormatter.format(d);
  });

  const dayNumberFormatter = new Intl.DateTimeFormat(locale, { day: 'numeric' });

  const weeks = chunkWeeks(getCalendarDays(currentMonth));

  const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  const getEventsForDay = (date: Date) =>
    events.filter((e) => isSameDay(e.date, date));

  const titleId = `planner-title-${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const rootClass = ['calendar-planner', `calendar-planner--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass}>
      <div className="calendar-planner__header">
        {navigable && (
          <button
            type="button"
            className="calendar-planner__nav"
            aria-label="Mes anterior"
            onClick={() => handleMonthChange(prevMonth)}
          >
            <Chevron size={chevronSize} className="calendar-planner__chevron--prev" />
          </button>
        )}
        <h2 id={titleId} className="calendar-planner__title" aria-live="polite">
          {title}
        </h2>
        {navigable && (
          <button
            type="button"
            className="calendar-planner__nav"
            aria-label="Mes siguiente"
            onClick={() => handleMonthChange(nextMonth)}
          >
            <Chevron size={chevronSize} />
          </button>
        )}
      </div>

      <div className="calendar-planner__grid" role="grid" aria-labelledby={titleId}>
        {/* Cabeceras de día de semana */}
        <div role="row" className="calendar-planner__row calendar-planner__row--header">
          {weekdays.map((wd) => (
            <div key={wd} role="columnheader" className="calendar-planner__weekday">
              {wd}
            </div>
          ))}
        </div>

        {/* Semanas */}
        {weeks.map((week, wi) => (
          <div key={wi} role="row" className="calendar-planner__row">
            {week.map(({ date, outside }) => {
              const isToday = isSameDay(date, today);
              const dayEvents = getEventsForDay(date);
              const visible = dayEvents.slice(0, maxItemsPerDay);
              const overflow = dayEvents.length - visible.length;

              const cellClass = [
                'calendar-planner__cell',
                outside && 'calendar-planner__cell--outside',
                isToday && 'calendar-planner__cell--today',
              ]
                .filter(Boolean)
                .join(' ');

              const numberClass = [
                'calendar-planner__day-number',
                isToday && 'calendar-planner__day-number--today',
                outside && 'calendar-planner__day-number--outside',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={date.toISOString()}
                  role="gridcell"
                  className={[cellClass, onDayClick ? 'calendar-planner__cell--clickable' : ''].filter(Boolean).join(' ')}
                  aria-current={isToday ? 'date' : undefined}
                  onClick={onDayClick ? () => onDayClick(date, dayEvents) : undefined}
                >
                  <span className={numberClass} aria-label={dayNumberFormatter.format(date)}>
                    {date.getDate()}
                  </span>

                  <div className="calendar-planner__cell-body">
                    {renderDay ? (
                      renderDay(date, dayEvents)
                    ) : (
                      <>
                        {visible.map((event) => (
                          <Tag key={event.id} variant={event.variant ?? 'default'}>
                            {event.label}
                          </Tag>
                        ))}
                        {overflow > 0 && (
                          <button
                            type="button"
                            className="calendar-planner__more"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalDay({ date, events: dayEvents });
                              onMoreClick?.(date, dayEvents);
                            }}
                          >
                            +{overflow} más
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <Modal
        open={modalDay !== null}
        onClose={closeModal}
        title={modalDay ? modalTitleFormatter.format(modalDay.date) : undefined}
      >
        <div className="calendar-planner__modal-events">
          {modalDay?.events.map((event) => (
            <Tag key={event.id} variant={event.variant ?? 'default'}>
              {event.label}
            </Tag>
          ))}
        </div>
      </Modal>
    </div>
  );
}
