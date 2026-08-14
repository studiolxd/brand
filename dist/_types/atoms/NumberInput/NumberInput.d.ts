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
    /**
     * aria-label del botón de decremento. Default: "Decrementar" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    decrementLabel?: string;
    /**
     * aria-label del botón de incremento. Default: "Incrementar" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    incrementLabel?: string;
    onChange?: (value: number) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
export declare function NumberInput({ value, defaultValue, min, max, step, decimal, disabled, readOnly, size, error, id, name, describedBy, ariaLabel, decrementLabel, incrementLabel, onChange, onBlur, onFocus, }: NumberInputProps): import("react/jsx-runtime").JSX.Element;
