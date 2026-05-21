import './Switcher.css';
export interface SwitcherProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    id?: string;
    name?: string;
    value?: string;
    required?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    onCheckedChange?: (checked: boolean) => void;
}
export declare function Switcher({ checked, defaultChecked, disabled, size, id, name, value, required, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, onCheckedChange, }: SwitcherProps): import("react/jsx-runtime").JSX.Element;
