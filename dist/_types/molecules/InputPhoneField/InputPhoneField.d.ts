import type { Country } from 'react-phone-number-input';
import './InputPhoneField.css';
export interface InputPhoneFieldProps {
    /** `id` del control. Si no se pasa, se genera con `useId`. */
    id?: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
     */
    labelHidden?: boolean;
    value?: string;
    defaultCountry?: Country;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    name?: string;
    autoComplete?: string;
    /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
    error?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
    /** aria-label del selector de país. Default: "País" (castellano). */
    countryLabel?: string;
    /** Lo que enseña el selector sin país elegido. Default: "🌐". */
    internationalLabel?: string;
    /** Recibe el número en formato E.164, no el evento. */
    onChange?: (value: string | undefined) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
/**
 * El `InputPhone` como campo de formulario. El `ref` va al `<input>` del
 * número (react-hook-form lo registra y lo enfoca al fallar la validación);
 * el `className`, al contenedor.
 */
export declare const InputPhoneField: import("react").ForwardRefExoticComponent<InputPhoneFieldProps & import("react").RefAttributes<HTMLInputElement>>;
