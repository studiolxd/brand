import { forwardRef, useId } from 'react';
import './OtpField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { Label } from '../../atoms/Label/Label';
import { OtpInput } from '../../atoms/OtpInput/OtpInput';

export interface OtpFieldProps {
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
  /** Número de celdas. */
  length: number;
  value?: string;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
  /** Etiqueta accesible de cada celda. Default: `Dígito N de M` (castellano). */
  digitLabel?: (index: number, length: number) => string;
  /** Recibe el código completo, no el evento. */
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * El `OtpInput` como campo de formulario. El `ref` va a la primera celda, que
 * es la que react-hook-form enfoca al fallar la validación; el `className`, al
 * contenedor.
 */
export const OtpField = forwardRef<HTMLInputElement, OtpFieldProps>(function OtpField({
  id: idProp,
  label,
  labelHidden: labelHiddenProp,
  length,
  value,
  defaultValue,
  name,
  disabled,
  readOnly,
  error = false,
  errorMessage,
  helperText,
  size: sizeProp,
  className,
  digitLabel,
  onChange,
  onComplete,
  onBlur,
}: OtpFieldProps, ref) {
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
    <div className={['otp-field', className].filter(Boolean).join(' ')}>
      {/* La etiqueta nombra la primera celda (donde entra el foco) y, por
          aria-labelledby, el grupo: un solo nombre, no dos. */}
      <Label id={`${id}-label`} htmlFor={`${id}-0`} hidden={labelHidden} size={size}>{label}</Label>
      <OtpInput
        ref={ref}
        id={id}
        name={name}
        length={length}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        error={hasError}
        size={size}
        digitLabel={digitLabel}
        aria-labelledby={`${id}-label`}
        aria-describedby={describedBy}
        onChange={onChange}
        onComplete={onComplete}
        onBlur={onBlur}
      />
      {errorMessage && (
        <span id={errorId} className="otp-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="otp-field__helper">{helperText}</span>
      )}
    </div>
  );
});
