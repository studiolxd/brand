import './SwitcherField.css';
export interface SwitcherFieldProps {
    label: React.ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    id?: string;
    name?: string;
    value?: string;
    required?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}
export declare function SwitcherField({ label, checked, defaultChecked, disabled, size, id, name, value, required, onCheckedChange, }: SwitcherFieldProps): import("react/jsx-runtime").JSX.Element;
