import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import './NumberInputField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { FieldShell, useFieldShell } from '../_shared/FieldShell';
import { NumberInput, type NumberInputCommitMode } from '../../atoms/NumberInput/NumberInput';

export interface NumberInputFieldProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
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
  /** `null` es «sin valor»: el campo se muestra vacío. Ver `NumberInput`. */
  value?: number | null;
  defaultValue?: number | null;
  min?: number;
  max?: number;
  step?: number;
  /** Admite decimales (coma o punto). */
  decimal?: boolean;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Variante para filas de lista: botones y cifra justos. Ver `NumberInput`. */
  compact?: boolean;
  /** Cuándo se avisa de lo escrito a mano: con cada tecla (`'change'`) o al salir/Enter (`'blur'`). Ver `NumberInput`. */
  commitMode?: NumberInputCommitMode;
  /** aria-label del botón que resta. Sin default: sale de `numberInput.decrement` del `BrandMessagesProvider`. */
  decrementLabel?: string;
  /** aria-label del botón que suma. Sin default: sale de `numberInput.increment` del `BrandMessagesProvider`. */
  incrementLabel?: string;
  /** Recibe el valor ya normalizado, no el evento. */
  onChange?: (value: number) => void;
  /** Quien teclea dejó el campo vacío; con ella, vaciar es un valor (`null`). Ver `NumberInput`. */
  onEmpty?: () => void;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * El `NumberInput` como campo de formulario. El `ref` y el resto de props
 * nativas de `<input>` van al input real (react-hook-form, `name`, `onBlur`,
 * `aria-*`, `data-*`…); el `className`, al contenedor.
 */
export const NumberInputField = forwardRef<HTMLInputElement, NumberInputFieldProps>(function NumberInputField({
  id: idProp,
  label,
  labelHidden: labelHiddenProp,
  value,
  defaultValue,
  min,
  max,
  step = 1,
  decimal,
  disabled,
  readOnly,
  size: sizeProp,
  compact,
  commitMode,
  error = false,
  errorMessage,
  helperText,
  className,
  onChange,
  onEmpty,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: NumberInputFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText, describedBy: ariaDescribedBy });
  const { id } = field;

  return (
    <FieldShell field={field} block="number-input-field" className={className} label={label} labelHidden={labelHidden} size={size}>
      <NumberInput
        ref={ref}
        {...rest}
        id={id}
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        decimal={decimal}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        compact={compact}
        commitMode={commitMode}
        error={field.hasError}
        aria-describedby={field.describedBy}
        onChange={onChange}
        onEmpty={onEmpty}
      />
    </FieldShell>
  );
});
