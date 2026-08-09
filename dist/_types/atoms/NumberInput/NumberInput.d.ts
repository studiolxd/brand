import './NumberInput.css';
export interface NumberInputProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    decimal?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    id?: string;
    name?: string;
    describedBy?: string;
    ariaLabel?: string;
    onChange?: (value: number) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
export declare function NumberInput({ value, defaultValue, min, max, step, decimal, disabled, readOnly, size, error, id, name, describedBy, ariaLabel, onChange, onBlur, onFocus, }: NumberInputProps): import("react/jsx-runtime").JSX.Element;
