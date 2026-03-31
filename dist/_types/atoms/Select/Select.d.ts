import './Select.css';
export interface SelectOption {
    value: string;
    label: string;
}
interface SelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    dark?: boolean;
    onValueChange?: (value: string) => void;
    id?: string;
    /** Etiqueta accesible del trigger. Si no se pasa, usa el placeholder. */
    'aria-label'?: string;
}
export declare function Select({ options, value, defaultValue, placeholder, disabled, dark, onValueChange, id, 'aria-label': ariaLabel, }: SelectProps): import("react/jsx-runtime").JSX.Element;
export {};
