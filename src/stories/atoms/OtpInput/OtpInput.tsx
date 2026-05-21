import { useCallback, useRef, useState } from 'react';
import { Input } from '../Input/Input';
import './OtpInput.css';

export interface OtpInputProps {
  /** Número de celdas a renderizar. Requerido. */
  length: number;
  /** Valor controlado — string de dígitos, ej. "123456" */
  value?: string;
  /** Valor por defecto no controlado */
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Enlaza con el elemento de error/helper externo para screen readers */
  describedBy?: string;
  id?: string;
  name?: string;
}

export function OtpInput({
  length,
  value,
  defaultValue,
  onChange,
  onComplete,
  disabled,
  readOnly,
  error = false,
  size = 'md',
  describedBy,
  id,
  name,
}: OtpInputProps) {
  const isControlled = value !== undefined;

  const [internalCells, setInternalCells] = useState<string[]>(() => {
    const initial = defaultValue ?? '';
    return Array.from({ length }, (_, i) => initial[i] ?? '');
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const cells = isControlled
    ? Array.from({ length }, (_, i) => value[i] ?? '')
    : internalCells;

  const focusCell = useCallback((index: number) => {
    const inputs = containerRef.current?.querySelectorAll('input');
    if (inputs?.[index]) (inputs[index] as HTMLInputElement).focus();
  }, []);

  const commitCells = useCallback((newCells: string[]) => {
    if (!isControlled) setInternalCells(newCells);
    const full = newCells.join('');
    onChange?.(full);
    if (newCells.length === length && newCells.every(c => c !== '')) {
      onComplete?.(full);
    }
  }, [isControlled, length, onChange, onComplete]);

  const handleChange = useCallback((index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, '').slice(-1);
    if (!digit) return;
    const next = [...cells];
    next[index] = digit;
    commitCells(next);
    if (index < length - 1) focusCell(index + 1);
  }, [cells, length, focusCell, commitCells]);

  const handleKeyDown = useCallback((index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...cells];
      if (next[index] !== '') {
        next[index] = '';
        commitCells(next);
      } else if (index > 0) {
        next[index - 1] = '';
        commitCells(next);
        focusCell(index - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (index > 0) focusCell(index - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (index < length - 1) focusCell(index + 1);
    }
  }, [cells, length, focusCell, commitCells]);

  const handlePaste = useCallback((index: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!digits) return;
    const next = [...cells];
    let last = index;
    for (let i = 0; i < digits.length && index + i < length; i++) {
      next[index + i] = digits[i];
      last = index + i;
    }
    commitCells(next);
    focusCell(Math.min(last + 1, length - 1));
  }, [cells, length, focusCell, commitCells]);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-describedby={describedBy}
      data-otp-input=""
      data-size={size}
      data-error={String(error)}
      data-disabled={String(!!disabled)}
    >
      {Array.from({ length }, (_, i) => (
        <Input
          key={i}
          id={id ? `${id}-${i}` : undefined}
          name={name ? `${name}-${i}` : undefined}
          type="text"
          size={size}
          error={error}
          disabled={disabled}
          readOnly={readOnly}
          describedBy={i === 0 ? describedBy : undefined}
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          ariaLabel={`Dígito ${i + 1} de ${length}`}
          value={cells[i]}
          onChange={handleChange(i)}
          onKeyDown={handleKeyDown(i)}
          onPaste={handlePaste(i)}
        />
      ))}
    </div>
  );
}
