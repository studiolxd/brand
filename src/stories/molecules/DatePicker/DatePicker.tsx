import { useState, useCallback } from 'react';
import { Popover } from '../../atoms/Popover/Popover';
import { Calendar } from '../Calendar/Calendar';
import type { CalendarProps } from '../Calendar/Calendar';
import './DatePicker.css';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  placeholder?: string;
  minDate?: CalendarProps['minDate'];
  maxDate?: CalendarProps['maxDate'];
  disabledDates?: CalendarProps['disabledDates'];
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: boolean;
  locale?: string;
  /** id aplicado al botón trigger */
  id?: string;
  /** aria-describedby para el trigger */
  describedBy?: string;
}

function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Seleccionar fecha…',
  minDate,
  maxDate,
  disabledDates,
  size = 'md',
  disabled,
  error = false,
  locale = 'es-ES',
  id,
  describedBy,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (date: Date) => {
      onChange?.(date);
      setOpen(false);
    },
    [onChange]
  );

  const displayValue = value instanceof Date ? formatDate(value, locale) : null;

  const triggerCls = [
    'date-picker__trigger',
    size !== 'md' ? `date-picker__trigger--${size}` : '',
    error ? 'date-picker__trigger--error' : '',
    !displayValue ? 'date-picker__trigger--placeholder' : '',
  ].filter(Boolean).join(' ');

  const trigger = (
    <button
      id={id}
      type="button"
      className={triggerCls}
      disabled={disabled}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-describedby={describedBy}
    >
      {displayValue ?? placeholder}
    </button>
  );

  return (
    <Popover
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      side="bottom"
      align="start"
      sideOffset={-1}
      className="date-picker__popover"
    >
      <Calendar
        value={value ?? null}
        onChange={handleSelect}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        locale={locale}
        size={size}
      />
    </Popover>
  );
}
