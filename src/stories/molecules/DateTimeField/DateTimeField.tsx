import { forwardRef, useCallback, useId } from 'react';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { Label } from '../../atoms/Label/Label';
import { DatePicker } from '../DatePicker/DatePicker';
import type { DatePickerProps } from '../DatePicker/DatePicker';
import { TimeSelect } from '../../atoms/TimeSelect/TimeSelect';
import type { TimeValue } from '../../atoms/TimeSelect/TimeSelect';
import type { CalendarProps } from '../Calendar/Calendar';
import './DateTimeField.css';
import { ErrorText } from '../../atoms/ErrorText/ErrorText';

export interface DateTimeFieldProps {
  /** `id` del campo. Si no se pasa, se genera con `useId`. */
  id?: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
   * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
   * es la primera de la lista, la etiqueta se oculta sola.
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
  /** Nombre accesible del panel del calendario. Default: la etiqueta del campo. */
  calendarLabel?: DatePickerProps['calendarLabel'];
  /** Nombre accesible del botón que abre el calendario. Default castellano. */
  openCalendarLabel?: DatePickerProps['openCalendarLabel'];
  /** Mensaje de fecha incompleta del campo de texto. Default castellano. */
  invalidMessage?: DatePickerProps['invalidMessage'];
  /** Letras de la máscara del marcador de posición. Default castellano. */
  maskLetters?: DatePickerProps['maskLetters'];
  /** aria-label del botón de mes anterior del calendario. Default castellano. */
  previousMonthLabel?: DatePickerProps['previousMonthLabel'];
  /** aria-label del botón de mes siguiente. Default castellano. */
  nextMonthLabel?: DatePickerProps['nextMonthLabel'];
  /** aria-label del botón de retroceso en la vista de años. Default castellano. */
  previousYearsLabel?: DatePickerProps['previousYearsLabel'];
  /** aria-label del botón de avance en la vista de años. Default castellano. */
  nextYearsLabel?: DatePickerProps['nextYearsLabel'];
  /** aria-label de la rejilla de años. Default castellano. */
  yearGridLabel?: DatePickerProps['yearGridLabel'];
  /** aria-label de la rejilla de días. Default: `calendarLabel`. */
  gridLabel?: DatePickerProps['gridLabel'];
  /** aria-label del desplegable de horas. Default: "Horas" (castellano). */
  hoursLabel?: string;
  /** aria-label del desplegable de minutos. Default: "Minutos" (castellano). */
  minutesLabel?: string;
  onChange?: (date: Date | null) => void;
  /** Se llama al salir de cualquiera de los dos controles: el campo de fecha (un `<input>`) o los desplegables de hora (dos `<button>`). */
  onBlur?: React.FocusEventHandler<HTMLElement>;
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
 * comparten valor. El `ref` va al campo de la fecha, que es el primero que se
 * enfoca; el `className`, al contenedor.
 */
export const DateTimeField = forwardRef<HTMLInputElement, DateTimeFieldProps>(function DateTimeField({
  id: idProp,
  label,
  labelHidden: labelHiddenProp,
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
  calendarLabel,
  openCalendarLabel,
  invalidMessage,
  maskLetters,
  previousMonthLabel,
  nextMonthLabel,
  previousYearsLabel,
  nextYearsLabel,
  yearGridLabel,
  gridLabel,
  hoursLabel,
  minutesLabel,
  onChange,
  onBlur,
}: DateTimeFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
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
    (date: Date | null) => {
      // Borrar la fecha borra el momento entero: una hora sin día no es nada.
      if (!date) {
        onChange?.(null);
        return;
      }
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
      >
        <DatePicker
          ref={ref}
          className="date-time-field__date"
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
          calendarLabel={calendarLabel ?? label}
          openCalendarLabel={openCalendarLabel}
          invalidMessage={invalidMessage}
          maskLetters={maskLetters}
          previousMonthLabel={previousMonthLabel}
          nextMonthLabel={nextMonthLabel}
          previousYearsLabel={previousYearsLabel}
          nextYearsLabel={nextYearsLabel}
          yearGridLabel={yearGridLabel}
          gridLabel={gridLabel}
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
        <ErrorText id={errorId}>{errorMessage}</ErrorText>
      )}
      {helperText && (
        <span id={helperId} className="date-time-field__helper">{helperText}</span>
      )}
    </div>
  );
});
