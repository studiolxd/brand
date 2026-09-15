import { forwardRef, useMemo } from 'react';
import { Select } from '../Select/Select';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './TimeSelect.css';

/**
 * El cromo de la hora: cómo se llaman los dos desplegables y qué pone dentro
 * mientras no hay hora elegida.
 *
 * **Las dos máscaras también son idioma, no formato.** `HH` y `MM` parecen
 * notación técnica, pero son la inicial de una palabra —hora y minuto— y
 * cambian con ella: en alemán se escriben `SS`/`MM` (*Stunde*, *Minute*). Lo
 * que NO se traduce es el dibujo: dos cifras, la hora antes que el minuto y
 * los dos puntos en medio; eso no lo decide ni la prop ni el catálogo.
 *
 * Las **cifras de las opciones** (`00`…`23`) tampoco están aquí: son datos.
 */
export interface TimeSelectMessages {
  /** Nombre accesible del desplegable de horas. */
  hours: string;
  /** Nombre accesible del desplegable de minutos. */
  minutes: string;
  /** Máscara del desplegable de horas sin valor: `HH`. */
  maskHours: string;
  /** Máscara del desplegable de minutos sin valor: `MM`. */
  maskMinutes: string;
}

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
   * aria-label del selector de horas. **Sin default**: sin él, el texto sale
   * de `timeSelect.hours` del `BrandMessagesProvider`.
   */
  hoursLabel?: string;
  /**
   * aria-label del selector de minutos. **Sin default**: sin él, sale de
   * `timeSelect.minutes` del `BrandMessagesProvider`.
   */
  minutesLabel?: string;
  /**
   * Máscara del selector de horas. **Sin default**: sin ella, sale de
   * `timeSelect.maskHours` del `BrandMessagesProvider`.
   */
  hoursPlaceholder?: string;
  /**
   * Máscara del selector de minutos. **Sin default**: sin ella, sale de
   * `timeSelect.maskMinutes` del `BrandMessagesProvider`.
   */
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
  hoursLabel,
  minutesLabel,
  hoursPlaceholder,
  minutesPlaceholder,
}: TimeSelectProps, ref) {
  const t = useBrandMessages('timeSelect');
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
        placeholder={hourValue === '' ? t('maskHours', hoursPlaceholder) : undefined}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-label={t('hours', hoursLabel)}
        aria-invalid={error}
        onValueChange={handleHourChange}
        onBlur={onBlur}
      />
      <span className="time-select__sep" aria-hidden="true">:</span>
      <Select
        options={minuteOptions}
        value={minuteValue}
        placeholder={minuteValue === '' ? t('maskMinutes', minutesPlaceholder) : undefined}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        aria-label={t('minutes', minutesLabel)}
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
