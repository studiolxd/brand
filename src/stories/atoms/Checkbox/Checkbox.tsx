import * as RadixCheckbox from '@radix-ui/react-checkbox';
import './Checkbox.css';

interface CheckboxProps {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean | 'indeterminate';
  disabled?: boolean;
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
  id,
  name,
  value,
  required,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  onCheckedChange,
}: CheckboxProps) {
  return (
    <RadixCheckbox.Root
      className="checkbox"
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
