import type { Country } from 'react-phone-number-input';
import './InputPhone.css';
interface InputPhoneProps {
    value?: string;
    defaultCountry?: Country;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    dark?: boolean;
    size?: 'sm' | 'md' | 'lg';
    id?: string;
    name?: string;
    describedBy?: string;
    onChange?: (value: string | undefined) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
export declare function InputPhone({ value, defaultCountry, placeholder, disabled, error, dark, size, id, name, describedBy, onChange, onBlur, }: InputPhoneProps): import("react/jsx-runtime").JSX.Element;
export {};
