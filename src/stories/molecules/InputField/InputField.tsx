'use client';

import { forwardRef, useImperativeHandle, useRef, useState, type ComponentPropsWithoutRef } from 'react';
import './InputField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';
import { Icon } from '../../atoms/Icon/Icon';

export interface InputFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'value' | 'defaultValue'> {
  id: string;
  label: string;
  /**
   * Oculta la etiqueta a la vista (sigue leyéndola el lector de pantalla).
   * Por defecto `false`: la etiqueta se ve, como en `SelectField`.
   * Con la etiqueta oculta y sin `placeholder`, el control usa el texto de la
   * etiqueta como placeholder para no quedarse sin pista visible.
   * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
   * es la primera de la lista, la etiqueta se oculta sola.
   */
  labelHidden?: boolean;
  name?: string;
  /**
   * Tipo del `<input>`. **`search` no está**: el tipo nativo pinta el aspa de
   * borrado del navegador, distinta en cada uno y fuera del sistema. Para un
   * campo de búsqueda, `kind="search"`.
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /**
   * Naturaleza del campo. `search` lo convierte en campo de búsqueda: `type="text"`
   * (nunca `type="search"`), sin autocompletado, con la tecla de intro rotulada
   * «buscar» y una **lupa fija** al inicio que dice que lo escrito filtra.
   * @default 'text'
   */
  kind?: 'text' | 'search';
  /**
   * Solo con `kind="search"`: pinta un botón-aspa al final del campo cuando hay
   * texto. Vacía el campo y devuelve el foco al control.
   * @default false
   */
  clearable?: boolean;
  /**
   * Nombre accesible del botón de borrado. Default castellano.
   * @default 'Borrar'
   */
  clearLabel?: string;
  /** Se llama tras vaciar el campo desde el aspa, ya con el foco devuelto. */
  onClear?: () => void;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

/**
 * El `ref` y el resto de props nativas de `<input>` van al `<input>` interno
 * (react-hook-form `register()`, `autoComplete`, `aria-*`, `data-*`…); el
 * `className` va al contenedor.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField({
  id,
  label,
  labelHidden: labelHiddenProp,
  name,
  type,
  kind = 'text',
  clearable = false,
  clearLabel = 'Borrar',
  onClear,
  placeholder,
  value,
  defaultValue,
  disabled,
  readOnly,
  size: sizeProp,
  error = false,
  errorMessage,
  helperText,
  onChange,
  onBlur,
  onFocus,
  className,
  ...rest
}: InputFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  // Se combina con el `aria-describedby` que traiga el consumidor por `rest`
  // (una pista suya, un contador de caracteres…): pisarlo lo dejaría mudo.
  const describedBy =
    [errorId, helperId, rest['aria-describedby']].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en SelectField
  const hasError = error || !!errorMessage;

  const isSearch = kind === 'search';
  const innerRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  // Sin `value` el campo lo guarda el DOM: el aspa aparece o no según lo que
  // hay escrito, y eso solo se sabe mirando el propio input.
  const [typed, setTyped] = useState(() => (defaultValue ?? '') !== '');
  const hasText = value !== undefined ? value !== '' : typed;
  const showClear = isSearch && clearable && hasText && !disabled && !readOnly;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (value === undefined) setTyped(event.target.value !== '');
    onChange?.(event);
  }

  function handleClear() {
    const el = innerRef.current;
    if (!el) return;
    // El valor se escribe con el setter nativo y se anuncia con un evento
    // `input`: así se entera React (campo controlado) y también quien escuche
    // el DOM (Base UI en `DocsSearch`), sin duplicar el estado del consumidor.
    const setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    setValue?.call(el, '');
    el.dispatchEvent(new Event('input', { bubbles: true }));
    setTyped(false);
    el.focus();
    onClear?.();
  }

  const searchAttrs = isSearch
    ? { type: 'text' as const, autoComplete: 'off', enterKeyHint: 'search' as const }
    : { type };

  const field = (
    <Input
      ref={innerRef}
      {...searchAttrs}
      {...rest}
      id={id}
      name={name}
      placeholder={placeholder ?? (labelHidden ? label : undefined)}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      size={size}
      error={hasError}
      aria-describedby={describedBy}
      onChange={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );

  return (
    <div className={['input-field', className].filter(Boolean).join(' ')}>
      <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>
      {isSearch ? (
        <div
          className={[
            'input-field__search',
            size !== 'md' ? `input-field__search--${size}` : '',
            clearable ? 'input-field__search--clearable' : '',
          ].filter(Boolean).join(' ')}
        >
          <span className="input-field__search-icon" aria-hidden="true">
            <Icon name="search" className="input-field__search-glyph" />
          </span>
          {field}
          {showClear && (
            <button
              type="button"
              className="input-field__clear"
              aria-label={clearLabel}
              aria-controls={id}
              onClick={handleClear}
            >
              <Icon name="close" className="input-field__search-glyph" />
            </button>
          )}
        </div>
      ) : field}
      {errorMessage && (
        <span id={errorId} className="input-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="input-field__helper">{helperText}</span>
      )}
    </div>
  );
});
