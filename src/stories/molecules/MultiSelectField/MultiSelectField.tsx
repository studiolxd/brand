import { forwardRef, useId } from 'react';
import './MultiSelectField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { Label } from '../../atoms/Label/Label';
import { MultiSelect } from '../../atoms/MultiSelect/MultiSelect';
import type { MultiSelectOption } from '../../atoms/MultiSelect/MultiSelect';

export type { MultiSelectOption };

export interface MultiSelectFieldProps {
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
  placeholder?: string;
  /** Nombre del campo en el formulario: se monta un input oculto por valor elegido. */
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
  /** aria-label del botón que quita un valor. Default: `Quitar ${etiqueta}` (castellano). */
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
  labelHidden: labelHiddenProp,
  options,
  value,
  defaultValue,
  placeholder,
  name,
  disabled,
  readOnly,
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
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error
  const hasError = error || !!errorMessage;

  const containerClass = ['multi-select-field', className].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      {/* El disparador es un `div` con `role="combobox"`: `htmlFor` no lo
          nombraría, así que la etiqueta lo nombra por `aria-labelledby`. */}
      <Label id={`${id}-label`} htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <MultiSelect
        ref={ref}
        id={id}
        aria-labelledby={`${id}-label`}
        name={name}
        options={options}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        error={hasError}
        removeLabel={removeLabel}
        aria-describedby={describedBy}
        onValueChange={onValueChange}
        onBlur={onBlur}
      />
      {errorMessage && (
        <span id={errorId} className="multi-select-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="multi-select-field__helper">{helperText}</span>
      )}
    </div>
  );
});
