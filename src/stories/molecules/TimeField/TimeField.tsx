import { forwardRef } from 'react';
import { useFormSize } from '../../constants/form-size';
import { useFieldOptional } from '../../constants/field-optional';
import { useLabelHidden } from '../../constants/field-labels';
import { FieldShell, useFieldShell, type FieldOptionalProps } from '../_shared/FieldShell';
import { TimeSelect } from '../../atoms/TimeSelect/TimeSelect';
import type { TimeValue } from '../../atoms/TimeSelect/TimeSelect';
import './TimeField.css';

export interface TimeFieldProps extends FieldOptionalProps {
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve, como en el resto de campos.
   * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
   * es la primera de la lista, la etiqueta se oculta sola.
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
  /**
   * aria-label del desplegable de horas. **Sin default**: sin él, el texto
   * sale de `timeSelect.hours` del `BrandMessagesProvider`, que el
   * `TimeSelect` de dentro lee por contexto.
   */
  hoursLabel?: string;
  /**
   * aria-label del desplegable de minutos. **Sin default**: sin él, sale de
   * `timeSelect.minutes` del `BrandMessagesProvider`.
   */
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
  optional,
  optionalLabel,
  labelHidden: labelHiddenProp,
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
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const showOptional = useFieldOptional(optional, required);
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText });
  const { id } = field;

  return (
    <FieldShell field={field} block="time-field" className={className} label={label} optional={showOptional} optionalLabel={optionalLabel} labelHidden={labelHidden} size={size} labelIdentified>
      {/* El control son dos desplegables: la etiqueta nombra al grupo, y cada
          desplegable conserva el suyo (Horas / Minutos). */}
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
        error={field.hasError}
        hoursLabel={hoursLabel}
        minutesLabel={minutesLabel}
        aria-labelledby={field.labelId}
        aria-describedby={field.describedBy}
        onChange={onChange}
        onBlur={onBlur}
      />
    </FieldShell>
  );
});
