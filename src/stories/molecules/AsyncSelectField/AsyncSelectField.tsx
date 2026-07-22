import './AsyncSelectField.css';
import { Label } from '../../atoms/Label/Label';
import { AsyncSelect } from '../../atoms/AsyncSelect/AsyncSelect';
import type { AsyncSelectOption } from '../../atoms/AsyncSelect/AsyncSelect';

export type { AsyncSelectOption };

export interface AsyncSelectFieldProps {
  id: string;
  label: string;
  labelHidden?: boolean;
  onSearch: (query: string) => Promise<AsyncSelectOption[]>;
  value?: string | null;
  onValueChange?: (value: string | null, option: AsyncSelectOption | null) => void;
  selectedOption?: AsyncSelectOption | null;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AsyncSelectField({
  id,
  label,
  labelHidden = false,
  onSearch,
  value,
  onValueChange,
  selectedOption,
  placeholder,
  disabled,
  readOnly,
  size = 'md',
  error = false,
  errorMessage,
  helperText,
}: AsyncSelectFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  const containerClass = ['async-select-field', error ? 'async-select-field--error' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      <Label htmlFor={id} hidden={labelHidden}>{label}</Label>
      <AsyncSelect
        id={id}
        onSearch={onSearch}
        value={value}
        onValueChange={onValueChange}
        selectedOption={selectedOption}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
      />
      {errorMessage && (
        <span id={errorId} className="async-select-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="async-select-field__helper">{helperText}</span>
      )}
    </div>
  );
}
