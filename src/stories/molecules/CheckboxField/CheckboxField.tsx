import './CheckboxField.css';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';

interface CheckboxFieldProps {
  label: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  dark?: boolean;
  id?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function CheckboxField({
  label,
  checked,
  defaultChecked,
  disabled,
  dark = false,
  id,
  name,
  value,
  onChange,
}: CheckboxFieldProps) {
  return (
    <label
      className={[
        'checkbox-field',
        dark ? 'checkbox-field--dark' : '',
        disabled ? 'checkbox-field--disabled' : '',
      ].filter(Boolean).join(' ')}
    >
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        dark={dark}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className="checkbox-field__label">{label}</span>
    </label>
  );
}
