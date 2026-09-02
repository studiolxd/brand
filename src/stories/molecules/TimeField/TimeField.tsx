import { forwardRef, useId } from 'react';
import { useFormSize } from '../../constants/form-size';
import { Label } from '../../atoms/Label/Label';
import { TimeSelect } from '../../atoms/TimeSelect/TimeSelect';
import type { TimeValue } from '../../atoms/TimeSelect/TimeSelect';
import './TimeField.css';

export interface TimeFieldProps {
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
   */
  labelHidden?: boolean;
  value?: TimeValue | null;
  /** Paso en minutos. Default: 5. */
  step?: number;
  /** Nombre del campo en el formulario: se monta un input oculto con `HH:MM`. */
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  /** Campo obligatorio: parte del contrato de campo del sistema. */
  required?: boolean;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
  /** aria-label del desplegable de horas. Default: "Horas" (castellano). */
  hoursLabel?: string;
  /** aria-label del desplegable de minutos. Default: "Minutos" (castellano). */
  minutesLabel?: string;
  onChange?: (value: TimeValue) => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}

/**
 * El `TimeSelect` como campo de formulario. El control son dos desplegables de
 * Base UI: el `ref` va al de horas para que react-hook-form pueda enfocarlo al
 * fallar la validación; el `className`, al contenedor.
 */
export const TimeField = forwardRef<HTMLButtonElement, TimeFieldProps>(function TimeField({
  id: idProp,
  label,
  labelHidden = false,
  value,
  step,
  name,
  size: sizeProp,
  disabled,
  readOnly,
  required,
  error = false,
  errorMessage,
  helperText,
  className,
  hoursLabel,
  minutesLabel,
  onChange,
  onBlur,
}: TimeFieldProps, ref) {
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en el resto de campos
  const hasError = error || !!errorMessage;

  return (
    <div className={['time-field', className].filter(Boolean).join(' ')}>
      {/* El control son dos desplegables: la etiqueta nombra al grupo, y cada
          desplegable conserva el suyo (Horas / Minutos). */}
      <Label id={`${id}-label`} htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <TimeSelect
        ref={ref}
        id={id}
        name={name}
        value={value}
        step={step}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        error={hasError}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
        aria-labelledby={`${id}-label`}
        aria-describedby={describedBy}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMessage && (
        <span id={errorId} className="time-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="time-field__helper">{helperText}</span>
      )}
    </div>
  );
});
