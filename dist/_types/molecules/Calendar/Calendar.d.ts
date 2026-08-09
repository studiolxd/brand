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
export declare function Calendar({ value, onChange, defaultMonth, month: monthProp, onMonthChange, navigable, disabledDates, minDate, maxDate, locale, size, className, }: CalendarProps): import("react/jsx-runtime").JSX.Element;
