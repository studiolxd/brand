import { type ReactNode } from 'react';
import type { TagTone, TagVariant } from '../../atoms/Tag/Tag';
import './CalendarPlanner.css';
/**
 * Los textos propios del planificador: el botón que abre los eventos que no
 * caben en una celda, las flechas de la vista de semana y el conmutador de
 * vista. Las **flechas de mes no están aquí** —son el mismo texto que el del
 * `Calendar` y salen de `calendar.previousMonth` / `.nextMonth`—, y
 * `gridLabel` tampoco: nombra a ESE planificador.
 */
export interface CalendarPlannerMessages {
    /** Rótulo del botón de desbordamiento: «+3 más». Interpola, así que es función. */
    more: (count: number) => string;
    /** Nombre accesible de la flecha de retroceso en la vista de semana. */
    previousWeek: string;
    /** Nombre accesible de la flecha de avance en la vista de semana. */
    nextWeek: string;
    /** Rótulo del botón de vista de mes del conmutador. */
    monthView: string;
    /** Rótulo del botón de vista de semana del conmutador. */
    weekView: string;
    /** Nombre accesible del conmutador de vista. */
    viewSwitcher: string;
}
export interface PlannerEvent {
    id: string;
    date: Date;
    label: string;
    /** Color de la etiqueta del evento (el `tone` de `Tag`). Default `'neutral'`. */
    tone?: TagTone;
    /**
     * @deprecated Usa `tone`. `variant: 'danger'` es `tone: 'error'`. Sigue
     * funcionando, con un aviso en desarrollo, hasta la v52.
     */
    variant?: TagVariant;
    /**
     * El evento dura todo el día: la vista de semana lo pinta **sin hora**, el
     * primero de la columna. Sin ella se deriva de la propia fecha —un evento a
     * las 00:00 es de día entero—, que es lo que hace el mes desde siempre y lo
     * que permite que la misma lista de eventos sirva para las dos vistas.
     */
    allDay?: boolean;
}
/**
 * Las dos caras del planificador: el `month` de siempre —la parrilla del mes
 * entera— y `week`, siete columnas con el día completo, donde los eventos con
 * hora se leen en orden.
 */
export type CalendarPlannerView = 'month' | 'week';
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
    /**
     * aria-label de la rejilla de días. Sin ella, la rejilla toma como nombre el
     * título del mes visible. Es texto para lectores: una app multiidioma debe
     * pasarlo traducido.
     */
    gridLabel?: string;
    /**
     * Rótulo visible del botón que abre los eventos ocultos de una celda. **Sin
     * default**: sin él, sale de `calendarPlanner.more` del
     * `BrandMessagesProvider`. Solo se lee cuando alguna celda desborda.
     */
    moreLabel?: (count: number) => string;
    /**
     * Vista visible (modo controlado): la parrilla del mes o la semana.
     * Default: `'month'` — el planificador de siempre.
     */
    view?: CalendarPlannerView;
    /** Vista inicial en modo no controlado. Default: `'month'` */
    defaultView?: CalendarPlannerView;
    /** Callback al cambiar de vista, tanto desde el conmutador como al navegar. */
    onViewChange?: (view: CalendarPlannerView) => void;
    /**
     * Pinta el conmutador mes/semana en la cabecera. Default: `false` — un
     * planificador que ya está montado no gana botones por actualizar el
     * paquete; quien quiera las dos vistas lo pide.
     */
    viewSwitcher?: boolean;
    /**
     * Semana visible (modo controlado). Vale cualquier día de ella: el
     * componente se queda con su lunes.
     */
    week?: Date;
    /** Semana inicial en modo no controlado. Default: la del mes visible, o hoy. */
    defaultWeek?: Date;
    /** Callback al cambiar de semana. Recibe el **lunes** de la nueva. */
    onWeekChange?: (weekStart: Date) => void;
    /**
     * aria-label del botón de semana anterior. **Sin default**: sin él, sale de
     * `calendarPlanner.previousWeek` del `BrandMessagesProvider`. Solo se lee
     * en la vista de semana con `navigable`.
     */
    previousWeekLabel?: string;
    /**
     * aria-label del botón de semana siguiente. **Sin default**: sale de
     * `calendarPlanner.nextWeek`.
     */
    nextWeekLabel?: string;
    /**
     * Rótulo del botón de vista de mes del conmutador. **Sin default**: sale de
     * `calendarPlanner.monthView`. Solo se lee con `viewSwitcher`.
     */
    monthViewLabel?: string;
    /**
     * Rótulo del botón de vista de semana del conmutador. **Sin default**: sale
     * de `calendarPlanner.weekView`. Solo se lee con `viewSwitcher`.
     */
    weekViewLabel?: string;
    /**
     * Nombre accesible del conmutador de vista. **Sin default**: sale de
     * `calendarPlanner.viewSwitcher`. Solo se lee con `viewSwitcher`.
     */
    viewSwitcherLabel?: string;
    /**
     * El día que el planificador marca como «hoy» (y desde el que arranca el
     * mes o la semana visible cuando no se pasa otra fecha). Default: la fecha
     * actual, calculada una vez al montar. **En SSR conviene pasarla**: servidor
     * y navegador calculan cada uno su «ahora», y cerca de la medianoche —o con
     * husos distintos— no coinciden y la hidratación se desajusta. Basta con
     * calcularla en el servidor y mandar la misma fecha a los dos lados.
     */
    today?: Date;
    /** Tamaño del componente. Default: 'md' */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare function CalendarPlanner({ events, renderDay, maxItemsPerDay, onMoreClick, showMoreDialog, onDayClick, month: monthProp, defaultMonth, onMonthChange, view: viewProp, defaultView, onViewChange, viewSwitcher, week: weekProp, defaultWeek, onWeekChange, navigable, locale, previousMonthLabel, nextMonthLabel, previousWeekLabel, nextWeekLabel, monthViewLabel, weekViewLabel, viewSwitcherLabel, gridLabel, moreLabel, today: todayProp, size, className, }: CalendarPlannerProps): import("react/jsx-runtime").JSX.Element;
