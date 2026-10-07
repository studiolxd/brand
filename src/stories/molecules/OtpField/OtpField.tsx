import { forwardRef } from 'react';
import './OtpField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { FieldShell, useFieldShell, type FieldOptionalProps } from '../_shared/FieldShell';
import { OtpInput } from '../../atoms/OtpInput/OtpInput';

export interface OtpFieldProps extends FieldOptionalProps {
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
  /** Obligatorio: `required` nativo en cada celda (ver `OtpInput`). */
  required?: boolean;
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
  optional,
  optionalLabel,
  labelHidden: labelHiddenProp,
  length,
  value,
  defaultValue,
  name,
  disabled,
  readOnly,
  required,
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
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText });
  const { id } = field;

  return (
    <FieldShell field={field} block="otp-field" className={className} label={label} optional={optional} optionalLabel={optionalLabel} labelHidden={labelHidden} size={size} labelIdentified labelFor={`${id}-0`}>
      {/* La etiqueta nombra la primera celda (donde entra el foco) y, por
          aria-labelledby, el grupo: un solo nombre, no dos. */}
      <OtpInput
        ref={ref}
        id={id}
        name={name}
        length={length}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        error={field.hasError}
        size={size}
        digitLabel={digitLabel}
        aria-labelledby={field.labelId}
        aria-describedby={field.describedBy}
        onChange={onChange}
        onComplete={onComplete}
        onBlur={onBlur}
      />
    </FieldShell>
  );
});
