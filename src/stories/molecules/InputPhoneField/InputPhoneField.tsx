import { forwardRef } from 'react';
import { InputPhone } from '../../atoms/InputPhone/InputPhone';
import { useFormSize } from '../../constants/form-size';
import { useFieldOptional } from '../../constants/field-optional';
import { useLabelHidden } from '../../constants/field-labels';
import { FieldShell, useFieldShell, type FieldOptionalProps } from '../_shared/FieldShell';
import type { Country } from 'react-phone-number-input';
import './InputPhoneField.css';

export interface InputPhoneFieldProps extends FieldOptionalProps {
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
  value?: string;
  defaultCountry?: Country;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  autoComplete?: string;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
  /** aria-label del selector de país. Default: "País" (castellano). */
  countryLabel?: string;
  /** Lo que enseña el selector sin país elegido. Default: "🌐". */
  internationalLabel?: string;
  /** Recibe el número en formato E.164, no el evento. */
  onChange?: (value: string | undefined) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * El `InputPhone` como campo de formulario. El `ref` va al `<input>` del
 * número (react-hook-form lo registra y lo enfoca al fallar la validación);
 * el `className`, al contenedor.
 */
export const InputPhoneField = forwardRef<HTMLInputElement, InputPhoneFieldProps>(function InputPhoneField({
  id: idProp,
  label,
  optional,
  optionalLabel,
  labelHidden: labelHiddenProp,
  value,
  defaultCountry,
  placeholder,
  disabled,
  readOnly,
  required,
  name,
  autoComplete,
  error = false,
  errorMessage,
  helperText,
  size: sizeProp,
  className,
  countryLabel,
  internationalLabel,
  onChange,
  onBlur,
  onFocus,
}: InputPhoneFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const showOptional = useFieldOptional(optional, required);
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText });
  const { id } = field;

  return (
    <FieldShell field={field} block="input-phone-field" className={className} label={label} optional={showOptional} optionalLabel={optionalLabel} labelHidden={labelHidden} size={size}>
      <InputPhone
        ref={ref}
        id={id}
        name={name}
        value={value}
        defaultCountry={defaultCountry}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        autoComplete={autoComplete}
        countryLabel={countryLabel}
        internationalLabel={internationalLabel}
        error={field.hasError}
        size={size}
        aria-describedby={field.describedBy}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </FieldShell>
  );
});
