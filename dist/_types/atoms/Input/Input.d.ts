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
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
    pattern?: string;
    maxLength?: number;
    autoComplete?: string;
    ariaLabel?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
}
export declare function Input({ type, placeholder, value, defaultValue, disabled, readOnly, size, error, id, name, describedBy, inputMode, pattern, maxLength, autoComplete, ariaLabel, onChange, onBlur, onFocus, onKeyDown, onPaste, }: InputProps): import("react/jsx-runtime").JSX.Element;
export {};
