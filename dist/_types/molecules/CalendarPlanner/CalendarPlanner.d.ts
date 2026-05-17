import { type ReactNode } from 'react';
import './CalendarPlanner.css';
type TagVariant = 'default' | 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2' | 'neutral' | 'info' | 'warning' | 'success' | 'danger';
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
    /** Tamaño del componente. Default: 'md' */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare function CalendarPlanner({ events, renderDay, maxItemsPerDay, onMoreClick, month: monthProp, defaultMonth, onMonthChange, navigable, locale, size, className, }: CalendarPlannerProps): import("react/jsx-runtime").JSX.Element;
export {};
