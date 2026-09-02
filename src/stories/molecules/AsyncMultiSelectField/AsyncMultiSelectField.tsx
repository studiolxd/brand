import { forwardRef, useId } from 'react';
import './AsyncMultiSelectField.css';
import { useFormSize } from '../../constants/form-size';
import { Label } from '../../atoms/Label/Label';
import { AsyncMultiSelect } from '../../atoms/AsyncMultiSelect/AsyncMultiSelect';
import type { AsyncMultiSelectOption } from '../../atoms/AsyncMultiSelect/AsyncMultiSelect';

export type { AsyncMultiSelectOption };

export interface AsyncMultiSelectFieldProps {
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve.
   */
  labelHidden?: boolean;
  onSearch: (query: string) => Promise<AsyncMultiSelectOption[]>;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** Opciones elegidas: hacen falta para poder mostrar sus etiquetas. */
  selectedOptions?: AsyncMultiSelectOption[];
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
  /** Texto cuando la búsqueda no devuelve nada. Default: "Sin resultados". */
  emptyMessage?: string;
  /** aria-label del botón que quita un valor. Default: `Quitar ${etiqueta}` (castellano). */
  removeLabel?: (label: string) => string;
  /** Etiqueta accesible del spinner mientras se busca. Default: "Buscando…". */
  loadingLabel?: string;
  /** Nodo DOM donde montar el portal del desplegable (ver `AsyncMultiSelect`). */
  container?: React.ComponentProps<typeof AsyncMultiSelect>['container'];
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * El `AsyncMultiSelect` como campo de formulario. El `ref` va al `<input>` de
 * búsqueda, que es lo que se enfoca; el `className`, al contenedor.
 */
export const AsyncMultiSelectField = forwardRef<HTMLInputElement, AsyncMultiSelectFieldProps>(function AsyncMultiSelectField({
  id: idProp,
  label,
  labelHidden = false,
  onSearch,
  value,
  defaultValue,
  onValueChange,
  selectedOptions,
  placeholder,
  name,
  disabled,
  readOnly,
  size: sizeProp,
  error = false,
  errorMessage,
  helperText,
  className,
  emptyMessage,
  removeLabel,
  loadingLabel,
  container,
  onBlur,
}: AsyncMultiSelectFieldProps, ref) {
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error
  const hasError = error || !!errorMessage;

  const containerClass = ['async-multi-select-field', className].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      <AsyncMultiSelect
        ref={ref}
        id={id}
        name={name}
        onSearch={onSearch}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        selectedOptions={selectedOptions}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        error={hasError}
        emptyMessage={emptyMessage}
        removeLabel={removeLabel}
        loadingLabel={loadingLabel}
        container={container}
        aria-describedby={describedBy}
        onBlur={onBlur}
      />
      {errorMessage && (
        <span id={errorId} className="async-multi-select-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="async-multi-select-field__helper">{helperText}</span>
      )}
    </div>
  );
});
