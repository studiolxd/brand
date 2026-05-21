import './AsyncSelect.css';
export interface AsyncSelectOption {
    value: string;
    label: string;
}
export interface AsyncSelectProps {
    onSearch: (query: string) => Promise<AsyncSelectOption[]>;
    value?: string | null;
    onValueChange?: (value: string | null, option: AsyncSelectOption | null) => void;
    /** Label of the currently selected option — required when `value` is set so the component can display it */
    selectedOption?: AsyncSelectOption | null;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    dark?: boolean;
    size?: 'sm' | 'md' | 'lg';
    id?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
}
export declare function AsyncSelect({ onSearch, value, onValueChange, selectedOption, placeholder, disabled, readOnly, dark, size, id, 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedby, }: AsyncSelectProps): import("react/jsx-runtime").JSX.Element;
