'use client';

import { forwardRef, useImperativeHandle, useRef, useState, type ComponentPropsWithoutRef } from 'react';
import './InputField.css';
import { useFormSize } from '../../constants/form-size';
import { useFieldOptional } from '../../constants/field-optional';
import { useLabelHidden } from '../../constants/field-labels';
import { Input } from '../../atoms/Input/Input';
import { Icon } from '../../atoms/Icon/Icon';
import { FieldShell, useFieldShell, type FieldOptionalProps } from '../_shared/FieldShell';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { inputFieldEs } from '../../messages/es/inputField';

/**
 * El único texto que el campo emite por su cuenta: el nombre accesible del
 * aspa de borrado. Es cromo —dice la misma cosa en toda la suite—, así que
 * sale del catálogo común y no de quien monta el campo.
 *
 * El `label`, el `placeholder`, el `helperText` y el `errorMessage` NO están
 * aquí: son el contenido de ESTE campo, y ningún catálogo común puede saber
 * qué dicen.
 */
export interface InputFieldMessages {
  /** Nombre accesible del botón que vacía un campo de búsqueda. */
  clear: string;
}

export interface InputFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'value' | 'defaultValue'>, FieldOptionalProps {
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
   * Nombre accesible del botón de borrado. **Sin default**: sale de
   * `inputField.clear` del `BrandMessagesProvider`, y esta prop es la
   * anulación puntual de un uso concreto.
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
  optional,
  optionalLabel,
  labelHidden: labelHiddenProp,
  name,
  type,
  kind = 'text',
  clearable = false,
  clearLabel,
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
  const t = useBrandMessages('inputField', inputFieldEs);
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const showOptional = useFieldOptional(optional, rest.required);
  // El `aria-describedby` que traiga el consumidor por `rest` (una pista suya,
  // un contador de caracteres…) se suma al propio: pisarlo lo dejaría mudo.
  const field = useFieldShell({ id, error, errorMessage, helperText, describedBy: rest['aria-describedby'] });

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

  const control = (
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
      error={field.hasError}
      aria-describedby={field.describedBy}
      onChange={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );

  return (
    <FieldShell field={field} block="input-field" className={className} label={label} optional={showOptional} optionalLabel={optionalLabel} labelHidden={labelHidden} size={size}>
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
          {control}
          {showClear && (
            <button
              type="button"
              className="input-field__clear"
              aria-label={t('clear', clearLabel)}
              aria-controls={id}
              onClick={handleClear}
            >
              <Icon name="close" className="input-field__search-glyph" />
            </button>
          )}
        </div>
      ) : control}
    </FieldShell>
  );
});
