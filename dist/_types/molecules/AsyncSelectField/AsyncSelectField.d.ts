import './AsyncSelectField.css';
import type { AsyncSelectOption } from '../../atoms/AsyncSelect/AsyncSelect';
export type { AsyncSelectOption };
export interface AsyncSelectFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    onSearch: (query: string) => Promise<AsyncSelectOption[]>;
    value?: string | null;
    onValueChange?: (value: string | null, option: AsyncSelectOption | null) => void;
    selectedOption?: AsyncSelectOption | null;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
}
export declare function AsyncSelectField({ id, label, labelHidden, onSearch, value, onValueChange, selectedOption, placeholder, disabled, readOnly, size, error, errorMessage, helperText, }: AsyncSelectFieldProps): import("react/jsx-runtime").JSX.Element;
