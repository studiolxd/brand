import { forwardRef } from 'react';
import './AsyncSelectField.css';
import { useFormSize } from '../../constants/form-size';
import { useFieldOptional } from '../../constants/field-optional';
import { useLabelHidden } from '../../constants/field-labels';
import { FieldShell, useFieldShell, type FieldOptionalProps } from '../_shared/FieldShell';
import { AsyncSelect } from '../../atoms/AsyncSelect/AsyncSelect';
import type { AsyncSelectOption } from '../../atoms/AsyncSelect/AsyncSelect';

export type { AsyncSelectOption };

export interface AsyncSelectFieldProps extends FieldOptionalProps {
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
  onSearch: (query: string) => Promise<AsyncSelectOption[]>;
  value?: string | null;
  onValueChange?: (value: string | null, option: AsyncSelectOption | null) => void;
  /** Opción elegida: hace falta para poder mostrar su etiqueta cuando hay `value`. */
  selectedOption?: AsyncSelectOption | null;
  placeholder?: string;
  /** Nombre del campo en el formulario: se monta un input oculto con el valor. */
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** Marca el control como obligatorio (`aria-required` en el combobox). */
  required?: boolean;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Milisegundos de rebote antes de llamar a `onSearch`. Default: 300. */
  debounceMs?: number;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
  /** Texto cuando la búsqueda no devuelve nada. Default: "Sin resultados". */
  emptyMessage?: string;
  /** Etiqueta accesible del spinner mientras se busca. Default: "Buscando…". */
  loadingLabel?: string;
  /** aria-label del botón de limpiar selección. Default: "Limpiar selección". */
  clearLabel?: string;
  /** Nodo DOM donde montar el portal del desplegable (ver `AsyncSelect`). */
  container?: React.ComponentProps<typeof AsyncSelect>['container'];
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * El `AsyncSelect` como campo de formulario. El `ref` va al `<input>` de
 * búsqueda, que es lo que se enfoca; el `className`, al contenedor.
 */
export const AsyncSelectField = forwardRef<HTMLInputElement, AsyncSelectFieldProps>(function AsyncSelectField({
  id: idProp,
  label,
  optional,
  optionalLabel,
  labelHidden: labelHiddenProp,
  onSearch,
  value,
  onValueChange,
  selectedOption,
  placeholder,
  name,
  disabled,
  readOnly,
  size: sizeProp,
  debounceMs,
  required,
  error = false,
  errorMessage,
  helperText,
  className,
  emptyMessage,
  loadingLabel,
  clearLabel,
  container,
  onBlur,
}: AsyncSelectFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const showOptional = useFieldOptional(optional, required);
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText });
  const { id } = field;

  return (
    <FieldShell field={field} block="async-select-field" className={className} label={label} optional={showOptional} optionalLabel={optionalLabel} labelHidden={labelHidden} size={size}>
      <AsyncSelect
        ref={ref}
        id={id}
        name={name}
        onSearch={onSearch}
        value={value}
        onValueChange={onValueChange}
        selectedOption={selectedOption}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        debounceMs={debounceMs}
        required={required}
        error={field.hasError}
        emptyMessage={emptyMessage}
        loadingLabel={loadingLabel}
        clearLabel={clearLabel}
        container={container}
        aria-describedby={field.describedBy}
        onBlur={onBlur}
      />
    </FieldShell>
  );
});
