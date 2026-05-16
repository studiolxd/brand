import './SelectField.css';
import { Label } from '../../atoms/Label/Label';
import { Select } from '../../atoms/Select/Select';
import type { SelectOption } from '../../atoms/Select/Select';

export interface SelectFieldProps {
  id: string;
  label: string;
  labelHidden?: boolean;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  dark?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  onValueChange?: (value: string) => void;
}

const EMPTY_SENTINEL = '__empty__';

function encode(v: string | undefined): string | undefined {
  return v === '' ? EMPTY_SENTINEL : v;
}

function decode(v: string): string {
  return v === EMPTY_SENTINEL ? '' : v;
}

export function SelectField({
  id,
  label,
  labelHidden = false,
  options,
  value,
  defaultValue,
  placeholder,
  disabled,
  dark,
  size = 'md',
  error = false,
  errorMessage,
  helperText,
  onValueChange,
}: SelectFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  const encodedOptions = options.map((o) =>
    o.value === '' ? { ...o, value: EMPTY_SENTINEL } : o,
  );

  const containerClass = ['select-field', error ? 'select-field--error' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      <Label htmlFor={id} hidden={labelHidden}>{label}</Label>
      <Select
        id={id}
        options={encodedOptions}
        value={encode(value)}
        defaultValue={encode(defaultValue)}
        placeholder={placeholder}
        disabled={disabled}
        dark={dark}
        size={size}
        onValueChange={onValueChange ? (v) => onValueChange(decode(v)) : undefined}
      />
      {errorMessage && (
        <span id={errorId} className="select-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="select-field__helper">{helperText}</span>
      )}
    </div>
  );
}
