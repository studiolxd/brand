import { useState, useCallback, useEffect, useId, useRef } from 'react';
import {
  chunkWeeks,
  getCalendarDays,
  getWeekdayNames,
  isSameDay,
  isSameMonth,
  renderCalendarMonthNav,
  renderCalendarWeekdayRow,
  shiftMonth,
  useCalendarGridNavigation,
} from '../_shared/calendarGrid';
import './Calendar.css';

/** Años por página de la rejilla: una docena, tres filas de cuatro. */
const YEARS_PER_PAGE = 12;
/** Columnas de esa rejilla; el CSS las repite desde su propio token. */
const YEAR_COLUMNS = 4;

export interface CalendarProps {
  /** Fecha seleccionada (modo controlado) */
  value?: Date | null;
  /** Callback al seleccionar una fecha */
  onChange?: (date: Date) => void;
  /** Mes inicial en modo no controlado */
  defaultMonth?: Date;
  /** Mes visible (modo controlado) */
  month?: Date;
  /** Callback al cambiar de mes */
  onMonthChange?: (month: Date) => void;
  /** Muestra los botones de navegación prev/next. Default: true */
  navigable?: boolean;
  /** Deshabilita fechas concretas o por función */
  disabledDates?: Date[] | ((date: Date) => boolean);
  /** Límite inferior seleccionable */
  minDate?: Date;
  /** Límite superior seleccionable */
  maxDate?: Date;
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
   * aria-label del botón de retroceso **en la vista de años**. Default: "Años
   * anteriores" (castellano). Una app multiidioma debe pasarla traducida.
   */
  previousYearsLabel?: string;
  /**
   * aria-label del botón de avance en la vista de años. Default: "Años
   * siguientes" (castellano).
   */
  nextYearsLabel?: string;
  /**
   * aria-label de la rejilla de años. Default: "Elegir año" (castellano).
   */
  yearGridLabel?: string;
  /**
   * aria-label de la rejilla de días. Sin ella, la rejilla toma como nombre el
   * título del mes visible. Cuando el calendario vive dentro de un panel con
   * nombre propio (el `Popover` de `DatePicker`), conviene pasarlo aquí.
   * Es texto visible para lectores: una app multiidioma debe pasarlo traducido.
   */
  gridLabel?: string;
  /** Tamaño del componente. Default: 'md' */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** Primer año de la docena a la que pertenece `year`: 2026 → 2016. */
function yearPageStart(year: number): number {
  return Math.floor(year / YEARS_PER_PAGE) * YEARS_PER_PAGE;
}

export function Calendar({
  value,
  onChange,
  defaultMonth,
  month: monthProp,
  onMonthChange,
  navigable = true,
  disabledDates,
  minDate,
  maxDate,
  locale = 'es-ES',
  previousMonthLabel = 'Mes anterior',
  nextMonthLabel = 'Mes siguiente',
  previousYearsLabel = 'Años anteriores',
  nextYearsLabel = 'Años siguientes',
  yearGridLabel = 'Elegir año',
  gridLabel,
  size = 'md',
  className,
}: CalendarProps) {
  const [internalMonth, setInternalMonth] = useState<Date>(
    () => monthProp ?? defaultMonth ?? (value instanceof Date ? value : new Date())
  );

  const currentMonth = monthProp ?? internalMonth;

  const handleMonthChange = useCallback(
    (next: Date) => {
      setInternalMonth(next);
      onMonthChange?.(next);
    },
    [onMonthChange]
  );

  const today = new Date();

  const isDisabled = useCallback(
    (date: Date): boolean => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      if (Array.isArray(disabledDates)) {
        return disabledDates.some((d) => isSameDay(d, date));
      }
      if (typeof disabledDates === 'function') {
        return disabledDates(date);
      }
      return false;
    },
    [disabledDates, minDate, maxDate]
  );

  const grid = useCalendarGridNavigation({
    month: currentMonth,
    onMonthChange: handleMonthChange,
    selected: value ?? null,
    minDate,
    maxDate,
  });

  /* ── Vista: los días del mes, o la docena de años ─────────────────────── */

