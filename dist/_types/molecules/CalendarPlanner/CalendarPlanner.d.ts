import { type ReactNode } from 'react';
import type { TagVariant } from '../../atoms/Tag/Tag';
import './CalendarPlanner.css';
export interface PlannerEvent {
    id: string;
    date: Date;
    label: string;
    variant?: TagVariant;
}
export interface CalendarPlannerProps {
    /** Eventos a mostrar en el planificador */
    events?: PlannerEvent[];
    /**
     * Render prop para personalizar el contenido de cada celda.
     * Si se pasa, sustituye al renderizado por defecto de tags.
     */
    renderDay?: (date: Date, events: PlannerEvent[]) => ReactNode;
    /** Número máximo de eventos visibles por celda antes de truncar. Default: 3 */
    maxItemsPerDay?: number;
    /** Callback al pulsar "+N más" en una celda */
    onMoreClick?: (date: Date, events: PlannerEvent[]) => void;
    /**
     * Abre el diálogo interno con los eventos ocultos al pulsar "+N más".
     * Default: `true`, salvo que se pase `onMoreClick`, en cuyo caso el
     * consumidor lleva ya el desbordamiento y el diálogo propio se apaga.
     * Pásalo a `true` de forma explícita para tener las dos cosas.
     */
    showMoreDialog?: boolean;
    /**
     * Callback al hacer click en cualquier celda de día (incluso días vacíos y externos).
     * Recibe la fecha de la celda y el array de eventos de ese día (vacío si no hay ninguno).
     * Compatible con renderDay: el click se dispara en el contenedor de la celda.
     */
    onDayClick?: (date: Date, events: PlannerEvent[]) => void;
    /** Mes visible (modo controlado) */
    month?: Date;
    /** Mes inicial en modo no controlado */
    defaultMonth?: Date;
    /** Callback al cambiar de mes */
    onMonthChange?: (month: Date) => void;
    /** Muestra los botones de navegación prev/next. Default: true */
    navigable?: boolean;
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
     * título del mes visible. Es texto para lectores: una app multiidioma debe
     * pasarlo traducido.
     */
    gridLabel?: string;
    /**
     * Rótulo visible del botón que abre los eventos ocultos de una celda.
     * Default: `+N más` (castellano). Interpola el número, así que es una
     * función: una app multiidioma debe pasarla traducida.
     */
    moreLabel?: (count: number) => string;
    /** Tamaño del componente. Default: 'md' */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare function CalendarPlanner({ events, renderDay, maxItemsPerDay, onMoreClick, showMoreDialog, onDayClick, month: monthProp, defaultMonth, onMonthChange, navigable, locale, previousMonthLabel, nextMonthLabel, gridLabel, moreLabel, size, className, }: CalendarPlannerProps): import("react/jsx-runtime").JSX.Element;
