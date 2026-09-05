import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import './TextareaField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { Label } from '../../atoms/Label/Label';
import { Textarea } from '../../atoms/Textarea/Textarea';

export interface TextareaFieldProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'value' | 'defaultValue' | 'rows'> {
  id: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve, como en `SelectField`.
   * Con la etiqueta oculta y sin `placeholder`, el control usa el texto de la
   * etiqueta como placeholder para no quedarse sin pista visible.
   * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
   * es la primera de la lista, la etiqueta se oculta sola.
   */
  labelHidden?: boolean;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  rows?: number;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
}

/**
 * El `ref` y el resto de props nativas de `<textarea>` van al `<textarea>`
 * interno (react-hook-form `register()`, `aria-*`, `data-*`…); el `className`,
 * al contenedor.
 */
export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(function TextareaField({
  id,
  label,
  labelHidden: labelHiddenProp,
  name,
  placeholder,
  value,
  defaultValue,
  rows,
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
}: TextareaFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en SelectField
  const hasError = error || !!errorMessage;

  return (
    <div className={['textarea-field', className].filter(Boolean).join(' ')}>
      <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <Textarea
        ref={ref}
        {...rest}
        id={id}
        name={name}
        placeholder={placeholder ?? (labelHidden ? label : undefined)}
        value={value}
        defaultValue={defaultValue}
        rows={rows}
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
        <span id={errorId} className="textarea-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="textarea-field__helper">{helperText}</span>
      )}
    </div>
  );
});
