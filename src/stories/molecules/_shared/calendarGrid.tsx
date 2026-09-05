import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';

/* ─────────────────────────────────────────────────────────────────────────────
 * Rejilla de mes compartida por todos los calendarios del sistema (Calendar,
 * CalendarPlanner…). Aquí vive el dato —qué días entran en la cuadrícula, cómo
 * se agrupan en semanas, cómo se nombran— y la conducta de teclado; cada
 * calendario pone sus clases BEM y sus tokens.
 * ───────────────────────────────────────────────────────────────────────────── */

export interface CalendarDay {
  date: Date;
  /** El día pertenece al mes anterior o al siguiente: se muestra atenuado */
  outside: boolean;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Primer día del mes desplazado `delta` meses respecto a `month`. */
export function shiftMonth(month: Date, delta: number): Date {
  return new Date(month.getFullYear(), month.getMonth() + delta, 1);
}

/**
 * Los días que ocupa la cuadrícula del mes, con lunes como primer día de la
 * semana. Solo se completan las semanas que el mes realmente ocupa.
 */
export function getCalendarDays(month: Date): CalendarDay[] {
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

/** Agrupa días en semanas de 7. */
export function chunkWeeks(days: CalendarDay[]): CalendarDay[][] {
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

/**
 * Nombres de los siete días de la semana empezando en lunes, en dos longitudes:
 * la abreviada que se ve y la larga que lee el lector de pantalla vía `abbr`.
 * La semana de referencia arranca el lunes 6 de enero de 2025.
 */
export function getWeekdayNames(
  locale: string,
  weekday: 'narrow' | 'short' = 'narrow'
): { short: string; long: string }[] {
  const shortFormatter = new Intl.DateTimeFormat(locale, { weekday });
  const longFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long' });
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2025, 0, 6 + i);
    return { short: shortFormatter.format(d), long: longFormatter.format(d) };
  });
}

/* ── Cabecera de días de la semana ───────────────────────────────────────── */

export interface CalendarWeekdayRowOptions {
  /** Bloque BEM del calendario que la monta: `calendar`, `calendar-planner`… */
  block: string;
  /** Modificador extra de la fila, sin el bloque (`header` → `__row--header`) */
  rowModifier?: string;
  weekdays: { short: string; long: string }[];
}

/**
 * Fila `role="row"` de cabeceras de día. El nombre abreviado se envuelve en
 * `<abbr>` con el nombre completo: la letra suelta no es un nombre accesible.
 */
export function renderCalendarWeekdayRow({ block, rowModifier, weekdays }: CalendarWeekdayRowOptions) {
  const rowClass = [`${block}__row`, rowModifier && `${block}__row--${rowModifier}`]
    .filter(Boolean)
    .join(' ');

  return (
    <div role="row" className={rowClass}>
      {weekdays.map(({ short, long }) => (
        <div key={long} role="columnheader" className={`${block}__weekday`} aria-label={long}>
          <abbr title={long}>{short}</abbr>
        </div>
      ))}
    </div>
  );
}

/* ── Navegación de mes ───────────────────────────────────────────────────── */

export interface CalendarMonthNavOptions {
  /** Bloque BEM del calendario que la monta */
  block: string;
  /** Título de lo que se ve, ya formateado: el mes, o el tramo de años */
  title: string;
  /** id del título, para `aria-labelledby` de la rejilla */
  titleId: string;
  /** Muestra los botones prev/next. Default: true */
  navigable?: boolean;
  /**
   * Nombre accesible del botón de retroceso. Depende de la vista: «Mes
   * anterior» sobre la rejilla de días, «Años anteriores» sobre la de años.
   */
  previousLabel: string;
  /** Nombre accesible del botón de avance, también según la vista. */
  nextLabel: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
  chevronSize: 'xs' | 'sm' | 'md';
  /**
   * Convierte el título en un botón: es la puerta a otra vista (la rejilla de
   * años). Sin él, el título es texto y no se pulsa.
   */
  onTitleClick?: () => void;
  /** `aria-expanded` del título cuando es botón: si la otra vista está abierta. */
  titleExpanded?: boolean;
  /** ref del botón del título, para poder devolverle el foco al cambiar de vista. */
  titleRef?: React.Ref<HTMLButtonElement>;
  /** Contenido extra a la derecha del título (acciones propias del calendario) */
  children?: ReactNode;
}

/**
 * Cabecera con los dos botones de navegación y el nombre de lo que se ve. El
 * título es una región `aria-live="polite"`: al cambiar el lector lo anuncia
 * sin mover el foco.
 */
export function renderCalendarMonthNav({
  block,
  title,
  titleId,
  navigable = true,
  previousLabel,
  nextLabel,
  prevDisabled = false,
  nextDisabled = false,
  onPrev,
  onNext,
  chevronSize,
  onTitleClick,
  titleExpanded,
  titleRef,
  children,
}: CalendarMonthNavOptions) {
  return (
    <div className={`${block}__header`}>
      {navigable && (
        <button
          type="button"
          className={`${block}__nav`}
          aria-label={previousLabel}
          disabled={prevDisabled}
          onClick={onPrev}
        >
          <Icon name="chevron" size={chevronSize} className={`${block}__chevron--prev`} />
        </button>
      )}
      {/* El título es el nombre de la rejilla y una región `polite`: al cambiar
          de mes —o de tramo de años— el lector lo anuncia sin mover el foco.
          Cuando lleva a otra vista, el texto va dentro de un botón: la región
          sigue siendo el `<h2>`, que no se sustituye entero. */}
      <h2 id={titleId} className={`${block}__title`} aria-live="polite">
        {onTitleClick ? (
          <button
            type="button"
            ref={titleRef}
            className={`${block}__title-button`}
            aria-expanded={titleExpanded}
            onClick={onTitleClick}
          >
            {title}
          </button>
        ) : (
          title
        )}
      </h2>
      {navigable && (
        <button
          type="button"
          className={`${block}__nav`}
          aria-label={nextLabel}
          disabled={nextDisabled}
          onClick={onNext}
        >
          <Icon name="chevron" size={chevronSize} />
        </button>
      )}
      {children}
    </div>
  );
}

