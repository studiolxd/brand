import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import './InputField.css';
import { useFormSize } from '../../constants/form-size';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';

export interface InputFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'value' | 'defaultValue'> {
  id: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve, como en `SelectField`.
   * Con la etiqueta oculta y sin `placeholder`, el control usa el texto de la
   * etiqueta como placeholder para no quedarse sin pista visible.
   */
  labelHidden?: boolean;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * El `ref` y el resto de props nativas de `<input>` van al `<input>` interno
 * (react-hook-form `register()`, `autoComplete`, `aria-*`, `data-*`…); el
 * `className` va al contenedor.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField({
  id,
  label,
  labelHidden = false,
  name,
  type,
  placeholder,
  value,
  defaultValue,
  disabled,
  readOnly,
  size: sizeProp,
  error = false,
  errorMessage,
  helperText,
  onChange,
  onBlur,
  onFocus,
  className,
  ...rest
}: InputFieldProps, ref) {
  const size = useFormSize(sizeProp);
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en SelectField
  const hasError = error || !!errorMessage;

  return (
    <div className={['input-field', className].filter(Boolean).join(' ')}>
      <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <Input
        ref={ref}
        {...rest}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder ?? (labelHidden ? label : undefined)}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        error={hasError}
        aria-describedby={describedBy}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {errorMessage && (
        <span id={errorId} className="input-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="input-field__helper">{helperText}</span>
      )}
    </div>
  );
});
