import './RadioField.css';
import { Radio } from '../../atoms/Radio/Radio';

interface RadioFieldProps {
  label: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function RadioField({
  label,
  checked,
  defaultChecked,
  disabled,
  size = 'md',
  id,
  name,
  value,
  onChange,
}: RadioFieldProps) {
  return (
    <label
      className={[
        'radio-field',
        size !== 'md' ? `radio-field--${size}` : '',
        disabled ? 'radio-field--disabled' : '',
      ].filter(Boolean).join(' ')}
    >
      <Radio
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        size={size}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className="radio-field__label">{label}</span>
    </label>
  );
}
