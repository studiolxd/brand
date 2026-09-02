import { useState, useCallback, type ReactNode } from 'react';
import { Tag } from '../../atoms/Tag/Tag';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import type { TagVariant } from '../../atoms/Tag/Tag';
import { Modal } from '../Modal/Modal';
import {
  chunkWeeks,
  getCalendarDays,
  getWeekdayNames,
  isSameDay,
  renderCalendarMonthNav,
  renderCalendarWeekdayRow,
  shiftMonth,
  useCalendarGridNavigation,
} from '../_shared/calendarGrid';
import './CalendarPlanner.css';

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
   * Abre el diálogo interno con los eventos ocultos al pulsar "+N más".
   * Default: `true`, salvo que se pase `onMoreClick`, en cuyo caso el
   * consumidor lleva ya el desbordamiento y el diálogo propio se apaga.
   * Pásalo a `true` de forma explícita para tener las dos cosas.
   */
  showMoreDialog?: boolean;
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
  /**
   * aria-label de la rejilla de días. Sin ella, la rejilla toma como nombre el
   * título del mes visible. Es texto para lectores: una app multiidioma debe
   * pasarlo traducido.
   */
  gridLabel?: string;
  /**
   * Rótulo visible del botón que abre los eventos ocultos de una celda.
   * Default: `+N más` (castellano). Interpola el número, así que es una
   * función: una app multiidioma debe pasarla traducida.
   */
  moreLabel?: (count: number) => string;
  /** Tamaño del componente. Default: 'md' */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CalendarPlanner({
  events = [],
  renderDay,
  maxItemsPerDay = 3,
  onMoreClick,
  showMoreDialog,
  onDayClick,
  month: monthProp,
  defaultMonth,
  onMonthChange,
  navigable = true,
  locale = 'es-ES',
  previousMonthLabel = 'Mes anterior',
  nextMonthLabel = 'Mes siguiente',
  gridLabel,
  moreLabel = (count) => `+${count} más`,
  size = 'md',
  className,
}: CalendarPlannerProps) {
  const [internalMonth, setInternalMonth] = useState<Date>(
    () => monthProp ?? defaultMonth ?? new Date()
  );
  const [modalDay, setModalDay] = useState<{ date: Date; events: PlannerEvent[] } | null>(null);

  // El diálogo interno es el comportamiento por defecto solo mientras nadie se
  // ocupa del desbordamiento: con `onMoreClick` se abrirían dos cosas a la vez.
  const moreDialog = showMoreDialog ?? !onMoreClick;

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

  // El número suelto («14») no dice de qué día se habla. Como la celda contiene
  // los eventos, su nombre accesible no puede ser un `aria-label` —taparía lo de
  // dentro—: la fecha entera va oculta dentro del propio número. Por `locale`
  // con `Intl`, como el resto de fechas del sistema.
  const dayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const modalTitleFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const weekdays = getWeekdayNames(locale, 'short');

  const weeks = chunkWeeks(getCalendarDays(currentMonth));

  const prevMonth = shiftMonth(currentMonth, -1);
  const nextMonth = shiftMonth(currentMonth, 1);

  const getEventsForDay = (date: Date) =>
    events.filter((e) => isSameDay(e.date, date));

  const grid = useCalendarGridNavigation({
    month: currentMonth,
    onMonthChange: handleMonthChange,
    onActivate: onDayClick ? (date) => onDayClick(date, getEventsForDay(date)) : undefined,
  });

  const titleId = `planner-title-${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const rootClass = ['calendar-planner', `calendar-planner--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass}>
      {renderCalendarMonthNav({
        block: 'calendar-planner',
        title,
        titleId,
        navigable,
        previousMonthLabel,
        nextMonthLabel,
        onPrev: () => handleMonthChange(prevMonth),
        onNext: () => handleMonthChange(nextMonth),
        chevronSize,
      })}

      <div
        className="calendar-planner__grid"
        role="grid"
        aria-label={gridLabel}
        aria-labelledby={gridLabel ? undefined : titleId}
        onKeyDown={onDayClick ? grid.onKeyDown : undefined}
      >
        {renderCalendarWeekdayRow({
          block: 'calendar-planner',
          rowModifier: 'header',
          weekdays,
        })}

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
                  ref={onDayClick ? grid.cellRef(date) : undefined}
                  role="gridcell"
                  className={[cellClass, onDayClick ? 'calendar-planner__cell--clickable' : ''].filter(Boolean).join(' ')}
                  aria-current={isToday ? 'date' : undefined}
                  tabIndex={onDayClick ? (grid.isTabbable(date) ? 0 : -1) : undefined}
                  onFocus={onDayClick ? () => grid.onCellFocus(date) : undefined}
                  onClick={onDayClick ? () => onDayClick(date, dayEvents) : undefined}
                >
                  {/* La fecha larga para quien escucha, el dígito para quien
                      mira: un `aria-label` en la celda taparía los eventos, y
                      en el `span` sin rol se ignoraría. */}
                  <span className={numberClass}>
                    <VisuallyHidden>{dayFormatter.format(date)}</VisuallyHidden>
                    <span aria-hidden="true">{date.getDate()}</span>
                  </span>

                  <div className="calendar-planner__cell-body">
                    {renderDay ? (
                      renderDay(date, dayEvents)
                    ) : (
                      <>
                        {visible.map((event) => (
                          <Tag key={event.id} variant={event.variant ?? 'neutral'}>
                            {event.label}
                          </Tag>
                        ))}
                        {overflow > 0 && (
                          <button
                            type="button"
                            className="calendar-planner__more"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (moreDialog) setModalDay({ date, events: dayEvents });
                              onMoreClick?.(date, dayEvents);
                            }}
                          >
                            {moreLabel(overflow)}
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
            <Tag key={event.id} variant={event.variant ?? 'neutral'}>
              {event.label}
            </Tag>
          ))}
        </div>
      </Modal>
    </div>
  );
}
