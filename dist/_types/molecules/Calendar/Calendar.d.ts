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
export declare function Calendar({ value, onChange, defaultMonth, month: monthProp, onMonthChange, navigable, disabledDates, minDate, maxDate, locale, previousMonthLabel, nextMonthLabel, previousYearsLabel, nextYearsLabel, yearGridLabel, gridLabel, size, className, }: CalendarProps): import("react/jsx-runtime").JSX.Element;
