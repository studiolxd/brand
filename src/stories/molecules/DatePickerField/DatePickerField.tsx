import { forwardRef, useId } from 'react';
import { useFormSize } from '../../constants/form-size';
import { Label } from '../../atoms/Label/Label';
import { DatePicker } from '../DatePicker/DatePicker';
import type { DatePickerProps } from '../DatePicker/DatePicker';
import './DatePickerField.css';

export interface DatePickerFieldProps
  extends Omit<DatePickerProps, 'id' | 'describedBy' | 'aria-describedby' | 'aria-label'> {
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
   */
  labelHidden?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * El `DatePicker` como campo de formulario. El `ref` va al **disparador**,
 * para que react-hook-form pueda enfocarlo al fallar la validación; el
 * `className`, al contenedor.
 */
export const DatePickerField = forwardRef<HTMLButtonElement, DatePickerFieldProps>(function DatePickerField({
  id: idProp,
  label,
  labelHidden = false,
  errorMessage,
  helperText,
  error = false,
  size: sizeProp,
  className,
  ...pickerProps
}: DatePickerFieldProps, ref) {
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en el resto de campos
  const hasError = error || !!errorMessage;

  return (
    <div className={['date-picker-field', className].filter(Boolean).join(' ')}>
      <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <DatePicker
        calendarLabel={label}
        {...pickerProps}
        ref={ref}
        id={id}
        size={size}
        error={hasError}
        aria-describedby={describedBy}
      />
      {errorMessage && (
        <span id={errorId} className="date-picker-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="date-picker-field__helper">{helperText}</span>
      )}
    </div>
  );
});
