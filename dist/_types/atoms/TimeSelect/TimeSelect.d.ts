import './TimeSelect.css';
export interface TimeValue {
    h: number;
    m: number;
}
export interface TimeSelectProps {
    value?: TimeValue | null;
    onChange?: (value: TimeValue) => void;
    /** Paso en minutos. Default: 5 */
    step?: number;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    /** id aplicado al trigger de horas */
    id?: string;
    /**
     * aria-label del selector de horas. Default: "Horas" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    hoursLabel?: string;
    /**
     * aria-label del selector de minutos. Default: "Minutos" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    minutesLabel?: string;
    /** Placeholder del selector de horas. Default: "HH" */
    hoursPlaceholder?: string;
    /** Placeholder del selector de minutos. Default: "MM" */
    minutesPlaceholder?: string;
}
export declare function TimeSelect({ value, onChange, step, size, disabled, readOnly, error, id, hoursLabel, minutesLabel, hoursPlaceholder, minutesPlaceholder, }: TimeSelectProps): import("react/jsx-runtime").JSX.Element;
