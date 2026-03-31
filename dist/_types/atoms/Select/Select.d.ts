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
}
export declare function Select({ options, value, defaultValue, placeholder, disabled, dark, onValueChange, id, }: SelectProps): import("react/jsx-runtime").JSX.Element;
export {};
