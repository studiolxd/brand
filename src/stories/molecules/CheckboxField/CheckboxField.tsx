import './CheckboxField.css';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';

interface CheckboxFieldProps {
  label: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
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
  id,
  name,
  value,
  onChange,
}: CheckboxFieldProps) {
  return (
    <label
      className={[
        'checkbox-field',
        disabled ? 'checkbox-field--disabled' : '',
      ].filter(Boolean).join(' ')}
    >
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className="checkbox-field__label">{label}</span>
    </label>
  );
}
