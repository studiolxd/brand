import type { Country } from 'react-phone-number-input';
import './InputPhoneField.css';
interface InputPhoneFieldProps {
    id: string;
    label: string;
    labelHidden?: boolean;
    value?: string;
    defaultCountry?: Country;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    dark?: boolean;
    name?: string;
    onChange?: (value: string | undefined) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
export declare function InputPhoneField({ id, label, labelHidden, value, defaultCountry, placeholder, disabled, error, errorMessage, helperText, dark, name, onChange, onBlur, }: InputPhoneFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
