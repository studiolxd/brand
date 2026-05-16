import './Radio.css';

interface RadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Radio({
  checked,
  defaultChecked,
  disabled,
  size = 'md',
  id,
  name,
  value,
  required,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  onChange,
}: RadioProps) {
  const className = ['radio', size !== 'md' ? `radio--${size}` : ''].filter(Boolean).join(' ');

  return (
    <input
      type="radio"
      className={className}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      id={id}
      name={name}
      value={value}
      required={required}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      onChange={onChange}
    />
  );
}
