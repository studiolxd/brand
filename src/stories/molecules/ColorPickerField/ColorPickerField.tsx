'use client';

import { forwardRef, useId } from 'react';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { Label } from '../../atoms/Label/Label';
import { ErrorText } from '../../atoms/ErrorText/ErrorText';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import type { ColorPickerProps } from '../ColorPicker/ColorPicker';
import './ColorPickerField.css';

export interface ColorPickerFieldProps
  extends Omit<ColorPickerProps, 'id' | 'aria-describedby' | 'aria-label' | 'aria-labelledby'> {
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
  labelHidden: labelHiddenProp,
  errorMessage,
  helperText,
  error = false,
  size: sizeProp,
  className,
  ...pickerProps
}: ColorPickerFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const labelId = `${id}-label`;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en el resto de campos
  const hasError = error || !!errorMessage;

  return (
    <div className={['color-picker-field', className].filter(Boolean).join(' ')}>
      <Label id={labelId} htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <ColorPicker
        dialogLabel={label}
        {...pickerProps}
        ref={ref}
        id={id}
        size={size}
        error={hasError}
        aria-labelledby={labelId}
        aria-describedby={describedBy}
      />
      {errorMessage && (
        <ErrorText id={errorId}>{errorMessage}</ErrorText>
      )}
      {helperText && (
        <span id={helperId} className="color-picker-field__helper">{helperText}</span>
      )}
    </div>
  );
});
