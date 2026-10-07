import { forwardRef, useCallback } from 'react';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { FieldShell, useFieldShell, type FieldOptionalProps } from '../_shared/FieldShell';
import { DatePicker } from '../DatePicker/DatePicker';
import type { DatePickerProps } from '../DatePicker/DatePicker';
import { TimeSelect } from '../../atoms/TimeSelect/TimeSelect';
import type { TimeValue } from '../../atoms/TimeSelect/TimeSelect';
import type { CalendarProps } from '../Calendar/Calendar';
import './DateTimeField.css';

export interface DateTimeFieldProps extends FieldOptionalProps {
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
  /**
   * Campo obligatorio: `required` nativo en el campo de la fecha y, en la
   * hora, el de sus desplegables (con `aria-required` en su grupo), como
   * `TimeField`.
   */
  required?: boolean;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  locale?: string;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
  /* Todo lo de aquí abajo es **reenvío puro**, y ninguno trae default: sin la
     prop, cada texto sale del espacio de quien lo pinta —`datePicker`,
     `calendar` o `timeSelect`— del `BrandMessagesProvider`, que llega por
     contexto sin enhebrarlo desde fuera. La prop es la anulación de ESTE uso. */
  /** Nombre accesible del panel del calendario. Sin él, la etiqueta del campo. */
  calendarLabel?: DatePickerProps['calendarLabel'];
  /** Nombre accesible del botón que abre el calendario. Sin él, `datePicker.openCalendar`. */
  openCalendarLabel?: DatePickerProps['openCalendarLabel'];
  /** Mensaje de fecha incompleta del campo de texto. Sin él, `datePicker.invalid`. */
  invalidMessage?: DatePickerProps['invalidMessage'];
  /** Letras de la máscara del marcador de posición. Sin ellas, `datePicker.maskLetters`. */
  maskLetters?: DatePickerProps['maskLetters'];
  /** aria-label del botón de mes anterior. Sin él, `calendar.previousMonth`. */
  previousMonthLabel?: DatePickerProps['previousMonthLabel'];
  /** aria-label del botón de mes siguiente. Sin él, `calendar.nextMonth`. */
  nextMonthLabel?: DatePickerProps['nextMonthLabel'];
  /** aria-label del retroceso en la vista de años. Sin él, `calendar.previousYears`. */
  previousYearsLabel?: DatePickerProps['previousYearsLabel'];
  /** aria-label del avance en la vista de años. Sin él, `calendar.nextYears`. */
  nextYearsLabel?: DatePickerProps['nextYearsLabel'];
  /** aria-label de la rejilla de años. Sin él, `calendar.yearGrid`. */
  yearGridLabel?: DatePickerProps['yearGridLabel'];
  /** aria-label de la rejilla de días. Sin él, el nombre del panel. */
  gridLabel?: DatePickerProps['gridLabel'];
  /** El «hoy» del calendario. Default: la fecha actual. En SSR conviene pasarla (ver `Calendar`). */
  today?: DatePickerProps['today'];
  /** aria-label del desplegable de horas. Sin él, `timeSelect.hours`. */
  hoursLabel?: string;
  /** aria-label del desplegable de minutos. Sin él, `timeSelect.minutes`. */
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
  optional,
  optionalLabel,
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
  required,
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
  today,
  hoursLabel,
  minutesLabel,
  onChange,
  onBlur,
}: DateTimeFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText });
  const { id } = field;
  const dateId = `${id}-date`;

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
    <FieldShell field={field} block="date-time-field" className={className} label={label} optional={optional} optionalLabel={optionalLabel} labelHidden={labelHidden} size={size} labelIdentified labelFor={dateId}>
      <div
        className="date-time-field__controls"
        role="group"
        aria-labelledby={field.labelId}
        aria-describedby={field.describedBy}
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
          required={required}
          error={field.hasError}
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
          today={today}
        />
        <TimeSelect
          value={getTimeValue(value)}
          onChange={handleTimeChange}
          onBlur={onBlur}
          step={timeStep}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          error={field.hasError}
          hoursLabel={hoursLabel}
          minutesLabel={minutesLabel}
        />
      </div>
    </FieldShell>
  );
});
