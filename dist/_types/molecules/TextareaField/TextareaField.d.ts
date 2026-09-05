import { type ComponentPropsWithoutRef } from 'react';
import './TextareaField.css';
export interface TextareaFieldProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'value' | 'defaultValue' | 'rows'> {
    id: string;
    label: string;
    /**
     * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
     * Por defecto `false`: la etiqueta se ve, como en `SelectField`.
     * Con la etiqueta oculta y sin `placeholder`, el control usa el texto de la
     * etiqueta como placeholder para no quedarse sin pista visible.
     * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
     * es la primera de la lista, la etiqueta se oculta sola.
     */
    labelHidden?: boolean;
    name?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    rows?: number;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
}
/**
 * El `ref` y el resto de props nativas de `<textarea>` van al `<textarea>`
 * interno (react-hook-form `register()`, `aria-*`, `data-*`…); el `className`,
 * al contenedor.
 */
export declare const TextareaField: import("react").ForwardRefExoticComponent<TextareaFieldProps & import("react").RefAttributes<HTMLTextAreaElement>>;
