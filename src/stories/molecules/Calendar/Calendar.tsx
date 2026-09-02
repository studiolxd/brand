import { useState, useCallback, useId } from 'react';
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

  const chevronSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';

  const titleFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const title = titleFormatter.format(currentMonth);

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

  // Con `useId` por delante, dos calendarios del mismo mes en la misma página
  // —el caso normal de un rango «desde / hasta»— no comparten el id del título.
  const instanceId = useId();
  const titleId = `${instanceId}-calendar-title-${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const rootClass = ['calendar', `calendar--${size}`, className].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      {renderCalendarMonthNav({
        block: 'calendar',
        title,
        titleId,
        navigable,
        previousMonthLabel,
        nextMonthLabel,
        prevDisabled,
        nextDisabled,
        onPrev: () => handleMonthChange(prevMonth),
        onNext: () => handleMonthChange(nextMonth),
        chevronSize,
      })}

      {/* role="grid" con estructura row > columnheader/gridcell para ARIA válido.
          Una sola parada de tabulador: el resto se recorre con el teclado. */}
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
    </div>
  );
}
