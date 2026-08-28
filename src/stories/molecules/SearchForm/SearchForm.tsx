'use client';

import { forwardRef, useId } from 'react';
import { useFormSize } from '../../constants/form-size';
import { Icon } from '../../atoms/Icon/Icon';
import { InputField } from '../InputField/InputField';
import './SearchForm.css';

export interface SearchFormProps {
  /** `id` del campo. Si no se pasa, el componente genera uno estable. */
  id?: string;
  /**
   * Nombre del parámetro con el que viaja la consulta en el envío sin JS.
   * @default 'q'
   */
  name?: string;
  /** Texto escrito. Con `value` el componente es controlado. */
  value?: string;
  /** Texto inicial cuando el componente no es controlado. */
  defaultValue?: string;
  /** Se llama en cada tecla, con el evento nativo del `<input>`. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Se llama al enviar, con la consulta **recortada**. Previene el envío
   * nativo, así que sustituye a `action`/`method`. Con el campo vacío no se
   * llama: un buscador sin consulta no tiene a dónde ir.
   */
  onSubmit?: (query: string) => void;
  /** Destino del envío sin JS. Solo se usa cuando no hay `onSubmit`. */
  action?: string;
  /**
   * Método del envío sin JS. Una búsqueda es una lectura: `get`.
   * @default 'get'
   */
  method?: 'get' | 'post';
  /**
   * Etiqueta del campo. Nombra también el punto de referencia `search`.
   * Default castellano.
   * @default 'Buscar'
   */
  label?: string;
  /**
   * Oculta la etiqueta a la vista; el lector de pantalla la sigue leyendo.
   * @default true
   */
  labelHidden?: boolean;
  /**
   * Pista dentro del campo. Default castellano.
   * @default 'Buscar…'
   */
  placeholder?: string;
  /**
   * Nombre accesible del botón de envío. Default castellano.
   * @default 'Buscar'
   */
  submitLabel?: string;
  /** Talla del conjunto: la comparten campo y botón. */
  size?: 'sm' | 'md' | 'lg';
  /** Deshabilita el campo y el botón. */
  disabled?: boolean;
}

/**
 * Buscador de sitio: un campo y un botón de envío que llevan a una página de
 * resultados. No sugiere, no autocompleta y no guarda estado de búsqueda —
 * para eso está `DocsSearch`.
 *
 * El `ref` va al `<input>` interno.
 */
export const SearchForm = forwardRef<HTMLInputElement, SearchFormProps>(function SearchForm({
  id,
  name = 'q',
  value,
  defaultValue,
  onChange,
  onSubmit,
  action,
  method = 'get',
  label = 'Buscar',
  labelHidden = true,
  placeholder = 'Buscar…',
  submitLabel = 'Buscar',
  size: sizeProp,
  disabled,
}: SearchFormProps, ref) {
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  // La consulta se lee del formulario, no del estado: así vale igual con
  // `value` (controlado) que con `defaultValue`.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const query = String(new FormData(event.currentTarget).get(name) ?? '').trim();

    if (onSubmit) {
      event.preventDefault();
      if (query) onSubmit(query);
      return;
    }

    if (!query) event.preventDefault();
  }

  return (
    <form
      className={['search-form', size !== 'md' ? `search-form--${size}` : ''].filter(Boolean).join(' ')}
      role="search"
      aria-label={label}
      action={action}
      method={method}
      onSubmit={handleSubmit}
    >
      <InputField
        ref={ref}
        className="search-form__field"
        id={fieldId}
        name={name}
        label={label}
        labelHidden={labelHidden}
        // `type="search"` pintaría el aspa de borrado del navegador, que no
        // es del sistema y no se puede vestir: el campo es de texto. Tampoco
        // `kind="search"`, que traería la lupa fija: el icono de acción de
        // este campo es la flecha de envío —dentro del propio campo, al
        // final—, y solo hay uno por campo.
        type="text"
        autoComplete="off"
        enterKeyHint="search"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        size={size}
        onChange={onChange}
      />
      {/* La flecha va dentro del campo, no en una caja aparte: un adorno
          clicable al final del control, como el aspa de `InputField`. Es un
          botón de verdad —se tabula, se pulsa y se nombra—, pero sin fondo
          propio ni en reposo ni en hover. */}
      <button
        className="search-form__submit"
        type="submit"
        disabled={disabled}
        aria-label={submitLabel}
      >
        <Icon name="arrow" className="search-form__submit-glyph" />
      </button>
    </form>
  );
});
