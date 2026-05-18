import { useCallback } from 'react';
import { Label } from '../../atoms/Label/Label';
import { DatePicker } from '../DatePicker/DatePicker';
import { TimeSelect } from '../../atoms/TimeSelect/TimeSelect';
import type { TimeValue } from '../../atoms/TimeSelect/TimeSelect';
import type { CalendarProps } from '../Calendar/Calendar';
import './DateTimeField.css';

export interface DateTimeFieldProps {
  id: string;
  label: string;
  labelHidden?: boolean;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  timeStep?: number;
  minDate?: CalendarProps['minDate'];
  maxDate?: CalendarProps['maxDate'];
  disabledDates?: CalendarProps['disabledDates'];
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  locale?: string;
}

function mergeDateAndTime(date: Date, time: TimeValue): Date {
  const result = new Date(date);
  result.setHours(time.h, time.m, 0, 0);
  return result;
}

function getTimeValue(date: Date | null | undefined): TimeValue | null {
  if (!date) return null;
  return { h: date.getHours(), m: date.getMinutes() };
}

export function DateTimeField({
  id,
  label,
  labelHidden = true,
  value,
  onChange,
  placeholder,
  timeStep,
  minDate,
  maxDate,
  disabledDates,
  size = 'md',
  disabled,
  readOnly,
  error = false,
  errorMessage,
  helperText,
  locale = 'es-ES',
}: DateTimeFieldProps) {
  const dateId = `${id}-date`;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  const handleDateChange = useCallback(
    (date: Date) => {
      const time = getTimeValue(value) ?? { h: 0, m: 0 };
      onChange?.(mergeDateAndTime(date, time));
    },
    [value, onChange]
  );

  const handleTimeChange = useCallback(
    (time: TimeValue) => {
      if (!value) return;
      onChange?.(mergeDateAndTime(value, time));
    },
    [value, onChange]
  );

  const cls = ['date-time-field', error ? 'date-time-field--error' : ''].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      <Label htmlFor={dateId} hidden={labelHidden}>{label}</Label>
      <div className="date-time-field__controls">
        <DatePicker
          id={dateId}
          value={value ?? null}
          onChange={handleDateChange}
          placeholder={placeholder}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          error={error}
          locale={locale}
        />
        <TimeSelect
          value={getTimeValue(value)}
          onChange={handleTimeChange}
          step={timeStep}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          error={error}
        />
      </div>
      {errorMessage && (
        <span id={errorId} className="date-time-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="date-time-field__helper">{helperText}</span>
      )}
    </div>
  );
}
