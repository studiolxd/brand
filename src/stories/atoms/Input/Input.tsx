import './Input.css';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  dark?: boolean;
  id?: string;
  name?: string;
  describedBy?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function Input({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  disabled,
  readOnly,
  error = false,
  dark = false,
  id,
  name,
  describedBy,
  onChange,
  onBlur,
  onFocus,
}: InputProps) {
  return (
    <input
      className={['input', error ? 'input--error' : '', dark ? 'input--dark' : ''].filter(Boolean).join(' ')}
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
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}
