import './TextareaField.css';
export interface TextareaFieldProps {
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
export declare function TextareaField({ id, label, labelHidden, name, placeholder, value, defaultValue, rows, disabled, readOnly, size: sizeProp, error, errorMessage, helperText, onChange, onBlur, onFocus, }: TextareaFieldProps): import("react/jsx-runtime").JSX.Element;
