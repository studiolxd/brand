import './Checkbox.css';

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  dark?: boolean;
  id?: string;
  name?: string;
  value?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Checkbox({
  checked,
  defaultChecked,
  disabled,
  dark = false,
  id,
  name,
  value,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  onChange,
}: CheckboxProps) {
  return (
    <input
      className={['checkbox', dark ? 'checkbox--dark' : ''].filter(Boolean).join(' ')}
      type="checkbox"
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      id={id}
      name={name}
      value={value}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      onChange={onChange}
    />
  );
}
