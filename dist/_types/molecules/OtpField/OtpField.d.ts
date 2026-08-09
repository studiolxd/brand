import './OtpField.css';
export interface OtpFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    length: number;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    disabled?: boolean;
    readOnly?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
}
export declare function OtpField({ id, label, labelHidden, length, value, defaultValue, onChange, onComplete, disabled, readOnly, error, errorMessage, helperText, size, }: OtpFieldProps): import("react/jsx-runtime").JSX.Element;
