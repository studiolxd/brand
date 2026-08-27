import { type ComponentPropsWithoutRef } from 'react';
import './NumberInputField.css';
export interface NumberInputFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
    /** `id` del control. Si no se pasa, se genera con `useId`. */
    id?: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
     */
    labelHidden?: boolean;
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    /** Admite decimales (coma o punto). */
    decimal?: boolean;
    /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
    error?: boolean;
    /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
    errorMessage?: string;
    /** Texto de ayuda, enlazado por `aria-describedby`. */
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    /** Recibe el valor ya normalizado, no el evento. */
    onChange?: (value: number) => void;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * El `NumberInput` como campo de formulario. El `ref` y el resto de props
 * nativas de `<input>` van al input real (react-hook-form, `name`, `onBlur`,
 * `aria-*`, `data-*`…); el `className`, al contenedor.
 */
export declare const NumberInputField: import("react").ForwardRefExoticComponent<NumberInputFieldProps & import("react").RefAttributes<HTMLInputElement>>;
