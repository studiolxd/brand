import './PasswordField.css';
export interface PasswordFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    name?: string;
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
export declare function PasswordField({ id, label, labelHidden, name, placeholder, value, defaultValue, disabled, readOnly, size, error, errorMessage, helperText, onChange, onBlur, onFocus, }: PasswordFieldProps): import("react/jsx-runtime").JSX.Element;
