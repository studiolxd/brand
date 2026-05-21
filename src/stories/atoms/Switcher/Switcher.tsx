import * as RadixSwitch from '@radix-ui/react-switch';
import './Switcher.css';

export interface SwitcherProps {
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
  onCheckedChange?: (checked: boolean) => void;
}

export function Switcher({
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
}: SwitcherProps) {
  const className = ['switcher', size !== 'md' ? `switcher--${size}` : ''].filter(Boolean).join(' ');

  return (
    <RadixSwitch.Root
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
      <RadixSwitch.Thumb className="switcher__thumb" />
    </RadixSwitch.Root>
  );
}
