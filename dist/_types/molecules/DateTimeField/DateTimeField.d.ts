import type { CalendarProps } from '../Calendar/Calendar';
import './DateTimeField.css';
export interface DateTimeFieldProps {
    /** `id` del campo. Si no se pasa, se genera con `useId`. */
    id?: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
     * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
     * es la primera de la lista, la etiqueta se oculta sola.
     */
    labelHidden?: boolean;
    value?: Date | null;
    placeholder?: string;
    /** Paso en minutos del selector de hora. */
    timeStep?: number;
    minDate?: CalendarProps['minDate'];
    maxDate?: CalendarProps['maxDate'];
    disabledDates?: CalendarProps['disabledDates'];
    /** Nombre del campo en el formulario: se monta un input oculto con la fecha en ISO. */
    name?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    readOnly?: boolean;
    /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
    error?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    locale?: string;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
    /** aria-label del desplegable de horas. Default: "Horas" (castellano). */
    hoursLabel?: string;
    /** aria-label del desplegable de minutos. Default: "Minutos" (castellano). */
    minutesLabel?: string;
    onChange?: (date: Date | null) => void;
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}
/**
 * Fecha y hora en un solo campo: un `DatePicker` y un `TimeSelect` que
 * comparten valor. El `ref` va al disparador de la fecha, que es el primero
 * que se enfoca; el `className`, al contenedor.
 */
export declare const DateTimeField: import("react").ForwardRefExoticComponent<DateTimeFieldProps & import("react").RefAttributes<HTMLButtonElement>>;
