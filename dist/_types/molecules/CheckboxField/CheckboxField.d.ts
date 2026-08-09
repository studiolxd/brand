import './CheckboxField.css';
interface CheckboxFieldProps {
    label: React.ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    id?: string;
    name?: string;
    value?: string;
    onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}
export declare function CheckboxField({ label, checked, defaultChecked, disabled, size, id, name, value, onCheckedChange, }: CheckboxFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
