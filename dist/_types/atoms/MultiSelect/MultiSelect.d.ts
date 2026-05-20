import './MultiSelect.css';
export interface MultiSelectOption {
    value: string;
    label: string;
    'aria-label'?: string;
}
export interface MultiSelectProps {
    options: MultiSelectOption[];
    value?: string[];
    defaultValue?: string[];
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    dark?: boolean;
    size?: 'sm' | 'md' | 'lg';
    onValueChange?: (value: string[]) => void;
    id?: string;
    'aria-label'?: string;
}
export declare function MultiSelect({ options, value, defaultValue, placeholder, disabled, readOnly, dark, size, onValueChange, id, 'aria-label': ariaLabel, }: MultiSelectProps): import("react/jsx-runtime").JSX.Element;
