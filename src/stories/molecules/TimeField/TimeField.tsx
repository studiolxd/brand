import { Label } from '../../atoms/Label/Label';
import { TimeSelect } from '../../atoms/TimeSelect/TimeSelect';
import type { TimeValue } from '../../atoms/TimeSelect/TimeSelect';
import './TimeField.css';

export interface TimeFieldProps {
  id: string;
  label: string;
  labelHidden?: boolean;
  value?: TimeValue | null;
  onChange?: (value: TimeValue) => void;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  dark?: boolean;
}

export function TimeField({
  id,
  label,
  labelHidden = true,
  value,
  onChange,
  step,
  size,
  disabled,
  error = false,
  errorMessage,
  helperText,
  dark,
}: TimeFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  const cls = [
    'time-field',
    error ? 'time-field--error' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      <Label htmlFor={id} hidden={labelHidden}>{label}</Label>
      <TimeSelect
        id={id}
        value={value}
        onChange={onChange}
        step={step}
        size={size}
        disabled={disabled}
        error={error}
        dark={dark}
      />
      {errorMessage && (
        <span id={errorId} className="time-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="time-field__helper">{helperText}</span>
      )}
    </div>
  );
}
