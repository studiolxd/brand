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
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}

export function CheckboxField({
  label,
  checked,
  defaultChecked,
  disabled,
  id,
  name,
  value,
  onCheckedChange,
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
        onCheckedChange={onCheckedChange}
      />
      <span className="checkbox-field__label">{label}</span>
    </label>
  );
}
