import { useState, useCallback } from 'react';
import { Chevron } from '../../atoms/Chevron/Chevron';
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

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function getCalendarDays(month: Date): CalendarDay[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);

  // Lunes como primer día (0=dom→6, 1=lun→0, …)
  let startOffset = first.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  // Mínimo de celdas necesarias: solo las semanas que realmente ocupa el mes
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  const days: CalendarDay[] = [];

  // Días del mes anterior
  for (let i = startOffset; i > 0; i--) {
    const d = new Date(first);
    d.setDate(d.getDate() - i);
    days.push({ date: d, outside: true });
  }

  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: new Date(month.getFullYear(), month.getMonth(), i), outside: false });
  }

  // Días del mes siguiente para completar la última semana
  const remaining = totalCells - days.length;
  const lastDay = days[days.length - 1].date;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(lastDay);
    d.setDate(d.getDate() + i);
    days.push({ date: d, outside: true });
  }

  return days;
}

// Agrupa días en semanas de 7
function chunkWeeks(days: CalendarDay[]): CalendarDay[][] {
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
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

  const chevronSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';

  const titleFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const title = titleFormatter.format(currentMonth);

  // Nombres de días de semana (L M X J V S D) — empieza en lunes (6 ene 2025)
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2025, 0, 6 + i);
    return weekdayFormatter.format(d);
  });

  const weeks = chunkWeeks(getCalendarDays(currentMonth));

  const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  const prevDisabled = minDate ? !isSameMonth(prevMonth, minDate) && prevMonth < minDate : false;
  const nextDisabled = maxDate ? !isSameMonth(nextMonth, maxDate) && nextMonth > maxDate : false;

  const titleId = `calendar-title-${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const rootClass = ['calendar', `calendar--${size}`, className].filter(Boolean).join(' ');

  return (
    <div className={rootClass}>
      <div className="calendar__header">
        {navigable && (
          <button
            type="button"
            className="calendar__nav"
            aria-label="Mes anterior"
            disabled={prevDisabled}
            onClick={() => handleMonthChange(prevMonth)}
          >
            <Chevron size={chevronSize} className="calendar__chevron--prev" />
          </button>
        )}
        <h2 id={titleId} className="calendar__title" aria-live="polite">
          {title}
        </h2>
        {navigable && (
          <button
            type="button"
            className="calendar__nav"
            aria-label="Mes siguiente"
            disabled={nextDisabled}
            onClick={() => handleMonthChange(nextMonth)}
          >
            <Chevron size={chevronSize} />
          </button>
        )}
      </div>

      {/* role="grid" con estructura row > columnheader/gridcell para ARIA válido */}
      <div className="calendar__grid" role="grid" aria-labelledby={titleId}>
        <div role="row" className="calendar__row">
          {weekdays.map((wd) => (
            <div key={wd} role="columnheader" className="calendar__weekday" aria-label={wd}>
              {wd}
            </div>
          ))}
        </div>
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
                  type="button"
                  role="gridcell"
                  className={cls}
                  aria-selected={isSelected}
                  aria-disabled={disabled ? 'true' : undefined}
                  aria-current={isToday ? 'date' : undefined}
                  tabIndex={disabled ? -1 : 0}
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
