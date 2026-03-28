import './InputField.css';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';

interface InputFieldProps {
  id: string;
  label: string;
  labelHidden?: boolean;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  dark?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function InputField({
  id,
  label,
  labelHidden = true,
  name,
  type,
  placeholder,
  value,
  defaultValue,
  disabled,
  readOnly,
  error = false,
  errorMessage,
  helperText,
  dark = false,
  onChange,
  onBlur,
  onFocus,
}: InputFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={['input-field', dark ? 'input-field--dark' : ''].filter(Boolean).join(' ')}>
      <Label htmlFor={id} hidden={labelHidden} dark={dark}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        error={error}
        dark={dark}
        describedBy={describedBy}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {errorMessage && (
        <span id={errorId} className="input-field__error">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="input-field__helper">{helperText}</span>
      )}
    </div>
  );
}
