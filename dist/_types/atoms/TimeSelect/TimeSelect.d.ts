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
    /** Nombre del campo en el formulario: se monta un input oculto con `HH:MM`. */
    name?: string;
    /** Id de la etiqueta que nombra el grupo (lo pone el campo). */
    'aria-labelledby'?: string;
    /** Ids de ayuda/error que describen el grupo (lo pone el campo). */
    'aria-describedby'?: string;
    /** Se llama al salir de cualquiera de los dos desplegables. */
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
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
/**
 * Hora repartida en dos desplegables. El `ref` va al de **horas**, que es el
 * primero que se enfoca.
 */
export declare const TimeSelect: import("react").ForwardRefExoticComponent<TimeSelectProps & import("react").RefAttributes<HTMLButtonElement>>;
