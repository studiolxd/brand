import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import './RadioField.css';
import { useFormSize } from '../../constants/form-size';
import { Radio } from '../../atoms/Radio/Radio';

export interface RadioFieldProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'id'> {
  /** Texto de la opción, a la derecha de la marca. Acepta JSX (un enlace, por ejemplo). */
  label: ReactNode;
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
  /** Talla del sistema. Sin ella, la del `Form` que lo envuelva; sin `Form`, `md`. */
  size?: 'sm' | 'md' | 'lg';
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * El `Radio` como campo: marca, texto de la opción, ayuda y error. El `ref` y
 * el resto de props nativas de `<input type="radio">` van al input real
 * (react-hook-form, `name`, `onBlur`, `aria-*`, `data-*`…); el `className`, al
 * contenedor.
 */
export const RadioField = forwardRef<HTMLInputElement, RadioFieldProps>(function RadioField({
  label,
  id: idProp,
  size: sizeProp,
  disabled,
  error = false,
  errorMessage,
  helperText,
  className,
  ...rest
}: RadioFieldProps, ref) {
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en el resto de campos
  const hasError = error || !!errorMessage;

  return (
    <div
      className={[
        'radio-field',
        size !== 'md' ? `radio-field--${size}` : '',
        disabled ? 'radio-field--disabled' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <label className="radio-field__control" htmlFor={id}>
        <Radio
          ref={ref}
          {...rest}
          id={id}
          size={size}
          disabled={disabled}
          error={hasError}
          aria-describedby={describedBy}
        />
        <span className="radio-field__label">{label}</span>
      </label>
      {errorMessage && (
        <span id={errorId} className="radio-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="radio-field__helper">{helperText}</span>
      )}
    </div>
  );
});
