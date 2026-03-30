import { InputPhone } from '../../atoms/InputPhone/InputPhone';
import { Label } from '../../atoms/Label/Label';
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

export function InputPhoneField({
  id,
  label,
  labelHidden = true,
  value,
  defaultCountry,
  placeholder,
  disabled,
  error = false,
  errorMessage,
  helperText,
  dark,
  name,
  onChange,
  onBlur,
}: InputPhoneFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="input-phone-field">
      <Label htmlFor={id} hidden={labelHidden}>{label}</Label>
      <InputPhone
        id={id}
        name={name}
        value={value}
        defaultCountry={defaultCountry}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        dark={dark}
        describedBy={describedBy}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMessage && (
        <span id={errorId} className="input-phone-field__error">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="input-phone-field__helper">{helperText}</span>
      )}
    </div>
  );
}
