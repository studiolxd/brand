import { forwardRef, useState, useCallback } from 'react';
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
  readOnly?: boolean;
  error?: boolean;
  locale?: string;
  /** id aplicado al botón trigger */
  id?: string;
  /** @deprecated Usa el atributo nativo `aria-describedby`. */
  describedBy?: string;
  /** Ids de ayuda/error que describen el control (lo pone el campo). */
  'aria-describedby'?: string;
  /** Nombre accesible cuando el control va suelto. En un campo lo nombra la etiqueta. */
  'aria-label'?: string;
  /** Nombre accesible del panel del calendario (`role="dialog"`). */
  calendarLabel?: string;
  /** Nombre del campo en el formulario: se monta un input oculto con la fecha en ISO. */
  name?: string;
  /** Se llama al salir del disparador (react-hook-form lo usa para validar). */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
}

function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Selector de fecha. El `ref` va al **disparador**, para que react-hook-form
 * pueda enfocarlo al fallar la validación.
 */
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker({
  value,
  onChange,
  placeholder = 'Seleccionar fecha…',
  minDate,
  maxDate,
  disabledDates,
  size = 'md',
  disabled,
  readOnly,
  error = false,
  locale = 'es-ES',
  id,
  name,
  describedBy,
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  calendarLabel = 'Calendario',
  onBlur,
  className,
}: DatePickerProps, ref) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (readOnly && nextOpen) return;
      setOpen(nextOpen);
    },
    [readOnly]
  );

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
    className ?? '',
  ].filter(Boolean).join(' ');

  const trigger = (
    <button
      ref={ref}
      id={id}
      type="button"
      className={triggerCls}
      disabled={disabled}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-readonly={readOnly || undefined}
      aria-invalid={error || undefined}
      aria-label={ariaLabel}
      aria-describedby={describedBy ?? ariaDescribedBy}
      onBlur={onBlur}
    >
      {displayValue ?? placeholder}
    </button>
  );

  return (
    <>
      {/* Lo que se envía con el formulario: la fecha en ISO (yyyy-mm-dd).
          Va fuera del disparador: un `<button>` no puede contener un input. */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value instanceof Date ? value.toISOString().slice(0, 10) : ''}
        />
      )}
    <Popover
      trigger={trigger}
      label={calendarLabel}
      open={open}
      onOpenChange={handleOpenChange}
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
    </>
  );
});
