'use client';

import { forwardRef } from 'react';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { FieldShell, useFieldShell, type FieldOptionalProps } from '../_shared/FieldShell';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import type { ColorPickerProps } from '../ColorPicker/ColorPicker';
import './ColorPickerField.css';

export interface ColorPickerFieldProps
  extends Omit<ColorPickerProps, 'id' | 'aria-describedby' | 'aria-label' | 'aria-labelledby'>, FieldOptionalProps {
  /** `id` del disparador. Si no se pasa, se genera con `useId`. */
  id?: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`. Sin valor, lo decide quien lo envuelva: dentro de un
   * `FieldRow` que no es la primera de la lista, la etiqueta se oculta sola.
   */
  labelHidden?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el disparador en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  /**
   * Campo obligatorio. El disparador es un botón, que no admite
   * `aria-required`: lo obligatorio lo lleva el **grupo** que envuelve el
   * campo (`role="group"`, nombrado por la etiqueta, con `aria-required`), y
   * el `<form>` no se envía sin color (`required` en el campo que sincroniza
   * el hex).
   */
  required?: boolean;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * El `ColorPicker` como campo de formulario: etiqueta, disparador, ayuda y
 * error. La etiqueta nombra el disparador y el panel; el `ref` va al
 * **disparador**, para que react-hook-form pueda enfocarlo al fallar la
 * validación; el `className`, al contenedor.
 */
export const ColorPickerField = forwardRef<HTMLButtonElement, ColorPickerFieldProps>(function ColorPickerField({
  id: idProp,
  label,
  optional,
  optionalLabel,
  labelHidden: labelHiddenProp,
  errorMessage,
  helperText,
  error = false,
  size: sizeProp,
  required = false,
  className,
  ...pickerProps
}: ColorPickerFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText });
  const { id, labelId } = field;

  return (
    <FieldShell
      field={field}
      block="color-picker-field"
      className={className}
      label={label}
      optional={optional}
      optionalLabel={optionalLabel}
      labelHidden={labelHidden}
      size={size}
      labelIdentified
      rootProps={required ? { role: 'group', 'aria-labelledby': labelId, 'aria-required': true } : undefined}
    >
      <ColorPicker
        dialogLabel={label}
        {...pickerProps}
        ref={ref}
        id={id}
        size={size}
        required={required}
        error={field.hasError}
        aria-labelledby={labelId}
        aria-describedby={field.describedBy}
      />
    </FieldShell>
  );
});
