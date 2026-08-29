import { forwardRef, useId } from 'react';
import './SelectField.css';
import { useFormSize } from '../../constants/form-size';
import { Label } from '../../atoms/Label/Label';
import { Select } from '../../atoms/Select/Select';
import type { SelectOption } from '../../atoms/Select/Select';

export interface SelectFieldProps {
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve.
   */
  labelHidden?: boolean;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** Nombre del campo en el formulario: Base UI monta un input oculto con el valor. */
  name?: string;
  disabled?: boolean;
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
  onValueChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}

const EMPTY_SENTINEL = '__empty__';

/**
 * Base UI no admite `""` como valor controlado de "nada seleccionado". El
 * centinela solo hace falta cuando la propia lista de opciones ya usa `""`
 * como el valor de un ítem real (el patrón "Selecciona un tipo" en cabeza de
 * lista, ver historia `PorDefecto`): ahí sí hay que distinguir "seleccionado
 * ese ítem" de "nada seleccionado", y el centinela cumple ambos papeles a la
 * vez porque el ítem también se remapea a él más abajo. Si ninguna opción usa
 * `""`, forzar el centinela solo consigue un valor sin ítem que lo nombre en
 * la lista: el trigger termina enseñando el centinela en crudo (visto en
 * lmsmarketplace, filtro «Visibility», F1 2026-08-30). Sin esa colisión que
 * resolver, `undefined` ya hace que el trigger enseñe el placeholder.
 */
function encode(v: string | undefined, hasEmptyOption: boolean): string | undefined {
  return v === '' ? (hasEmptyOption ? EMPTY_SENTINEL : undefined) : v;
}

function decode(v: string): string {
  return v === EMPTY_SENTINEL ? '' : v;
}

/**
 * El `Select` como campo de formulario. El control es de Base UI: el `ref` va
 * al **disparador** para que react-hook-form pueda enfocarlo al fallar la
 * validación; el `className`, al contenedor.
 */
export const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(function SelectField({
  id: idProp,
  label,
  labelHidden = false,
  options,
  value,
  defaultValue,
  placeholder,
  name,
  disabled,
  required,
  size: sizeProp,
  error = false,
  errorMessage,
  helperText,
  className,
  onValueChange,
  onBlur,
}: SelectFieldProps, ref) {
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error
  const hasError = error || !!errorMessage;

  const hasEmptyOption = options.some((o) => o.value === '');
  const encodedOptions = hasEmptyOption
    ? options.map((o) => (o.value === '' ? { ...o, value: EMPTY_SENTINEL } : o))
    : options;

  const containerClass = ['select-field', className].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <Select
        ref={ref}
        id={id}
        name={name}
        required={required}
        options={encodedOptions}
        value={encode(value, hasEmptyOption)}
        defaultValue={encode(defaultValue, hasEmptyOption)}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        aria-describedby={describedBy}
        aria-invalid={hasError}
        onValueChange={onValueChange ? (v) => onValueChange(decode(v)) : undefined}
        onBlur={onBlur}
      />
      {errorMessage && (
        <span id={errorId} className="select-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="select-field__helper">{helperText}</span>
      )}
    </div>
  );
});
