import type { CalendarProps } from '../Calendar/Calendar';
import './DatePicker.css';
export interface DatePickerProps {
    value?: Date | null;
    onChange?: (date: Date) => void;
    placeholder?: string;
    minDate?: CalendarProps['minDate'];
    maxDate?: CalendarProps['maxDate'];
    disabledDates?: CalendarProps['disabledDates'];
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    locale?: string;
    /** id aplicado al botón trigger */
    id?: string;
    /** @deprecated Usa el atributo nativo `aria-describedby`. */
    describedBy?: string;
    /** Ids de ayuda/error que describen el control (lo pone el campo). */
    'aria-describedby'?: string;
    /** Nombre accesible cuando el control va suelto. En un campo lo nombra la etiqueta. */
    'aria-label'?: string;
    /** Nombre del campo en el formulario: se monta un input oculto con la fecha en ISO. */
    name?: string;
    /** Se llama al salir del disparador (react-hook-form lo usa para validar). */
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
}
/**
 * Selector de fecha. El `ref` va al **disparador**, para que react-hook-form
 * pueda enfocarlo al fallar la validación.
 */
export declare const DatePicker: import("react").ForwardRefExoticComponent<DatePickerProps & import("react").RefAttributes<HTMLButtonElement>>;
