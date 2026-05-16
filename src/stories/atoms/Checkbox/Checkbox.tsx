import * as RadixCheckbox from '@radix-ui/react-checkbox';
import './Checkbox.css';

interface CheckboxProps {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean | 'indeterminate';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}

export function Checkbox({
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
  onCheckedChange,
}: CheckboxProps) {
  const className = ['checkbox', size !== 'md' ? `checkbox--${size}` : ''].filter(Boolean).join(' ');

  return (
    <RadixCheckbox.Root
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
      onCheckedChange={onCheckedChange}
    >
      <RadixCheckbox.Indicator className="checkbox__indicator" />
    </RadixCheckbox.Root>
  );
}