  const [view, setView] = useState<'days' | 'years'>('days');
  const [yearPage, setYearPage] = useState(() => yearPageStart(currentMonth.getFullYear()));
  const [focusedYear, setFocusedYear] = useState(() => currentMonth.getFullYear());
  const titleRef = useRef<HTMLButtonElement | null>(null);
  const yearCells = useRef(new Map<number, HTMLButtonElement>());
  // Al cambiar de vista el foco tiene que ir a algún sitio: entrando, al año
  // vivo de la rejilla; volviendo, al título, que es desde donde se salió.
  const pendingFocus = useRef<'year' | 'title' | null>(null);

  const openYears = useCallback(() => {
    const year = currentMonth.getFullYear();
    setYearPage(yearPageStart(year));
    setFocusedYear(year);
    pendingFocus.current = 'year';
    setView('years');
  }, [currentMonth]);

  const closeYears = useCallback(() => {
    pendingFocus.current = 'title';
    setView('days');
  }, []);

  const selectYear = useCallback(
    (year: number) => {
      handleMonthChange(new Date(year, currentMonth.getMonth(), 1));
      closeYears();
    },
    [closeYears, currentMonth, handleMonthChange]
  );

  useEffect(() => {
    if (!pendingFocus.current) return;
    const target = pendingFocus.current;
    pendingFocus.current = null;
    if (target === 'title') titleRef.current?.focus();
    else yearCells.current.get(focusedYear)?.focus();
  }, [view, focusedYear]);

  const chevronSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';

  const titleFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const monthTitle = titleFormatter.format(currentMonth);

  // El tramo se escribe con `Intl` para que el año viaje en las cifras del
  // locale, igual que en la rejilla; el guion largo es el del rango.
  const yearFormatter = new Intl.DateTimeFormat(locale, { year: 'numeric' });
  const formatYear = (year: number) => yearFormatter.format(new Date(year, 0, 1));
  const years = Array.from({ length: YEARS_PER_PAGE }, (_, i) => yearPage + i);
  const yearsTitle = `${formatYear(yearPage)}–${formatYear(yearPage + YEARS_PER_PAGE - 1)}`;

  // El número suelto («14») no dice de qué día se habla: el nombre accesible de
  // cada celda lleva la fecha entera. Va por `locale` con `Intl`, no por prop de
  // texto, como el resto de fechas del sistema.
  const dayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const weekdays = getWeekdayNames(locale, 'narrow');
  const weeks = chunkWeeks(getCalendarDays(currentMonth));

  const prevMonth = shiftMonth(currentMonth, -1);
  const nextMonth = shiftMonth(currentMonth, 1);

  const prevDisabled = minDate ? !isSameMonth(prevMonth, minDate) && prevMonth < minDate : false;
  const nextDisabled = maxDate ? !isSameMonth(nextMonth, maxDate) && nextMonth > maxDate : false;

  const isYearDisabled = (year: number) =>
    (minDate ? year < minDate.getFullYear() : false) ||
    (maxDate ? year > maxDate.getFullYear() : false);

  const prevYearsDisabled = minDate ? yearPage - 1 < minDate.getFullYear() : false;
  const nextYearsDisabled = maxDate ? yearPage + YEARS_PER_PAGE > maxDate.getFullYear() : false;

  const showYears = view === 'years';
  // El tabindex vive siempre en un año de la página visible: si las flechas
  // movieron la docena, cae en el primero de la nueva.
  const activeYear =
    focusedYear >= yearPage && focusedYear <= yearPage + YEARS_PER_PAGE - 1 ? focusedYear : yearPage;

  const moveYearFocus = (year: number) => {
    if (year < yearPage || year > yearPage + YEARS_PER_PAGE - 1) {
      setYearPage(yearPageStart(year));
    }
    pendingFocus.current = 'year';
    setFocusedYear(year);
  };

  const onYearKeyDown = (event: React.KeyboardEvent) => {
    let target: number | null = null;
    switch (event.key) {
      case 'ArrowLeft':  target = activeYear - 1; break;
      case 'ArrowRight': target = activeYear + 1; break;
      case 'ArrowUp':    target = activeYear - YEAR_COLUMNS; break;
      case 'ArrowDown':  target = activeYear + YEAR_COLUMNS; break;
      case 'Home':       target = yearPage; break;
      case 'End':        target = yearPage + YEARS_PER_PAGE - 1; break;
      case 'PageUp':     target = activeYear - YEARS_PER_PAGE; break;
      case 'PageDown':   target = activeYear + YEARS_PER_PAGE; break;
      case 'Escape':
        event.preventDefault();
        closeYears();
        return;
      default:
        return;
    }
    event.preventDefault();
    moveYearFocus(target);
  };

