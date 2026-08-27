import './AsyncMultiSelectField.css';
import { useFormSize } from '../../constants/form-size';
import { Label } from '../../atoms/Label/Label';
import { AsyncMultiSelect } from '../../atoms/AsyncMultiSelect/AsyncMultiSelect';
import type { AsyncMultiSelectOption } from '../../atoms/AsyncMultiSelect/AsyncMultiSelect';

export type { AsyncMultiSelectOption };

export interface AsyncMultiSelectFieldProps {
  id: string;
  label: string;
  labelHidden?: boolean;
  onSearch: (query: string) => Promise<AsyncMultiSelectOption[]>;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  selectedOptions?: AsyncMultiSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AsyncMultiSelectField({
  id,
  label,
  labelHidden = false,
  onSearch,
  value,
  defaultValue,
  onValueChange,
  selectedOptions,
  placeholder,
  disabled,
  readOnly,
  size: sizeProp,
  error = false,
  errorMessage,
  helperText,
}: AsyncMultiSelectFieldProps) {
  const size = useFormSize(sizeProp);
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  const containerClass = ['async-multi-select-field', error || errorMessage ? 'async-multi-select-field--error' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <AsyncMultiSelect
        id={id}
        onSearch={onSearch}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        selectedOptions={selectedOptions}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
      />
      {errorMessage && (
        <span id={errorId} className="async-multi-select-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="async-multi-select-field__helper">{helperText}</span>
      )}
    </div>
  );
}
