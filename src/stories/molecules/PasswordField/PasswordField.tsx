import { useState } from 'react';
import './PasswordField.css';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';

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
          {visible ? <EyeOffIcon /> : <EyeIcon />}
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

function EyeIcon() {
  return (
    <svg className="password-field__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="password-field__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
