import './InputField.css';
export interface InputFieldProps {
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
export declare function InputField({ id, label, labelHidden, name, type, placeholder, value, defaultValue, disabled, readOnly, size, error, errorMessage, helperText, onChange, onBlur, onFocus, }: InputFieldProps): import("react/jsx-runtime").JSX.Element;
