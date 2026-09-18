import { useState, useCallback, useId, type ReactNode } from 'react';
import { Tag } from '../../atoms/Tag/Tag';
import { Toggle } from '../../atoms/Toggle/Toggle';
import { ToggleGroup } from '../../atoms/ToggleGroup/ToggleGroup';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import type { TagVariant } from '../../atoms/Tag/Tag';
import { Modal } from '../Modal/Modal';
import {
  chunkWeeks,
  getCalendarDays,
  getWeekDays,
  getWeekdayNames,
  isSameDay,
  isSameMonth,
  renderCalendarMonthNav,
  renderCalendarWeekdayRow,
  shiftMonth,
  shiftWeek,
  startOfWeek,
  useCalendarGridNavigation,
  useCalendarWeekNavigation,
} from '../_shared/calendarGrid';
import './CalendarPlanner.css';
import { useBrandMessages } from '../../messages/BrandMessagesContext';

/**
 * El único texto propio del planificador: el botón que abre los eventos que no
 * caben en una celda. Las **flechas de mes no están aquí** —son el mismo texto
 * que el del `Calendar` y salen de `calendar.previousMonth` / `.nextMonth`—, y
 * `gridLabel` tampoco: nombra a ESE planificador.
 */
export interface CalendarPlannerMessages {
  /** Rótulo del botón de desbordamiento: «+3 más». Interpola, así que es función. */
  more: (count: number) => string;
}

export interface PlannerEvent {
  id: string;
  date: Date;
  label: string;
  variant?: TagVariant;
  /**
   * El evento dura todo el día: la vista de semana lo pinta **sin hora**, el
   * primero de la columna. Sin ella se deriva de la propia fecha —un evento a
   * las 00:00 es de día entero—, que es lo que hace el mes desde siempre y lo
   * que permite que la misma lista de eventos sirva para las dos vistas.
   */
  allDay?: boolean;
}

/**
 * Las dos caras del planificador: el `month` de siempre —la parrilla del mes
 * entera— y `week`, siete columnas con el día completo, donde los eventos con
 * hora se leen en orden.
 */
export type CalendarPlannerView = 'month' | 'week';

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
  /**
   * aria-label de la rejilla de días. Sin ella, la rejilla toma como nombre el
   * título del mes visible. Es texto para lectores: una app multiidioma debe
   * pasarlo traducido.
   */
  gridLabel?: string;
  /**
   * Rótulo visible del botón que abre los eventos ocultos de una celda. **Sin
   * default**: sin él, sale de `calendarPlanner.more` del
   * `BrandMessagesProvider`. Solo se lee cuando alguna celda desborda.
   */
  moreLabel?: (count: number) => string;
  /**
   * Vista visible (modo controlado): la parrilla del mes o la semana.
   * Default: `'month'` — el planificador de siempre.
   */
  view?: CalendarPlannerView;
  /** Vista inicial en modo no controlado. Default: `'month'` */
  defaultView?: CalendarPlannerView;
  /** Callback al cambiar de vista, tanto desde el conmutador como al navegar. */
  onViewChange?: (view: CalendarPlannerView) => void;
  /**
   * Pinta el conmutador mes/semana en la cabecera. Default: `false` — un
   * planificador que ya está montado no gana botones por actualizar el
   * paquete; quien quiera las dos vistas lo pide.
   */
  viewSwitcher?: boolean;
  /**
   * Semana visible (modo controlado). Vale cualquier día de ella: el
   * componente se queda con su lunes.
   */
  week?: Date;
  /** Semana inicial en modo no controlado. Default: la del mes visible, o hoy. */
  defaultWeek?: Date;
  /** Callback al cambiar de semana. Recibe el **lunes** de la nueva. */
  onWeekChange?: (weekStart: Date) => void;
  /**
   * aria-label del botón de semana anterior. Default: `'Semana anterior'`
   * (castellano). No sale del catálogo como las flechas de mes: añadirle una
   * clave obligatoria a `CalendarPlannerMessages` rompería a todas las
   * aplicaciones que ya lo tienen montado, así que estos cuatro textos entran
   * como props y pasarán al catálogo en el próximo major.
   */
  previousWeekLabel?: string;
  /** aria-label del botón de semana siguiente. Default: `'Semana siguiente'`. */
  nextWeekLabel?: string;
  /** Rótulo del botón de vista de mes del conmutador. Default: `'Mes'`. */
  monthViewLabel?: string;
  /** Rótulo del botón de vista de semana del conmutador. Default: `'Semana'`. */
  weekViewLabel?: string;
  /** Nombre accesible del conmutador de vista. Default: `'Vista del calendario'`. */
  viewSwitcherLabel?: string;
  /** Tamaño del componente. Default: 'md' */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Los eventos con hora van después de los de día entero y en orden de reloj:
 * es como se lee una columna de día, de arriba abajo.
 */
