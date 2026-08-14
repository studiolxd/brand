import { useMemo } from 'react';
import { Select } from '../Select/Select';
import './TimeSelect.css';

export interface TimeValue {
  h: number;
  m: number;
}

export interface TimeSelectProps {
  value?: TimeValue | null;
  onChange?: (value: TimeValue) => void;
  /** Paso en minutos. Default: 5 */
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  /** id aplicado al trigger de horas */
  id?: string;
  /**
   * aria-label del selector de horas. Default: "Horas" (castellano).
   * Una app multiidioma debe pasarla traducida.
   */
  hoursLabel?: string;
  /**
   * aria-label del selector de minutos. Default: "Minutos" (castellano).
   * Una app multiidioma debe pasarla traducida.
   */
  minutesLabel?: string;
  /** Placeholder del selector de horas. Default: "HH" */
  hoursPlaceholder?: string;
  /** Placeholder del selector de minutos. Default: "MM" */
  minutesPlaceholder?: string;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function TimeSelect({
  value,
  onChange,
  step = 5,
  size = 'md',
  disabled,
  readOnly,
  error,
  id,
  hoursLabel = 'Horas',
  minutesLabel = 'Minutos',
  hoursPlaceholder = 'HH',
  minutesPlaceholder = 'MM',
}: TimeSelectProps) {
  const hourOptions = useMemo(
    () => Array.from({ length: 24 }, (_, i) => ({ value: String(i), label: pad(i) })),
    []
  );

  const minuteOptions = useMemo(() => {
    const opts = [];
    for (let m = 0; m < 60; m += step) {
      opts.push({ value: String(m), label: pad(m) });
    }
    return opts;
  }, [step]);

  const handleHourChange = (v: string) => {
    const h = parseInt(v, 10);
    const m = value?.m ?? 0;
    onChange?.({ h, m });
  };

  const handleMinuteChange = (v: string) => {
    const h = value?.h ?? 0;
    const m = parseInt(v, 10);
    onChange?.({ h, m });
  };

  const cls = [
    'time-select',
    error ? 'time-select--error' : '',
  ].filter(Boolean).join(' ');

  const hourValue = value != null ? String(value.h) : undefined;
  const minuteValue = value != null ? String(value.m) : undefined;

  return (
    <div className={cls}>
      <Select
        id={id}
        options={hourOptions}
        value={hourValue}
        placeholder={hoursPlaceholder}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        aria-label={hoursLabel}
        onValueChange={handleHourChange}
      />
      <span className="time-select__sep" aria-hidden="true">:</span>
      <Select
        options={minuteOptions}
        value={minuteValue}
        placeholder={minutesPlaceholder}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        aria-label={minutesLabel}
        onValueChange={handleMinuteChange}
      />
    </div>
  );
}
