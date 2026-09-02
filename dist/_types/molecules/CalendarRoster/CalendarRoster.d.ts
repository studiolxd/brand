import type { ComponentType, ReactNode } from 'react';
import './CalendarRoster.css';
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
    /** Etiqueta de la columna de nombre. Default: 'Empleado' */
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
     * Entradas de la leyenda, en orden. Default: las seis del sistema con sus etiquetas
     * en castellano. Es texto **visible**: una app multiidioma debe pasarlas traducidas.
     */
    legendItems?: LegendItem[];
    /**
     * aria-label de la leyenda. Default: "Leyenda" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    legendLabel?: string;
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
    /** Locale para nombres de mes y día. Default: 'es-ES' */
    locale?: string;
    className?: string;
}
export declare function CalendarRoster({ rows, month, onMonthChange, hrefBuilder, linkComponent, renderCell, nameLabel, birthdayPrefix, showLegend, locale, legendItems, legendLabel, previousMonthLabel, nextMonthLabel, className, }: CalendarRosterProps): import("react/jsx-runtime").JSX.Element;