/* ── Teclado de la rejilla (roving tabindex) ─────────────────────────────── */

function clamp(date: Date, minDate?: Date, maxDate?: Date): Date {
  if (minDate && date < minDate) return minDate;
  if (maxDate && date > maxDate) return maxDate;
  return date;
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Mismo día del mes desplazado `delta` meses, recortado al último día si no existe. */
function addMonths(date: Date, delta: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + delta, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDay));
}

function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export interface UseCalendarGridNavigationOptions {
  /** Mes visible */
  month: Date;
  /** Se llama cuando el teclado saca el foco fuera del mes visible */
  onMonthChange: (month: Date) => void;
  /** Fecha seleccionada, si la hay: es la primera candidata a llevar el tabindex */
  selected?: Date | null;
  /**
   * Activación de la celda enfocada con Enter/Espacio. Solo para rejillas cuya
   * celda no es un `<button>` (que ya lo resuelve el navegador).
   */
  onActivate?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export interface CalendarGridNavigation {
  /** Día que lleva el tabindex; siempre dentro del mes visible */
  activeDate: Date;
  /** `true` si esa celda debe ser la única tabulable */
  isTabbable: (date: Date) => boolean;
  /** ref de celda, para poder devolverle el foco tras moverse */
  cellRef: (date: Date) => (el: HTMLElement | null) => void;
  /** Handler de teclado del contenedor `role="grid"` */
  onKeyDown: (event: KeyboardEvent) => void;
  /** Sincroniza el tabindex cuando el foco entra por ratón o por tabulador */
  onCellFocus: (date: Date) => void;
}

/**
 * Roving tabindex y navegación con flechas de una rejilla de mes, según el
 * patrón de rejilla de WAI-ARIA: una sola parada de tabulador, flechas para
 * moverse de día, Inicio/Fin dentro de la semana, RePág/AvPág de mes y con
 * Mayús de año.
 */
export function useCalendarGridNavigation({
  month,
  onMonthChange,
  selected,
  onActivate,
  minDate,
  maxDate,
}: UseCalendarGridNavigationOptions): CalendarGridNavigation {
  const [focusedDate, setFocusedDate] = useState<Date>(() => selected ?? new Date());
  const cells = useRef(new Map<string, HTMLElement>());
  const pendingFocus = useRef(false);

  // El tabindex vive siempre en un día del mes visible: si el foco lógico se
  // quedó en otro mes, cae en la selección, en hoy o en el día 1.
  const activeDate = useMemo(() => {
    if (isSameMonth(focusedDate, month)) return focusedDate;
    if (selected && isSameMonth(selected, month)) return selected;
    const today = new Date();
    if (isSameMonth(today, month)) return today;
    return new Date(month.getFullYear(), month.getMonth(), 1);
  }, [focusedDate, month, selected]);

  useEffect(() => {
    if (!pendingFocus.current) return;
    pendingFocus.current = false;
    cells.current.get(dayKey(activeDate))?.focus();
  }, [activeDate]);

  const moveTo = useCallback(
    (target: Date) => {
      const next = clamp(target, minDate, maxDate);
      pendingFocus.current = true;
      setFocusedDate(next);
      if (!isSameMonth(next, month)) {
        onMonthChange(new Date(next.getFullYear(), next.getMonth(), 1));
      }
    },
    [maxDate, minDate, month, onMonthChange]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const from = activeDate;
      let target: Date | null = null;

      switch (event.key) {
        case 'ArrowLeft':
          target = addDays(from, -1);
          break;
        case 'ArrowRight':
          target = addDays(from, 1);
          break;
        case 'ArrowUp':
          target = addDays(from, -7);
          break;
        case 'ArrowDown':
          target = addDays(from, 7);
          break;
        case 'Home': {
          // Lunes de la semana del día activo
          const offset = (from.getDay() + 6) % 7;
          target = addDays(from, -offset);
          break;
        }
        case 'End': {
          const offset = 6 - ((from.getDay() + 6) % 7);
          target = addDays(from, offset);
          break;
        }
        case 'PageUp':
          target = addMonths(from, event.shiftKey ? -12 : -1);
          break;
        case 'PageDown':
          target = addMonths(from, event.shiftKey ? 12 : 1);
          break;
        case 'Enter':
        case ' ':
          if (onActivate) {
            event.preventDefault();
            onActivate(from);
          }
          return;
        default:
          return;
      }

      event.preventDefault();
      moveTo(target);
    },
    [activeDate, moveTo, onActivate]
  );

  const cellRef = useCallback(
    (date: Date) => (el: HTMLElement | null) => {
      const key = dayKey(date);
      if (el) cells.current.set(key, el);
      else cells.current.delete(key);
    },
    []
  );

  const isTabbable = useCallback((date: Date) => isSameDay(date, activeDate), [activeDate]);

  const onCellFocus = useCallback((date: Date) => setFocusedDate(date), []);

  return { activeDate, isTabbable, cellRef, onKeyDown, onCellFocus };
}
