import { forwardRef, useMemo } from 'react';
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
  /** Nombre del campo en el formulario: se monta un input oculto con `HH:MM`. */
  name?: string;
  /** Campo obligatorio: se marca el grupo y los dos desplegables. */
  required?: boolean;
  /** Id de la etiqueta que nombra el grupo (lo pone el campo). */
  'aria-labelledby'?: string;
  /** Ids de ayuda/error que describen el grupo (lo pone el campo). */
  'aria-describedby'?: string;
  /** Se llama al salir de cualquiera de los dos desplegables. */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
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

/**
 * Hora repartida en dos desplegables. El `ref` va al de **horas**, que es el
 * primero que se enfoca.
 */
export const TimeSelect = forwardRef<HTMLButtonElement, TimeSelectProps>(function TimeSelect({
  value,
  onChange,
  step = 5,
  size = 'md',
  disabled,
  readOnly,
  error,
  id,
  name,
  required,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  onBlur,
  className,
  hoursLabel = 'Horas',
  minutesLabel = 'Minutos',
  hoursPlaceholder = 'HH',
  minutesPlaceholder = 'MM',
}: TimeSelectProps, ref) {
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

  const cls = ['time-select', className ?? ''].filter(Boolean).join(' ');

  // Cadena vacía, no `undefined`: el Select es controlado desde el primer
  // render (con `undefined` Base UI lo toma por no controlado y avisa al
  // llegar el primer valor). El `Select.Value` pinta el placeholder con "".
  const hourValue = value != null ? String(value.h) : '';
  const minuteValue = value != null ? String(value.m) : '';

  return (
    <div
      className={cls}
      role="group"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-invalid={error || undefined}
      aria-required={required || undefined}
    >
      <Select
        ref={ref}
        id={id}
        options={hourOptions}
        value={hourValue}
        placeholder={hoursPlaceholder}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-label={hoursLabel}
        aria-invalid={error}
        onValueChange={handleHourChange}
        onBlur={onBlur}
      />
      <span className="time-select__sep" aria-hidden="true">:</span>
      <Select
        options={minuteOptions}
        value={minuteValue}
        placeholder={minutesPlaceholder}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-label={minutesLabel}
        aria-invalid={error}
        onValueChange={handleMinuteChange}
        onBlur={onBlur}
      />
      {/* Lo que se envía con el formulario: `HH:MM`. */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value != null ? `${pad(value.h)}:${pad(value.m)}` : ''}
        />
      )}
    </div>
  );
});
