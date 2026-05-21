import './AsyncMultiSelectField.css';
import type { AsyncMultiSelectOption } from '../../atoms/AsyncMultiSelect/AsyncMultiSelect';
export type { AsyncMultiSelectOption };
export interface AsyncMultiSelectFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    onSearch: (query: string) => Promise<AsyncMultiSelectOption[]>;
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    selectedOptions?: AsyncMultiSelectOption[];
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    dark?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
}
export declare function AsyncMultiSelectField({ id, label, labelHidden, onSearch, value, defaultValue, onValueChange, selectedOptions, placeholder, disabled, readOnly, dark, size, error, errorMessage, helperText, }: AsyncMultiSelectFieldProps): import("react/jsx-runtime").JSX.Element;
