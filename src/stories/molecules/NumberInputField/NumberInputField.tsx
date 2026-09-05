import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react';
import './NumberInputField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { Label } from '../../atoms/Label/Label';
import { NumberInput } from '../../atoms/NumberInput/NumberInput';

export interface NumberInputFieldProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
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
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  /** Admite decimales (coma o punto). */
  decimal?: boolean;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Recibe el valor ya normalizado, no el evento. */
  onChange?: (value: number) => void;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * El `NumberInput` como campo de formulario. El `ref` y el resto de props
 * nativas de `<input>` van al input real (react-hook-form, `name`, `onBlur`,
 * `aria-*`, `data-*`…); el `className`, al contenedor.
 */
export const NumberInputField = forwardRef<HTMLInputElement, NumberInputFieldProps>(function NumberInputField({
  id: idProp,
  label,
  labelHidden: labelHiddenProp,
  value,
  defaultValue,
  min,
  max,
  step = 1,
  decimal,
  disabled,
  readOnly,
  size: sizeProp,
  error = false,
  errorMessage,
  helperText,
  className,
  onChange,
  ...rest
}: NumberInputFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en el resto de campos
  const hasError = error || !!errorMessage;

  return (
    <div className={['number-input-field', className].filter(Boolean).join(' ')}>
      <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <NumberInput
        ref={ref}
        {...rest}
        id={id}
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        decimal={decimal}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        error={hasError}
        aria-describedby={describedBy}
        onChange={onChange}
      />
      {errorMessage && (
        <span id={errorId} className="number-input-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="number-input-field__helper">{helperText}</span>
      )}
    </div>
  );
});
