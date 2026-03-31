import './TextareaField.css';
interface TextareaFieldProps {
    id: string;
    label: string;
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
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
}
export declare function TextareaField({ id, label, labelHidden, name, placeholder, value, defaultValue, rows, disabled, readOnly, error, errorMessage, helperText, onChange, onBlur, onFocus, }: TextareaFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
