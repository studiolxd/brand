import './MultiSelectField.css';
import { Label } from '../../atoms/Label/Label';
import { MultiSelect } from '../../atoms/MultiSelect/MultiSelect';
import type { MultiSelectOption } from '../../atoms/MultiSelect/MultiSelect';

export type { MultiSelectOption };

export interface MultiSelectFieldProps {
  id: string;
  label: string;
  labelHidden?: boolean;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  dark?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  onValueChange?: (value: string[]) => void;
}

export function MultiSelectField({
  id,
  label,
  labelHidden = false,
  options,
  value,
  defaultValue,
  placeholder,
  disabled,
  readOnly,
  dark,
  size = 'md',
  error = false,
  errorMessage,
  helperText,
  onValueChange,
}: MultiSelectFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  const containerClass = ['multi-select-field', error ? 'multi-select-field--error' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      <Label htmlFor={id} hidden={labelHidden}>{label}</Label>
      <MultiSelect
        id={id}
        options={options}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        dark={dark}
        size={size}
        onValueChange={onValueChange}
      />
      {errorMessage && (
        <span id={errorId} className="multi-select-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="multi-select-field__helper">{helperText}</span>
      )}
    </div>
  );
}
