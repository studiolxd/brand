import './Input.css';
interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    id?: string;
    name?: string;
    describedBy?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
export declare function Input({ type, placeholder, value, defaultValue, disabled, readOnly, size, error, id, name, describedBy, onChange, onBlur, onFocus, }: InputProps): import("react/jsx-runtime").JSX.Element;
export {};
