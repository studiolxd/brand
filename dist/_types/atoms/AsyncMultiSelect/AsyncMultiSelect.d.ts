import './AsyncMultiSelect.css';
export interface AsyncMultiSelectOption {
    value: string;
    label: string;
}
export interface AsyncMultiSelectProps {
    onSearch: (query: string) => Promise<AsyncMultiSelectOption[]>;
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    /** Labels for the currently selected values — the parent is responsible for providing these */
    selectedOptions?: AsyncMultiSelectOption[];
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    dark?: boolean;
    size?: 'sm' | 'md' | 'lg';
    id?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
}
export declare function AsyncMultiSelect({ onSearch, value, defaultValue, onValueChange, selectedOptions, placeholder, disabled, readOnly, dark, size, id, 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedby, }: AsyncMultiSelectProps): import("react/jsx-runtime").JSX.Element;
