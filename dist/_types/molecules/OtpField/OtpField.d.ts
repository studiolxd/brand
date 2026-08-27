import './OtpField.css';
export interface OtpFieldProps {
    /** `id` del control. Si no se pasa, se genera con `useId`. */
    id?: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
     */
    labelHidden?: boolean;
    /** Número de celdas. */
    length: number;
    value?: string;
    defaultValue?: string;
    name?: string;
    disabled?: boolean;
    readOnly?: boolean;
    /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
    error?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
    /** Etiqueta accesible de cada celda. Default: `Dígito N de M` (castellano). */
    digitLabel?: (index: number, length: number) => string;
    /** Recibe el código completo, no el evento. */
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
/**
 * El `OtpInput` como campo de formulario. El `ref` va a la primera celda, que
 * es la que react-hook-form enfoca al fallar la validación; el `className`, al
 * contenedor.
 */
export declare const OtpField: import("react").ForwardRefExoticComponent<OtpFieldProps & import("react").RefAttributes<HTMLInputElement>>;
