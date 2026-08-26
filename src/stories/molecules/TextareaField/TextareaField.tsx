import './TextareaField.css';
import { Label } from '../../atoms/Label/Label';
import { Textarea } from '../../atoms/Textarea/Textarea';

export interface TextareaFieldProps {
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

export function TextareaField({
  id,
  label,
  labelHidden = false,
  name,
  placeholder,
  value,
  defaultValue,
  rows,
  disabled,
  readOnly,
  size = 'md',
  error = false,
  errorMessage,
  helperText,
  onChange,
  onBlur,
  onFocus,
}: TextareaFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en SelectField
  const hasError = error || !!errorMessage;

  return (
    <div className="textarea-field">
      <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <Textarea
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
}
