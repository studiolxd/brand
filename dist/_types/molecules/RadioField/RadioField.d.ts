import './RadioField.css';
interface RadioFieldProps {
    label: React.ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export declare function RadioField({ label, checked, defaultChecked, disabled, id, name, value, onChange, }: RadioFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
