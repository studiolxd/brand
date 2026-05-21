import './SwitcherField.css';
import { Switcher } from '../../atoms/Switcher/Switcher';

export interface SwitcherFieldProps {
  label: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function SwitcherField({
  label,
  checked,
  defaultChecked,
  disabled,
  size = 'md',
  id,
  name,
  value,
  required,
  onCheckedChange,
}: SwitcherFieldProps) {
  const fieldId = id ?? `switcher-field-${String(label).toLowerCase().replace(/\s+/g, '-')}`;
  const sizeClass = size !== 'md' ? `switcher-field--${size}` : '';
  const disabledClass = disabled ? 'switcher-field--disabled' : '';
  const className = ['switcher-field', sizeClass, disabledClass].filter(Boolean).join(' ');

  return (
    <label className={className} htmlFor={fieldId}>
      <Switcher
        id={fieldId}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        size={size}
        name={name}
        value={value}
        required={required}
        aria-labelledby={`${fieldId}-label`}
        onCheckedChange={onCheckedChange}
      />
      <span id={`${fieldId}-label`} className="switcher-field__label">
        {label}
      </span>
    </label>
  );
}
