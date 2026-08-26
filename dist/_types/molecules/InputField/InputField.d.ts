import { type ComponentPropsWithoutRef } from 'react';
import './InputField.css';
export interface InputFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'value' | 'defaultValue'> {
    id: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve, como en `SelectField`.
     * Con la etiqueta oculta y sin `placeholder`, el control usa el texto de la
     * etiqueta como placeholder para no quedarse sin pista visible.
     */
    labelHidden?: boolean;
    name?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
/**
 * El `ref` y el resto de props nativas de `<input>` van al `<input>` interno
 * (react-hook-form `register()`, `autoComplete`, `aria-*`, `data-*`…); el
 * `className` va al contenedor.
 */
export declare const InputField: import("react").ForwardRefExoticComponent<InputFieldProps & import("react").RefAttributes<HTMLInputElement>>;
