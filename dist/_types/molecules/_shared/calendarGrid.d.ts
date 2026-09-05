import { type KeyboardEvent, type ReactNode } from 'react';
export interface CalendarDay {
    date: Date;
    /** El día pertenece al mes anterior o al siguiente: se muestra atenuado */
    outside: boolean;
}
export declare function isSameDay(a: Date, b: Date): boolean;
export declare function isSameMonth(a: Date, b: Date): boolean;
/** Primer día del mes desplazado `delta` meses respecto a `month`. */
export declare function shiftMonth(month: Date, delta: number): Date;
/**
 * Los días que ocupa la cuadrícula del mes, con lunes como primer día de la
 * semana. Solo se completan las semanas que el mes realmente ocupa.
 */
export declare function getCalendarDays(month: Date): CalendarDay[];
/** Agrupa días en semanas de 7. */
export declare function chunkWeeks(days: CalendarDay[]): CalendarDay[][];
/**
 * Nombres de los siete días de la semana empezando en lunes, en dos longitudes:
 * la abreviada que se ve y la larga que lee el lector de pantalla vía `abbr`.
 * La semana de referencia arranca el lunes 6 de enero de 2025.
 */
export declare function getWeekdayNames(locale: string, weekday?: 'narrow' | 'short'): {
    short: string;
    long: string;
}[];
export interface CalendarWeekdayRowOptions {
    /** Bloque BEM del calendario que la monta: `calendar`, `calendar-planner`… */
    block: string;
    /** Modificador extra de la fila, sin el bloque (`header` → `__row--header`) */
    rowModifier?: string;
    weekdays: {
        short: string;
        long: string;
    }[];
}
/**
 * Fila `role="row"` de cabeceras de día. El nombre abreviado se envuelve en
 * `<abbr>` con el nombre completo: la letra suelta no es un nombre accesible.
 */
export declare function renderCalendarWeekdayRow({ block, rowModifier, weekdays }: CalendarWeekdayRowOptions): import("react/jsx-runtime").JSX.Element;
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
export declare function renderCalendarMonthNav({ block, title, titleId, navigable, previousLabel, nextLabel, prevDisabled, nextDisabled, onPrev, onNext, chevronSize, onTitleClick, titleExpanded, titleRef, children, }: CalendarMonthNavOptions): import("react/jsx-runtime").JSX.Element;
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
export declare function useCalendarGridNavigation({ month, onMonthChange, selected, onActivate, minDate, maxDate, }: UseCalendarGridNavigationOptions): CalendarGridNavigation;
