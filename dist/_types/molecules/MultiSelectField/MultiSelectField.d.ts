import './MultiSelectField.css';
import type { MultiSelectOption } from '../../atoms/MultiSelect/MultiSelect';
export type { MultiSelectOption };
export interface MultiSelectFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    options: MultiSelectOption[];
    value?: string[];
    defaultValue?: string[];
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    dark?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    onValueChange?: (value: string[]) => void;
}
export declare function MultiSelectField({ id, label, labelHidden, options, value, defaultValue, placeholder, disabled, readOnly, dark, size, error, errorMessage, helperText, onValueChange, }: MultiSelectFieldProps): import("react/jsx-runtime").JSX.Element;