  // Con `useId` por delante, dos calendarios del mismo mes en la misma página
  // —el caso normal de un rango «desde / hasta»— no comparten el id del título.
  const instanceId = useId();
  const titleId = showYears
    ? `${instanceId}-calendar-title-${yearPage}`
    : `${instanceId}-calendar-title-${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const rootClass = ['calendar', `calendar--${size}`, className].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      {renderCalendarMonthNav({
        block: 'calendar',
        title: showYears ? yearsTitle : monthTitle,
        titleId,
        navigable,
        previousLabel: showYears ? previousYearsLabel : previousMonthLabel,
        nextLabel: showYears ? nextYearsLabel : nextMonthLabel,
        prevDisabled: showYears ? prevYearsDisabled : prevDisabled,
        nextDisabled: showYears ? nextYearsDisabled : nextDisabled,
        onPrev: showYears
          ? () => setYearPage(yearPage - YEARS_PER_PAGE)
          : () => handleMonthChange(prevMonth),
        onNext: showYears
          ? () => setYearPage(yearPage + YEARS_PER_PAGE)
          : () => handleMonthChange(nextMonth),
        chevronSize,
        // El título lleva al año: es la forma de recorrer una década sin doce
        // clics en la flecha.
        onTitleClick: showYears ? closeYears : openYears,
        titleExpanded: showYears,
        titleRef,
      })}

      {showYears ? (
        /* Rejilla de años: la misma estructura ARIA que la de días, con una
           sola parada de tabulador y las flechas para recorrerla. */
        <div
          className="calendar__years"
          role="grid"
          aria-label={yearGridLabel}
          onKeyDown={onYearKeyDown}
        >
          {Array.from({ length: YEARS_PER_PAGE / YEAR_COLUMNS }, (_, row) => (
            <div key={row} role="row" className="calendar__row">
              {years.slice(row * YEAR_COLUMNS, row * YEAR_COLUMNS + YEAR_COLUMNS).map((year) => {
                const disabled = isYearDisabled(year);
                const isCurrent = year === today.getFullYear();
                const isSelected = value instanceof Date ? value.getFullYear() === year : false;

                const cls = [
                  'calendar__year',
                  isCurrent && 'calendar__year--current',
                  isSelected && 'calendar__year--selected',
                  disabled && 'calendar__year--disabled',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <button
                    key={year}
                    ref={(el) => {
                      if (el) yearCells.current.set(year, el);
                      else yearCells.current.delete(year);
                    }}
                    type="button"
                    role="gridcell"
                    className={cls}
                    aria-selected={isSelected}
                    aria-disabled={disabled ? 'true' : undefined}
                    aria-current={isCurrent ? 'date' : undefined}
                    tabIndex={year === activeYear ? 0 : -1}
                    onFocus={() => setFocusedYear(year)}
                    onClick={disabled ? undefined : () => selectYear(year)}
                  >
                    {formatYear(year)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        /* role="grid" con estructura row > columnheader/gridcell para ARIA válido.
           Una sola parada de tabulador: el resto se recorre con el teclado. */
        <div
          className="calendar__grid"
          role="grid"
          aria-label={gridLabel}
          aria-labelledby={gridLabel ? undefined : titleId}
          onKeyDown={grid.onKeyDown}
        >
          {renderCalendarWeekdayRow({ block: 'calendar', weekdays })}
          {weeks.map((week, wi) => (
            <div key={wi} role="row" className="calendar__row">
              {week.map(({ date, outside }) => {
                const disabled = isDisabled(date);
                const isToday = isSameDay(date, today);
                const isSelected = value instanceof Date ? isSameDay(date, value) : false;

                const cls = [
                  'calendar__day',
                  outside && 'calendar__day--outside',
                  isToday && 'calendar__day--today',
                  isSelected && 'calendar__day--selected',
                  disabled && 'calendar__day--disabled',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <button
                    key={date.toISOString()}
                    ref={grid.cellRef(date)}
                    type="button"
                    role="gridcell"
                    className={cls}
                    aria-label={dayFormatter.format(date)}
                    aria-selected={isSelected}
                    aria-disabled={disabled ? 'true' : undefined}
                    aria-current={isToday ? 'date' : undefined}
                    tabIndex={grid.isTabbable(date) ? 0 : -1}
                    onFocus={() => grid.onCellFocus(date)}
                    onClick={disabled ? undefined : () => onChange?.(date)}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
