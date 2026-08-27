import { forwardRef, useCallback, useId } from 'react';
import { useFormSize } from '../../constants/form-size';
import { Label } from '../../atoms/Label/Label';
import { DatePicker } from '../DatePicker/DatePicker';
import { TimeSelect } from '../../atoms/TimeSelect/TimeSelect';
import type { TimeValue } from '../../atoms/TimeSelect/TimeSelect';
import type { CalendarProps } from '../Calendar/Calendar';
import './DateTimeField.css';

export interface DateTimeFieldProps {
  /** `id` del campo. Si no se pasa, se genera con `useId`. */
  id?: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
   */
  labelHidden?: boolean;
  value?: Date | null;
  placeholder?: string;
  /** Paso en minutos del selector de hora. */
  timeStep?: number;
  minDate?: CalendarProps['minDate'];
  maxDate?: CalendarProps['maxDate'];
  disabledDates?: CalendarProps['disabledDates'];
  /** Nombre del campo en el formulario: se monta un input oculto con la fecha en ISO. */
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  locale?: string;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
  /** aria-label del desplegable de horas. Default: "Horas" (castellano). */
  hoursLabel?: string;
  /** aria-label del desplegable de minutos. Default: "Minutos" (castellano). */
  minutesLabel?: string;
  onChange?: (date: Date | null) => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
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

/**
 * Fecha y hora en un solo campo: un `DatePicker` y un `TimeSelect` que
 * comparten valor. El `ref` va al disparador de la fecha, que es el primero
 * que se enfoca; el `className`, al contenedor.
 */
export const DateTimeField = forwardRef<HTMLButtonElement, DateTimeFieldProps>(function DateTimeField({
  id: idProp,
  label,
  labelHidden = false,
  value,
  placeholder,
  timeStep,
  minDate,
  maxDate,
  disabledDates,
  name,
  size: sizeProp,
  disabled,
  readOnly,
  error = false,
  errorMessage,
  helperText,
  locale = 'es-ES',
  className,
  hoursLabel,
  minutesLabel,
  onChange,
  onBlur,
}: DateTimeFieldProps, ref) {
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const dateId = `${id}-date`;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en el resto de campos
  const hasError = error || !!errorMessage;

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

  return (
    <div className={['date-time-field', className].filter(Boolean).join(' ')}>
      <Label id={`${id}-label`} htmlFor={dateId} hidden={labelHidden} size={size}>{label}</Label>
      <div
        className="date-time-field__controls"
        role="group"
        aria-labelledby={`${id}-label`}
        aria-describedby={describedBy}
        aria-invalid={hasError || undefined}
      >
        <DatePicker
          ref={ref}
          id={dateId}
          name={name}
          value={value ?? null}
          onChange={handleDateChange}
          onBlur={onBlur}
          placeholder={placeholder}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          error={hasError}
          locale={locale}
        />
        <TimeSelect
          value={getTimeValue(value)}
          onChange={handleTimeChange}
          onBlur={onBlur}
          step={timeStep}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          error={hasError}
          hoursLabel={hoursLabel}
          minutesLabel={minutesLabel}
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
});
