import { forwardRef, useState, useCallback, type ComponentPropsWithoutRef } from 'react';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { numberInputEs } from '../../messages/es/numberInput';
import { Icon } from '../Icon/Icon';
import './NumberInput.css';

/**
 * Los dos textos que el control emite por su cuenta: los nombres accesibles de
 * sus dos botones. Cromo puro — no dicen nada de qué se cuenta.
 */
export interface NumberInputMessages {
  /** Nombre accesible del botón que resta un paso. */
  decrement: string;
  /** Nombre accesible del botón que suma un paso. */
  increment: string;
}

/**
 * Cuándo avisa `onChange` de lo escrito a mano: con cada tecla (`'change'`, lo de
 * siempre) o una sola vez al confirmar (`'blur'`). Los botones − y + avisan al
 * momento en los dos modos.
 */
export type NumberInputCommitMode = 'change' | 'blur';

export interface NumberInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  /**
   * Valor controlado. `null` es «sin valor»: el campo se muestra vacío (y el
   * `placeholder` se ve). Sigue siendo controlado; `undefined` es no controlado.
   */
  value?: number | null;
  /** Valor inicial no controlado (default `0`). `null` arranca vacío. */
  defaultValue?: number | null;
  min?: number;
  max?: number;
  step?: number;
  decimal?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /**
   * Variante para filas de lista (`trailing` de `ListItem`): botones y cifra
   * justos, del ancho de 2–3 dígitos, sin estirarse. Es una variante de la
   * talla `sm`, no una talla más: manda sobre `size`.
   */
  compact?: boolean;
  /**
   * Cuándo se avisa de lo escrito a mano. `'change'` (por defecto): con cada
   * tecla. `'blur'`: una sola vez al salir del campo o al pulsar Enter; Escape
   * descarta lo escrito y vuelve al último valor. Con `onEmpty`, dejar el campo
   * vacío se avisa igual, al confirmar. − y + avisan al momento en los dos modos.
   */
  commitMode?: NumberInputCommitMode;
  error?: boolean;
  id?: string;
  name?: string;
  /** @deprecated Usa el atributo nativo `aria-describedby`. */
  describedBy?: string;
  /** @deprecated Usa el atributo nativo `aria-label`. */
  ariaLabel?: string;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
  className?: string;
  /**
   * aria-label del botón de decremento. **Sin default**: sale de
   * `numberInput.decrement` del `BrandMessagesProvider`.
   */
  decrementLabel?: string;
  /**
   * aria-label del botón de incremento. **Sin default**: sale de
   * `numberInput.increment` del `BrandMessagesProvider`.
   */
  incrementLabel?: string;
  onChange?: (value: number) => void;
  /**
   * Se llama cuando quien teclea deja el campo vacío. Sin ella el campo se
   * comporta como siempre (vaciar no emite nada y al salir recupera el último
   * número); con ella, vaciar **es** un valor: el campo pasa a «sin valor» y
   * esta función avisa de ello.
   */
  onEmpty?: () => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * Campo numérico con incremento y decremento. El `ref` y el resto de props
 * nativas de `<input>` van al input real (react-hook-form, `aria-*`, `data-*`,
 * `autoComplete`, `required`…); `className` se concatena a las clases del
 * contenedor.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput({
  value,
  defaultValue = 0,
  min,
  max,
  step = 1,
  decimal = false,
  disabled = false,
  readOnly = false,
  size = 'md',
  compact = false,
  commitMode = 'change',
  error = false,
  id,
  name,
  describedBy,
  ariaLabel,
  decrementLabel,
  incrementLabel,
  className,
  onChange,
  onEmpty,
  onBlur,
  onFocus,
  onKeyDown,
  ...rest
}: NumberInputProps, ref) {
  const t = useBrandMessages('numberInput', numberInputEs);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<number | null>(defaultValue);
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);

  const currentValue = isControlled ? value : internalValue;
  const displayValue = draft !== null ? draft : currentValue === null ? '' : String(currentValue);
  // Desde «sin valor», los botones cuentan como si el campo valiera 0.
  const base = currentValue ?? 0;

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
    commit(base - step);
  };

  const handleIncrement = () => {
    if (disabled || readOnly) return;
    setDraft(null);
    commit(base + step);
  };

  // Avisa de lo que hay escrito: un número se ajusta y se avisa; vacío, con `onEmpty`, es
  // «sin valor». En modo `blur`, solo si cambia algo (una escritura de más es una escritura al servidor).
  const commitRaw = (raw: string) => {
    const normalized = decimal ? raw.replace(',', '.') : raw;
    const parsed = parseFloat(normalized);
    if (!isNaN(parsed)) {
      if (commitMode === 'blur' && clamp(parsed) === currentValue) return;
      commit(parsed);
    } else if (onEmpty && raw.trim() === '') {
      if (commitMode === 'blur' && currentValue === null) return;
      if (!isControlled) setInternalValue(null);
      onEmpty();
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const raw = e.target.value;
    setDraft(raw);
    if (commitMode === 'change') commitRaw(raw);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || commitMode !== 'blur' || draft === null) return;
    if (e.key === 'Enter') {
      commitRaw(draft);
      setDraft(null);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setDraft(null);
    }
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false);
    if (commitMode === 'blur' && draft !== null) commitRaw(draft);
    setDraft(null);
    onBlur?.(e);
  };

  const wrapperClasses = [
    'number-input',
    compact ? 'number-input--compact' : size !== 'md' ? `number-input--${size}` : '',
    error ? 'number-input--error' : '',
    disabled ? 'number-input--disabled' : '',
    focused ? 'number-input--focused' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const isDecrementDisabled = disabled || readOnly || (currentValue !== null && min !== undefined && currentValue <= min);
  const isIncrementDisabled = disabled || readOnly || (currentValue !== null && max !== undefined && currentValue >= max);

  return (
    <div className={wrapperClasses}>
      <button
        className="number-input__btn number-input__btn--decrement"
        type="button"
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        aria-label={t('decrement', decrementLabel)}
        tabIndex={-1}
      >
        <Icon name="minus" size="sm" />
      </button>
      <input
        ref={ref}
        className="number-input__field"
        type="text"
        inputMode={decimal ? 'decimal' : 'numeric'}
        pattern={decimal ? '[0-9]*[.,]?[0-9]*' : '[0-9]*'}
        aria-invalid={error || undefined}
        aria-describedby={describedBy}
        aria-label={ariaLabel}
        {...rest}
        id={id}
        name={name}
        value={displayValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button
        className="number-input__btn number-input__btn--increment"
        type="button"
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        aria-label={t('increment', incrementLabel)}
        tabIndex={-1}
      >
        <Icon name="plus" size="sm" />
      </button>
    </div>
  );
});
