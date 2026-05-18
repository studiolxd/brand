import { Label } from '../../atoms/Label/Label';
import { DatePicker } from '../DatePicker/DatePicker';
import type { DatePickerProps } from '../DatePicker/DatePicker';
import './DatePickerField.css';

export interface DatePickerFieldProps extends Omit<DatePickerProps, 'id' | 'describedBy'> {
  id: string;
  label: string;
  labelHidden?: boolean;
  errorMessage?: string;
  helperText?: string;
}

export function DatePickerField({
  id,
  label,
  labelHidden = true,
  errorMessage,
  helperText,
  error = false,
  ...pickerProps
}: DatePickerFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={['date-picker-field', error ? 'date-picker-field--error' : ''].filter(Boolean).join(' ')}>
      <Label htmlFor={id} hidden={labelHidden}>{label}</Label>
      <DatePicker
        {...pickerProps}
        id={id}
        error={error}
        describedBy={describedBy}
      />
      {errorMessage && (
        <span id={errorId} className="date-picker-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="date-picker-field__helper">{helperText}</span>
      )}
    </div>
  );
}
