import type { ComponentType, ReactNode } from 'react';
import './CalendarRoster.css';
/**
 * El cromo del cuadrante: el encabezado de la columna de nombres y la leyenda
 * con sus seis tipos. Las **flechas de mes no están aquí**: son el mismo texto
 * que el del `Calendar` y salen de `calendar.previousMonth` / `.nextMonth`.
 *
 * Los seis tipos van clave a clave, no como lista: una lista en el catálogo
 * obligaría a la aplicación a montar el array entero con sus `type` correctos
 * solo para traducir seis palabras. `legendItems` sigue existiendo para
 * sustituir la leyenda **entera** —otro orden, otros tipos—, y gana.
 */
export interface CalendarRosterMessages {
    /** Encabezado de la columna de nombres (empleado, recurso, aula…). */
    name: string;
    /** Nombre accesible de la leyenda. */
    legend: string;
    /** Un día festivo. */
    holiday: string;
    /** Vacaciones. */
    vacation: string;
    /** Una ausencia. */
    absence: string;
    /** Una recuperación de horas. */
    recovery: string;
    /** Un cumpleaños. */
    birthday: string;
    /** Un día no laborable. */
    nonWorking: string;
}
export type RosterCellType = 'schedule' | 'holiday' | 'vacation' | 'absence' | 'recovery' | 'birthday' | 'non-working';
export interface RosterCell {
    type: RosterCellType;
    /** Texto visible: nombre del festivo, turno "16:00–20:00", "Vacaciones"… */
    label: string;
}
export interface RosterRow {
    id: string;
    /** Nombre completo del empleado / recurso */
    name: string;
    /**
     * Celdas indexadas por número de día (1 = día 1 del mes).
     * Solo hay que incluir los días con datos; el resto quedan vacíos.
     */
    cells: Partial<Record<number, RosterCell | null>>;
}
export interface LegendItem {
    type: Exclude<RosterCellType, 'schedule'>;
    label: string;
}
export interface CalendarRosterProps {
    /** Filas del cuadrante (empleados / recursos) */
    rows: RosterRow[];
    /** Mes visible (controlado) */
    month: Date;
    /** Callback al cambiar de mes — para navegación SPA */
    onMonthChange?: (month: Date) => void;
    /**
     * Genera el href para cada mes de navegación.
     * Si se pasa, los botones prev/next se renderizan como <a>.
     * Compatible con SSR y Next.js. Toma precedencia sobre onMonthChange.
     */
    hrefBuilder?: (month: Date) => string;
    /** Componente Link del router. Default: "a" */
    linkComponent?: ComponentType<any>;
    /**
     * Render prop para personalizar el contenido interno de cada celda.
     * El componente sigue siendo responsable del <td> y sus clases (--weekend, --today, --holiday, --non-working).
     * Cuando se pasa, sustituye al renderizado por defecto de chips/schedule.
     */
    renderCell?: (day: number, date: Date, cell: RosterCell | null) => ReactNode;
    /**
     * Etiqueta de la columna de nombre. **Sin default**: sin ella, sale de
     * `calendarRoster.name` del `BrandMessagesProvider`.
     */
    nameLabel?: string;
    /**
     * Lo que precede a la etiqueta de un cumpleaños. Default: `'🎂 '`
     * (castellano/universal). Es contenido **visible** y se lee en voz alta:
     * pásalo vacío para quitarlo, u otro texto para sustituirlo.
     */
    birthdayPrefix?: string;
    /** Muestra la leyenda al final. Default: true */
    showLegend?: boolean;
    /**
     * Entradas de la leyenda, en orden. **Sin default**: sin ella, la leyenda se
     * arma con los seis tipos del sistema y sus textos de
     * `calendarRoster.*`. Se pasa entera para cambiar el orden o quitar tipos,
     * no para traducir.
     */
    legendItems?: LegendItem[];
    /**
     * aria-label de la leyenda. **Sin default**: sin ella, sale de
     * `calendarRoster.legend`. Solo se lee con `showLegend`.
     */
    legendLabel?: string;
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
    /** Locale para nombres de mes y día. Default: 'es-ES' */
    locale?: string;
    className?: string;
}
export declare function CalendarRoster({ rows, month, onMonthChange, hrefBuilder, linkComponent, renderCell, nameLabel, birthdayPrefix, showLegend, locale, legendItems, legendLabel, previousMonthLabel, nextMonthLabel, className, }: CalendarRosterProps): import("react/jsx-runtime").JSX.Element;
