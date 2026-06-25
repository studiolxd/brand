import './NumberInputField.css';
import { Label } from '../../atoms/Label/Label';
import { NumberInput } from '../../atoms/NumberInput/NumberInput';

export interface NumberInputFieldProps {
  id: string;
  label: string;
  labelHidden?: boolean;
  name?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  decimal?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function NumberInputField({
  id,
  label,
  labelHidden = true,
  name,
  value,
  defaultValue,
  min,
  max,
  step = 1,
  decimal,
  disabled,
  readOnly,
  size = 'md',
  error = false,
  errorMessage,
  helperText,
  onChange,
  onBlur,
  onFocus,
}: NumberInputFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="number-input-field">
      <Label htmlFor={id} hidden={labelHidden}>{label}</Label>
      <NumberInput
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        decimal={decimal}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        error={error || !!errorMessage}
        describedBy={describedBy}
        ariaLabel={labelHidden ? label : undefined}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {errorMessage && (
        <span id={errorId} className="number-input-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="number-input-field__helper">{helperText}</span>
      )}
    </div>
  );
}
