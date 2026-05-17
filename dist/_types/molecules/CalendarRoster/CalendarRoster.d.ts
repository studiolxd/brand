import type { ComponentType } from 'react';
import './CalendarRoster.css';
export type RosterCellType = 'schedule' | 'holiday' | 'vacation' | 'absence' | 'recovery' | 'birthday';
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
    /** Etiqueta de la columna de nombre. Default: 'Empleado' */
    nameLabel?: string;
    /** Muestra la leyenda al final. Default: true */
    showLegend?: boolean;
    /** Locale para nombres de mes y día. Default: 'es-ES' */
    locale?: string;
    className?: string;
}
export declare function CalendarRoster({ rows, month, onMonthChange, hrefBuilder, linkComponent, nameLabel, showLegend, locale, className, }: CalendarRosterProps): import("react/jsx-runtime").JSX.Element;
