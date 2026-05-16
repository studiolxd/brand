import './CheckboxField.css';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';

interface CheckboxFieldProps {
  label: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
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
  size = 'md',
  id,
  name,
  value,
  onCheckedChange,
}: CheckboxFieldProps) {
  return (
    <label
      className={[
        'checkbox-field',
        size !== 'md' ? `checkbox-field--${size}` : '',
        disabled ? 'checkbox-field--disabled' : '',
      ].filter(Boolean).join(' ')}
    >
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        size={size}
        id={id}
        name={name}
        value={value}
        onCheckedChange={onCheckedChange}
      />
      <span className="checkbox-field__label">{label}</span>
    </label>
  );
}
