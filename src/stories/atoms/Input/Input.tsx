import './Input.css';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  id?: string;
  name?: string;
  describedBy?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  pattern?: string;
  maxLength?: number;
  autoComplete?: string;
  ariaLabel?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
}

export function Input({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  disabled,
  readOnly,
  size = 'md',
  error = false,
  id,
  name,
  describedBy,
  inputMode,
  pattern,
  maxLength,
  autoComplete,
  ariaLabel,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onPaste,
}: InputProps) {
  return (
    <input
      className={['input', size !== 'md' ? `input--${size}` : '', error ? 'input--error' : ''].filter(Boolean).join(' ')}
      type={type}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      id={id}
      name={name}
      aria-invalid={error || undefined}
      aria-describedby={describedBy}
      aria-label={ariaLabel}
      inputMode={inputMode}
      pattern={pattern}
      maxLength={maxLength}
      autoComplete={autoComplete}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
    />
  );
}
