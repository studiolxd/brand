import './Textarea.css';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  rows?: number;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  id?: string;
  name?: string;
  describedBy?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
}

export function Textarea({
  placeholder,
  value,
  defaultValue,
  rows,
  disabled,
  readOnly,
  error = false,
  id,
  name,
  describedBy,
  onChange,
  onBlur,
  onFocus,
}: TextareaProps) {
  return (
    <textarea
      className={['textarea', error ? 'textarea--error' : ''].filter(Boolean).join(' ')}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      rows={rows}
      disabled={disabled}
      readOnly={readOnly}
      id={id}
      name={name}
      aria-invalid={error || undefined}
      aria-describedby={describedBy}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}
