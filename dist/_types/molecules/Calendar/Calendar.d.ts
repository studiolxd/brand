import './Calendar.css';
/**
 * El cromo del calendario: las dos flechas —que cambian de nombre según la
 * vista— y el rótulo de la rejilla de años. Dicen lo mismo en toda la suite,
 * así que salen del catálogo y no de una prop por uso.
 *
 * **Lo que NO está aquí, y no es olvido:** los nombres de los meses, los de
 * los días de la semana, las cifras del año y el nombre accesible de cada
 * celda («lunes, 15 de enero de 2025»). Eso no es texto de interfaz sino
 * **formato de fecha**: sale de `locale` con `Intl`, que además es quien sabe
 * en qué día empieza la semana y con qué cifras se escribe el año. Traducirlo
 * por catálogo sería reescribir a mano lo que el navegador ya trae bien.
 *
 * Tampoco está `gridLabel`: nombra a ESTE calendario («Fecha de alta»), que
 * es contenido de la pantalla. Sin él la rejilla toma como nombre el título
 * del mes visible, que ya viene del locale.
 */
export interface CalendarMessages {
    /** Nombre accesible de la flecha de retroceso sobre la rejilla de días. */
    previousMonth: string;
    /** Nombre accesible de la flecha de avance sobre la rejilla de días. */
    nextMonth: string;
    /** Nombre accesible de la flecha de retroceso sobre la rejilla de años. */
    previousYears: string;
    /** Nombre accesible de la flecha de avance sobre la rejilla de años. */
    nextYears: string;
    /** Nombre accesible de la rejilla de años. */
    yearGrid: string;
}
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
     * aria-label del botón de mes anterior. **Sin default**: sin él, el texto
     * sale de `calendar.previousMonth` del `BrandMessagesProvider`.
     */
    previousMonthLabel?: string;
    /**
     * aria-label del botón de mes siguiente. **Sin default**: sin él, el texto
     * sale de `calendar.nextMonth` del `BrandMessagesProvider`.
     */
    nextMonthLabel?: string;
    /**
     * aria-label del botón de retroceso **en la vista de años**. **Sin
     * default**: sin él, sale de `calendar.previousYears` del
     * `BrandMessagesProvider`.
     */
    previousYearsLabel?: string;
    /**
     * aria-label del botón de avance en la vista de años. **Sin default**: sin
     * él, sale de `calendar.nextYears` del `BrandMessagesProvider`.
     */
    nextYearsLabel?: string;
    /**
     * aria-label de la rejilla de años. **Sin default**: sin él, sale de
     * `calendar.yearGrid` del `BrandMessagesProvider`.
     */
    yearGridLabel?: string;
    /**
     * aria-label de la rejilla de días. **No sale del catálogo**: nombra a ESTE
     * calendario («Fecha de alta»), que es contenido de la pantalla. Sin ella,
     * la rejilla toma como nombre el título del mes visible. Cuando el
     * calendario vive dentro de un panel con nombre propio (el `Popover` de
     * `DatePicker`), conviene pasarlo aquí.
     */
    gridLabel?: string;
    /** Tamaño del componente. Default: 'md' */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare function Calendar({ value, onChange, defaultMonth, month: monthProp, onMonthChange, navigable, disabledDates, minDate, maxDate, locale, previousMonthLabel, nextMonthLabel, previousYearsLabel, nextYearsLabel, yearGridLabel, gridLabel, size, className, }: CalendarProps): import("react/jsx-runtime").JSX.Element;
