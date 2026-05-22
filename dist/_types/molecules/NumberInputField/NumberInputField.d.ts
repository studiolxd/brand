import './NumberInputField.css';
export interface NumberInputFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    name?: string;
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    onChange?: (value: number) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
export declare function NumberInputField({ id, label, labelHidden, name, value, defaultValue, min, max, step, disabled, readOnly, size, error, errorMessage, helperText, onChange, onBlur, onFocus, }: NumberInputFieldProps): import("react/jsx-runtime").JSX.Element;
