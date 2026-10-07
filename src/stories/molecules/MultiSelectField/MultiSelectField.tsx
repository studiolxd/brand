import { forwardRef } from 'react';
import './MultiSelectField.css';
import { useFormSize } from '../../constants/form-size';
import { useFieldOptional } from '../../constants/field-optional';
import { useLabelHidden } from '../../constants/field-labels';
import { FieldShell, useFieldShell, type FieldOptionalProps } from '../_shared/FieldShell';
import { MultiSelect } from '../../atoms/MultiSelect/MultiSelect';
import type { MultiSelectOption } from '../../atoms/MultiSelect/MultiSelect';

export type { MultiSelectOption };

export interface MultiSelectFieldProps extends FieldOptionalProps {
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve.
   * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
   * es la primera de la lista, la etiqueta se oculta sola.
   */
  labelHidden?: boolean;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  /**
   * Marcador de sitio del control sin valor elegido. Reenvío puro al `MultiSelect`:
   * sin él, el texto sale de `multiSelect.placeholder` del `BrandMessagesProvider`.
   * Se pasa solo cuando el marcador dice algo de ESTE campo.
   */
  placeholder?: string;
  /** Nombre del campo en el formulario: se monta un input oculto por valor elegido. */
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** Obligatorio: `aria-required` en el `combobox` y `required` en el input oculto (ver `MultiSelect`). */
  required?: boolean;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
  /**
   * aria-label del botón que quita un valor. Reenvío puro al `MultiSelect`:
   * sin él, el texto sale de `multiSelect.remove` del `BrandMessagesProvider`.
   */
  removeLabel?: (label: string) => string;
  onValueChange?: (value: string[]) => void;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

/**
 * El `MultiSelect` como campo de formulario. El control es de Base UI: el
 * `ref` va al **disparador** para que react-hook-form pueda enfocarlo al
 * fallar la validación; el `className`, al contenedor.
 */
export const MultiSelectField = forwardRef<HTMLDivElement, MultiSelectFieldProps>(function MultiSelectField({
  id: idProp,
  label,
  optional,
  optionalLabel,
  labelHidden: labelHiddenProp,
  options,
  value,
  defaultValue,
  placeholder,
  name,
  disabled,
  readOnly,
  required,
  size: sizeProp,
  error = false,
  errorMessage,
  helperText,
  className,
  removeLabel,
  onValueChange,
  onBlur,
}: MultiSelectFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const showOptional = useFieldOptional(optional, required);
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText });
  const { id } = field;

  return (
    <FieldShell field={field} block="multi-select-field" className={className} label={label} optional={showOptional} optionalLabel={optionalLabel} labelHidden={labelHidden} size={size} labelIdentified>
      {/* El disparador es un `div` con `role="combobox"`: `htmlFor` no lo
          nombraría, así que la etiqueta lo nombra por `aria-labelledby`. */}
      <MultiSelect
        ref={ref}
        id={id}
        aria-labelledby={field.labelId}
        name={name}
        options={options}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        size={size}
        error={field.hasError}
        removeLabel={removeLabel}
        aria-describedby={field.describedBy}
        onValueChange={onValueChange}
        onBlur={onBlur}
      />
    </FieldShell>
  );
});
