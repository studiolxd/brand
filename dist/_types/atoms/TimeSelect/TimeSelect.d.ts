import './TimeSelect.css';
/**
 * El cromo de la hora: cómo se llaman los dos desplegables y qué pone dentro
 * mientras no hay hora elegida.
 *
 * **Las dos máscaras también son idioma, no formato.** `HH` y `MM` parecen
 * notación técnica, pero son la inicial de una palabra —hora y minuto— y
 * cambian con ella: en alemán se escriben `SS`/`MM` (*Stunde*, *Minute*). Lo
 * que NO se traduce es el dibujo: dos cifras, la hora antes que el minuto y
 * los dos puntos en medio; eso no lo decide ni la prop ni el catálogo.
 *
 * Las **cifras de las opciones** (`00`…`23`) tampoco están aquí: son datos.
 */
export interface TimeSelectMessages {
    /** Nombre accesible del desplegable de horas. */
    hours: string;
    /** Nombre accesible del desplegable de minutos. */
    minutes: string;
    /** Máscara del desplegable de horas sin valor: `HH`. */
    maskHours: string;
    /** Máscara del desplegable de minutos sin valor: `MM`. */
    maskMinutes: string;
}
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
    /** Campo obligatorio: se marca el grupo y los dos desplegables. */
    required?: boolean;
    /** Id de la etiqueta que nombra el grupo (lo pone el campo). */
    'aria-labelledby'?: string;
    /** Ids de ayuda/error que describen el grupo (lo pone el campo). */
    'aria-describedby'?: string;
    /** Se llama al salir de cualquiera de los dos desplegables. */
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
    /**
     * aria-label del selector de horas. **Sin default**: sin él, el texto sale
     * de `timeSelect.hours` del `BrandMessagesProvider`.
     */
    hoursLabel?: string;
    /**
     * aria-label del selector de minutos. **Sin default**: sin él, sale de
     * `timeSelect.minutes` del `BrandMessagesProvider`.
     */
    minutesLabel?: string;
    /**
     * Máscara del selector de horas. **Sin default**: sin ella, sale de
     * `timeSelect.maskHours` del `BrandMessagesProvider`.
     */
    hoursPlaceholder?: string;
    /**
     * Máscara del selector de minutos. **Sin default**: sin ella, sale de
     * `timeSelect.maskMinutes` del `BrandMessagesProvider`.
     */
    minutesPlaceholder?: string;
}
/**
 * Hora repartida en dos desplegables. El `ref` va al de **horas**, que es el
 * primero que se enfoca.
 */
export declare const TimeSelect: import("react").ForwardRefExoticComponent<TimeSelectProps & import("react").RefAttributes<HTMLButtonElement>>;
