import './TextareaField.css';
import { Label } from '../../atoms/Label/Label';
import { Textarea } from '../../atoms/Textarea/Textarea';

interface TextareaFieldProps {
  id: string;
  label: string;
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
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
}

export function TextareaField({
  id,
  label,
  labelHidden = true,
  name,
  placeholder,
  value,
  defaultValue,
  rows,
  disabled,
  readOnly,
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

  return (
    <div className="textarea-field">
      <Label htmlFor={id} hidden={labelHidden}>{label}</Label>
      <Textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        error={error}
        describedBy={describedBy}
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
