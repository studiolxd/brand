import { forwardRef } from 'react';
import { useFormSize } from '../../constants/form-size';
import { useFieldOptional } from '../../constants/field-optional';
import { useLabelHidden } from '../../constants/field-labels';
import { FieldShell, useFieldShell, type FieldOptionalProps } from '../_shared/FieldShell';
import { DatePicker } from '../DatePicker/DatePicker';
import type { DatePickerProps } from '../DatePicker/DatePicker';
import './DatePickerField.css';

export interface DatePickerFieldProps
  extends Omit<DatePickerProps, 'id' | 'describedBy' | 'aria-describedby' | 'aria-label'>, FieldOptionalProps {
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
   * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
   * es la primera de la lista, la etiqueta se oculta sola.
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
 * El `DatePicker` como campo de formulario. El `ref` va al **campo de texto**,
 * para que react-hook-form pueda enfocarlo al fallar la validación; el
 * `className`, al contenedor.
 */
export const DatePickerField = forwardRef<HTMLInputElement, DatePickerFieldProps>(function DatePickerField({
  id: idProp,
  label,
  optional,
  optionalLabel,
  labelHidden: labelHiddenProp,
  errorMessage,
  helperText,
  error = false,
  size: sizeProp,
  className,
  ...pickerProps
}: DatePickerFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const showOptional = useFieldOptional(optional, pickerProps.required);
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText });
  const { id } = field;

  return (
    <FieldShell field={field} block="date-picker-field" className={className} label={label} optional={showOptional} optionalLabel={optionalLabel} labelHidden={labelHidden} size={size}>
      <DatePicker
        calendarLabel={label}
        {...pickerProps}
        ref={ref}
        id={id}
        size={size}
        error={field.hasError}
        aria-describedby={field.describedBy}
      />
    </FieldShell>
  );
});
