import './Checkbox.css';
interface CheckboxProps {
    checked?: boolean | 'indeterminate';
    defaultChecked?: boolean | 'indeterminate';
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    required?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}
export declare function Checkbox({ checked, defaultChecked, disabled, id, name, value, required, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, onCheckedChange, }: CheckboxProps): import("react/jsx-runtime").JSX.Element;
export {};
