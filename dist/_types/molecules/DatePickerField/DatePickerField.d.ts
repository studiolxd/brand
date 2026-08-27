import type { DatePickerProps } from '../DatePicker/DatePicker';
import './DatePickerField.css';
export interface DatePickerFieldProps extends Omit<DatePickerProps, 'id' | 'describedBy' | 'aria-describedby' | 'aria-label'> {
    /** `id` del control. Si no se pasa, se genera con `useId`. */
    id?: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
     */
    labelHidden?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * El `DatePicker` como campo de formulario. El `ref` va al **disparador**,
 * para que react-hook-form pueda enfocarlo al fallar la validación; el
 * `className`, al contenedor.
 */
export declare const DatePickerField: import("react").ForwardRefExoticComponent<DatePickerFieldProps & import("react").RefAttributes<HTMLButtonElement>>;
