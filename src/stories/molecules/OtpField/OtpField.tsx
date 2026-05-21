import './OtpField.css';
import { Label } from '../../atoms/Label/Label';
import { OtpInput } from '../../atoms/OtpInput/OtpInput';

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

export function OtpField({
  id,
  label,
  labelHidden = false,
  length,
  value,
  defaultValue,
  onChange,
  onComplete,
  disabled,
  readOnly,
  error = false,
  errorMessage,
  helperText,
  size = 'md',
}: OtpFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="otp-field" data-size={size}>
      <Label htmlFor={`${id}-0`} hidden={labelHidden}>{label}</Label>
      <OtpInput
        id={id}
        length={length}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onComplete={onComplete}
        disabled={disabled}
        readOnly={readOnly}
        error={error || !!errorMessage}
        size={size}
        describedBy={describedBy}
      />
      {errorMessage && (
        <span id={errorId} className="otp-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="otp-field__helper">{helperText}</span>
      )}
    </div>
  );
}