function eventHasTime(event: PlannerEvent): boolean {
  if (event.allDay !== undefined) return !event.allDay;
  return event.date.getHours() !== 0 || event.date.getMinutes() !== 0;
}

function sortByTime(events: PlannerEvent[]): PlannerEvent[] {
  return [...events].sort((a, b) => {
    const porHora = Number(eventHasTime(a)) - Number(eventHasTime(b));
    if (porHora !== 0) return porHora;
    return a.date.getTime() - b.date.getTime();
  });
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
  view: viewProp,
  defaultView,
  onViewChange,
  viewSwitcher = false,
  week: weekProp,
  defaultWeek,
  onWeekChange,
  navigable = true,
  locale = 'es-ES',
  previousMonthLabel,
  nextMonthLabel,
  previousWeekLabel = 'Semana anterior',
  nextWeekLabel = 'Semana siguiente',
  monthViewLabel = 'Mes',
  weekViewLabel = 'Semana',
  viewSwitcherLabel = 'Vista del calendario',
  gridLabel,
  moreLabel,
  size = 'md',
  className,
}: CalendarPlannerProps) {
  const [internalMonth, setInternalMonth] = useState<Date>(
    () => monthProp ?? defaultMonth ?? new Date()
  );
  const [internalWeek, setInternalWeek] = useState<Date>(
    () => startOfWeek(weekProp ?? defaultWeek ?? monthProp ?? defaultMonth ?? new Date())
  );
  const [internalView, setInternalView] = useState<CalendarPlannerView>(
    () => viewProp ?? defaultView ?? 'month'
  );
  const [modalDay, setModalDay] = useState<{ date: Date; events: PlannerEvent[] } | null>(null);

  // El diálogo interno es el comportamiento por defecto solo mientras nadie se
  // ocupa del desbordamiento: con `onMoreClick` se abrirían dos cosas a la vez.
  const moreDialog = showMoreDialog ?? !onMoreClick;

  const closeModal = useCallback(() => setModalDay(null), []);

  const currentMonth = monthProp ?? internalMonth;
  const currentWeek = startOfWeek(weekProp ?? internalWeek);
  const view = viewProp ?? internalView;
  const isWeek = view === 'week';

  const handleMonthChange = useCallback(
    (next: Date) => {
      setInternalMonth(next);
      onMonthChange?.(next);
    },
    [onMonthChange]
  );

  const handleWeekChange = useCallback(
    (next: Date) => {
      const start = startOfWeek(next);
      setInternalWeek(start);
      onWeekChange?.(start);
    },
    [onWeekChange]
  );

  // Cambiar de vista no teletransporta al usuario: se cambia lo que haga falta
  // para que las dos vistas se toquen, y nada más. Al ir a la semana, si la que
  // había guardada no pisa el mes visible, se abre la del día 1; al volver al
  // mes, si el mes visible no pisa la semana, se abre el mes de su lunes. Una
  // semana a caballo de dos meses (23 de febrero – 1 de marzo) pisa los dos,
  // así que ir y volver deja al usuario donde estaba.
  const handleViewChange = useCallback(
    (next: CalendarPlannerView) => {
      const seTocan = getWeekDays(currentWeek).some(({ date }) => isSameMonth(date, currentMonth));
      if (!seTocan && next === 'week') {
        handleWeekChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));
      }
      if (!seTocan && next === 'month') {
        handleMonthChange(new Date(currentWeek.getFullYear(), currentWeek.getMonth(), 1));
      }
      setInternalView(next);
      onViewChange?.(next);
    },
    [currentMonth, currentWeek, handleMonthChange, handleWeekChange, onViewChange]
  );

  const t = useBrandMessages('calendar');
  const tp = useBrandMessages('calendarPlanner');
  const today = new Date();
  const chevronSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';

  const titleFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  // El tramo de la semana lo compone `Intl` entero («5–11 de enero de 2026», y
  // con el cambio de mes o de año delante de las dos fechas), que es lo que no
  // se puede concatenar a mano sin inventarse la puntuación de cada idioma.
  const rangeFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const weekEnd = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate() + 6);
  const weekTitle = rangeFormatter.formatRange(currentWeek, weekEnd);
  const title = isWeek ? weekTitle : titleFormatter.format(currentMonth);

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

  const timeFormatter = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' });

  const modalTitleFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const weekdays = getWeekdayNames(locale, 'short');

  const weeks = chunkWeeks(getCalendarDays(currentMonth));
  const weekDays = getWeekDays(currentWeek);

  const prevMonth = shiftMonth(currentMonth, -1);
  const nextMonth = shiftMonth(currentMonth, 1);

  const getEventsForDay = (date: Date) =>
    events.filter((e) => isSameDay(e.date, date));

  // Las dos rejillas tienen su teclado —el mes se mueve por filas de siete, la
  // semana por una sola—, y los dos ganchos se llaman siempre: el que manda es
  // el de la vista visible.
  const monthGrid = useCalendarGridNavigation({
    month: currentMonth,
    onMonthChange: handleMonthChange,
    onActivate: onDayClick ? (date) => onDayClick(date, getEventsForDay(date)) : undefined,
  });
  const weekGrid = useCalendarWeekNavigation({
    weekStart: currentWeek,
    onWeekChange: handleWeekChange,
    onActivate: onDayClick ? (date) => onDayClick(date, getEventsForDay(date)) : undefined,
  });
  const grid = isWeek ? weekGrid : monthGrid;

  // Ver `Calendar`: el `useId` evita el id duplicado con dos planificadores del
  // mismo mes en la misma página.
  const instanceId = useId();
  const titleId = isWeek
    ? `${instanceId}-planner-title-week-${currentWeek.getFullYear()}-${currentWeek.getMonth()}-${currentWeek.getDate()}`
    : `${instanceId}-planner-title-${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const rootClass = [
    'calendar-planner',
    `calendar-planner--${size}`,
    isWeek ? 'calendar-planner--week' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /** El contenido de una celda: los eventos del día, o lo que traiga `renderDay`. */
  const cellBody = (date: Date, dayEvents: PlannerEvent[]) => {
    if (renderDay) return renderDay(date, dayEvents);

    // La columna de la semana no trunca: tiene alto de sobra y el «+N más»
    // escondería justo lo que se viene a leer. El mes sí, que es donde la
    // celda mide una fila de siete.
    const ordered = isWeek ? sortByTime(dayEvents) : dayEvents;
    const visible = isWeek ? ordered : ordered.slice(0, maxItemsPerDay);
    const overflow = ordered.length - visible.length;

    return (
      <>
        {visible.map((event) =>
          isWeek ? (
            <div key={event.id} className="calendar-planner__event">
              {eventHasTime(event) && (
                <span className="calendar-planner__event-time">{timeFormatter.format(event.date)}</span>
              )}
              <Tag variant={event.variant ?? 'neutral'}>{event.label}</Tag>
            </div>
          ) : (
            <Tag key={event.id} variant={event.variant ?? 'neutral'}>
              {event.label}
            </Tag>
          )
        )}
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
            {tp('more', moreLabel)(overflow)}
          </button>
        )}
      </>
    );
  };

  /** Una celda de día, igual en las dos vistas salvo por dónde vive el número. */
  const dayCell = ({ date, outside }: { date: Date; outside: boolean }) => {
    const isToday = isSameDay(date, today);
    const dayEvents = getEventsForDay(date);

    const cellClass = [
      'calendar-planner__cell',
      isWeek ? 'calendar-planner__cell--week' : '',
      outside && 'calendar-planner__cell--outside',
      isToday && 'calendar-planner__cell--today',
      onDayClick ? 'calendar-planner__cell--clickable' : '',
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
        className={cellClass}
        aria-current={isToday ? 'date' : undefined}
        tabIndex={onDayClick ? (grid.isTabbable(date) ? 0 : -1) : undefined}
        onFocus={onDayClick ? () => grid.onCellFocus(date) : undefined}
        onClick={onDayClick ? () => onDayClick(date, dayEvents) : undefined}
      >
        {/* En la semana, el número del día vive en la cabecera de su columna:
            aquí la celda es solo el día. En el mes va dentro: la fecha larga
            para quien escucha, el dígito para quien mira — un `aria-label` en
            la celda taparía los eventos, y en el `span` sin rol se ignoraría. */}
        {!isWeek && (
          <span className={numberClass}>
            <VisuallyHidden>{dayFormatter.format(date)}</VisuallyHidden>
            <span aria-hidden="true">{date.getDate()}</span>
          </span>
        )}

        <div className="calendar-planner__cell-body">{cellBody(date, dayEvents)}</div>
      </div>
    );
  };

  return (
    <div className={rootClass}>
      {renderCalendarMonthNav({
        block: 'calendar-planner',
        title,
        titleId,
        navigable,
        // Los textos se leen **solo si hay flechas**: un planificador estático
        // (`navigable={false}`) no pinta ninguna y no los exige. Los del mes
        // salen del catálogo, que es donde ya viven los del `Calendar`.
        previousLabel: navigable ? (isWeek ? previousWeekLabel : t('previousMonth', previousMonthLabel)) : undefined,
        nextLabel: navigable ? (isWeek ? nextWeekLabel : t('nextMonth', nextMonthLabel)) : undefined,
        onPrev: () => (isWeek ? handleWeekChange(shiftWeek(currentWeek, -1)) : handleMonthChange(prevMonth)),
        onNext: () => (isWeek ? handleWeekChange(shiftWeek(currentWeek, 1)) : handleMonthChange(nextMonth)),
        chevronSize,
        children: viewSwitcher ? (
          <ToggleGroup
            className="calendar-planner__views"
            aria-label={viewSwitcherLabel}
            size={size}
            value={[view]}
            onValueChange={(valores) => {
              // La conmutación exclusiva de Base UI deja soltar el botón
              // pulsado: aquí siempre hay una vista, así que la lista vacía
              // (volver a pulsar la vista actual) no cambia nada.
              const siguiente = valores[0] as CalendarPlannerView | undefined;
              if (siguiente) handleViewChange(siguiente);
            }}
          >
            <Toggle value="month">{monthViewLabel}</Toggle>
            <Toggle value="week">{weekViewLabel}</Toggle>
          </ToggleGroup>
        ) : undefined,
      })}

      <div
        className={['calendar-planner__grid', isWeek ? 'calendar-planner__grid--week' : '']
          .filter(Boolean)
          .join(' ')}
        role="grid"
        aria-label={gridLabel}
        aria-labelledby={gridLabel ? undefined : titleId}
        onKeyDown={onDayClick ? grid.onKeyDown : undefined}
      >
        {isWeek ? (
          /* La cabecera de la semana nombra días concretos, no días de la
             semana en abstracto: el nombre y el número van juntos, y la fecha
             entera es el nombre accesible de la columna. */
          <div role="row" className="calendar-planner__row calendar-planner__row--header">
            {weekDays.map(({ date }, i) => {
              const isToday = isSameDay(date, today);
              return (
                <div
                  key={date.toISOString()}
                  role="columnheader"
                  className={[
                    'calendar-planner__weekday',
                    'calendar-planner__weekday--dated',
                    isToday && 'calendar-planner__weekday--today',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-label={dayFormatter.format(date)}
                  aria-current={isToday ? 'date' : undefined}
                >
                  <abbr aria-hidden="true" title={weekdays[i].long}>
                    {weekdays[i].short}
                  </abbr>
                  <span
                    aria-hidden="true"
                    className={[
                      'calendar-planner__day-number',
                      isToday && 'calendar-planner__day-number--today',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          renderCalendarWeekdayRow({
            block: 'calendar-planner',
            rowModifier: 'header',
            weekdays,
          })
        )}

        {isWeek ? (
          <div role="row" className="calendar-planner__row">
            {weekDays.map((day) => dayCell(day))}
          </div>
        ) : (
          weeks.map((week, wi) => (
            <div key={wi} role="row" className="calendar-planner__row">
              {week.map((day) => dayCell(day))}
            </div>
          ))
        )}
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
