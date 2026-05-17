import './SelectField.css';
import type { SelectOption } from '../../atoms/Select/Select';
export interface SelectFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    dark?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    onValueChange?: (value: string) => void;
}
export declare function SelectField({ id, label, labelHidden, options, value, defaultValue, placeholder, disabled, dark, size, error, errorMessage, helperText, onValueChange, }: SelectFieldProps): import("react/jsx-runtime").JSX.Element;
