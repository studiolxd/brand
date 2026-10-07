import { forwardRef } from 'react';
import './AutocompleteField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { FieldShell, useFieldShell } from '../_shared/FieldShell';
import { Autocomplete } from '../../atoms/Autocomplete/Autocomplete';
import type { AutocompleteOption } from '../../atoms/Autocomplete/Autocomplete';

export type { AutocompleteOption };

export interface AutocompleteFieldProps {
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
  /** El texto del campo (controlado). El valor es lo escrito, coincida o no con una sugerencia. */
  value?: string;
  /** Texto inicial cuando el campo no está controlado. */
  defaultValue?: string;
  /** Se llama con el texto nuevo, al escribir y al elegir una sugerencia. */
  onValueChange?: (value: string) => void;
  /** Se llama, además, cuando se elige una sugerencia: para saber cuál fue. */
  onSelect?: (option: AutocompleteOption) => void;
  /** Sugerencias síncronas: lista fija que el control filtra por lo escrito. Excluyente con `onSearch`. */
  options?: AutocompleteOption[];
  /** Sugerencias asíncronas (o calculadas por el consumidor), con rebote. */
  onSearch?: (query: string) => AutocompleteOption[] | Promise<AutocompleteOption[]>;
  /** Milisegundos de rebote antes de llamar a `onSearch`. Default: 200. */
  debounceMs?: number;
  /** Caracteres mínimos para sugerir al escribir. Default: 1. */
  minChars?: number;
  placeholder?: string;
  /** Nombre del campo en el formulario: el propio `<input>` lleva el texto. */
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** Campo obligatorio (`required` nativo). */
  required?: boolean;
  maxLength?: number;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
  /** Nodo DOM donde montar el portal de la lista (ver `Autocomplete`). */
  container?: React.ComponentProps<typeof Autocomplete>['container'];
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * El `Autocomplete` como campo de formulario: etiqueta, ayuda y error. El
 * `ref` va al `<input>`; el `className`, al contenedor.
 */
export const AutocompleteField = forwardRef<HTMLInputElement, AutocompleteFieldProps>(function AutocompleteField({
  id: idProp,
  label,
  labelHidden: labelHiddenProp,
  value,
  defaultValue,
  onValueChange,
  onSelect,
  options,
  onSearch,
  debounceMs,
  minChars,
  placeholder,
  name,
  disabled,
  readOnly,
  size: sizeProp,
  required,
  maxLength,
  error = false,
  errorMessage,
  helperText,
  className,
  container,
  onBlur,
}: AutocompleteFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText });
  const { id } = field;

  return (
    <FieldShell field={field} block="autocomplete-field" className={className} label={label} labelHidden={labelHidden} size={size}>
      <Autocomplete
        ref={ref}
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onSelect={onSelect}
        options={options}
        onSearch={onSearch}
        debounceMs={debounceMs}
        minChars={minChars}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        required={required}
        maxLength={maxLength}
        error={field.hasError}
        container={container}
        aria-describedby={field.describedBy}
        onBlur={onBlur}
      />
    </FieldShell>
  );
});
