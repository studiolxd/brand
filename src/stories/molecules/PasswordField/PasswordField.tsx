import { useState } from 'react';
import './PasswordField.css';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { Icon } from '../../atoms/Icon/Icon';

export interface PasswordFieldProps {
  id: string;
  label: string;
  labelHidden?: boolean;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function PasswordField({
  id,
  label,
  labelHidden = true,
  name,
  placeholder,
  value,
  defaultValue,
  disabled,
  readOnly,
  size = 'md',
  error = false,
  errorMessage,
  helperText,
  onChange,
  onBlur,
  onFocus,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="password-field">
      <Label htmlFor={id} hidden={labelHidden}>{label}</Label>
      <div className="password-field__wrapper">
        <Input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder ?? (labelHidden ? label : undefined)}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          size={size}
          error={error}
          describedBy={describedBy}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <button
          type="button"
          className="password-field__toggle"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          aria-controls={id}
          aria-pressed={visible}
        >
          <VisuallyHidden>{visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}</VisuallyHidden>
          <Icon name={visible ? 'eye-off' : 'eye'} className="password-field__icon" />
        </button>
      </div>
      {errorMessage && (
        <span id={errorId} className="password-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="password-field__helper">{helperText}</span>
      )}
    </div>
  );
}

