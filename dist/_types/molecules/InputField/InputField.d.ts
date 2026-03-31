import './InputField.css';
interface InputFieldProps {
    id: string;
    label: string;
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
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
export declare function InputField({ id, label, labelHidden, name, type, placeholder, value, defaultValue, disabled, readOnly, error, errorMessage, helperText, onChange, onBlur, onFocus, }: InputFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
