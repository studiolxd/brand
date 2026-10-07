'use client';

import { forwardRef } from 'react';
import { useFormSize } from '../../constants/form-size';
import { useFieldOptional } from '../../constants/field-optional';
import { useLabelHidden } from '../../constants/field-labels';
import {
  FieldRequiredText,
  FieldShell,
  joinIds,
  requiredTextId,
  useFieldShell,
  type FieldOptionalProps,
  type FieldRequiredProps,
} from '../_shared/FieldShell';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import type { ColorPickerProps } from '../ColorPicker/ColorPicker';
import './ColorPickerField.css';

export interface ColorPickerFieldProps
  extends Omit<ColorPickerProps, 'id' | 'aria-describedby' | 'aria-label' | 'aria-labelledby'>, FieldOptionalProps, FieldRequiredProps {
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
   * `aria-required` (D73): lo obligatorio va en su **descripción**, un texto
   * oculto «obligatorio» (`requiredLabel`, o `field.required` del catálogo)
   * enlazado por `aria-describedby` detrás de la ayuda y el error. El `<form>`
   * no se envía sin color (`required` en el campo que sincroniza el hex).
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
  requiredLabel,
  className,
  ...pickerProps
}: ColorPickerFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const showOptional = useFieldOptional(optional, required);
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText });
  const { id, labelId } = field;
  const requiredId = required ? requiredTextId(id) : undefined;

  return (
    <FieldShell
      field={field}
      block="color-picker-field"
      className={className}
      label={label}
      optional={showOptional}
      optionalLabel={optionalLabel}
      labelHidden={labelHidden}
      size={size}
      labelIdentified
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
        aria-describedby={joinIds(field.describedBy, requiredId)}
      />
      {requiredId && <FieldRequiredText id={requiredId} label={requiredLabel} />}
    </FieldShell>
  );
});
