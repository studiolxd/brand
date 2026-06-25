import { useState, useCallback } from 'react';
import './NumberInput.css';

export interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  decimal?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  id?: string;
  name?: string;
  describedBy?: string;
  ariaLabel?: string;
  onChange?: (value: number) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function NumberInput({
  value,
  defaultValue = 0,
  min,
  max,
  step = 1,
  decimal = false,
  disabled = false,
  readOnly = false,
  size = 'md',
  error = false,
  id,
  name,
  describedBy,
  ariaLabel,
  onChange,
  onBlur,
  onFocus,
}: NumberInputProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<number>(defaultValue);
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);

  const currentValue = isControlled ? value : internalValue;
  const displayValue = draft !== null ? draft : String(currentValue);

  const clamp = useCallback((n: number) => {
    let result = n;
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return result;
  }, [min, max]);

  const commit = useCallback((next: number) => {
    const clamped = clamp(next);
    if (!isControlled) setInternalValue(clamped);
    onChange?.(clamped);
  }, [clamp, isControlled, onChange]);

  const handleDecrement = () => {
    if (disabled || readOnly) return;
    setDraft(null);
    commit(currentValue - step);
  };

  const handleIncrement = () => {
    if (disabled || readOnly) return;
    setDraft(null);
    commit(currentValue + step);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const raw = e.target.value;
    setDraft(raw);
    const normalized = decimal ? raw.replace(',', '.') : raw;
    const parsed = parseFloat(normalized);
    if (!isNaN(parsed)) commit(parsed);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false);
    setDraft(null);
    onBlur?.(e);
  };

  const wrapperClasses = [
    'number-input',
    size !== 'md' ? `number-input--${size}` : '',
    error ? 'number-input--error' : '',
    disabled ? 'number-input--disabled' : '',
    focused ? 'number-input--focused' : '',
  ].filter(Boolean).join(' ');

  const isDecrementDisabled = disabled || readOnly || (min !== undefined && currentValue <= min);
  const isIncrementDisabled = disabled || readOnly || (max !== undefined && currentValue >= max);

  return (
    <div className={wrapperClasses}>
      <button
        className="number-input__btn number-input__btn--decrement"
        type="button"
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        aria-label="Decrementar"
        tabIndex={-1}
      >
        −
      </button>
      <input
        className="number-input__field"
        type="text"
        inputMode={decimal ? 'decimal' : 'numeric'}
        pattern={decimal ? '[0-9]*[.,]?[0-9]*' : '[0-9]*'}
        id={id}
        name={name}
        value={displayValue}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={error || undefined}
        aria-describedby={describedBy}
        aria-label={ariaLabel}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button
        className="number-input__btn number-input__btn--increment"
        type="button"
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        aria-label="Incrementar"
        tabIndex={-1}
      >
        +
      </button>
    </div>
  );
}
