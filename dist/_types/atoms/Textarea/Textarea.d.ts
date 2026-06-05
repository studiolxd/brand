import './Textarea.css';
interface TextareaProps {
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    rows?: number;
    disabled?: boolean;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    id?: string;
    name?: string;
    describedBy?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}
export declare function Textarea({ placeholder, value, defaultValue, rows, disabled, readOnly, size, error, id, name, describedBy, onChange, onBlur, onFocus, onKeyDown, }: TextareaProps): import("react/jsx-runtime").JSX.Element;
export {};
