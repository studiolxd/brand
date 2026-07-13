import { forwardRef, useId, useState } from 'react';
import './PasswordField.css';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { Icon } from '../../atoms/Icon/Icon';

export interface PasswordFieldProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  /**
   * Etiqueta del campo. **Opcional**: si se omite, el componente renderiza solo
   * el campo + toggle (sin `<label>`, sin `__error`/`__helper`), para componerlo
   * dentro de una capa de formulario propia.
   */
  label?: string;
  /** Oculta visualmente el label (solo aplica cuando hay `label`). Default: true. */
  labelHidden?: boolean;
  /** Marca el estado de error (borde) y `aria-invalid` en el input. */
  error?: boolean;
  /** Mensaje de error propio del componente (solo se renderiza si hay `label`-mode completo). */
  errorMessage?: string;
  /** Texto de ayuda propio del componente. */
  helperText?: string;
  /** Tamaño del campo. */
  size?: 'sm' | 'md' | 'lg';
  /** aria-label del toggle cuando la contraseña está oculta. Default: "Mostrar contraseña". */
  showPasswordLabel?: string;
  /** aria-label del toggle cuando la contraseña es visible. Default: "Ocultar contraseña". */
  hidePasswordLabel?: string;
  /**
   * Se añade DESPUÉS de las clases propias, sobre el wrapper raíz `.password-field`.
   * (El `ref` y el resto de props nativas — `name`, `onChange`, `data-*`, `aria-*`… —
   * se reenvían al `<input>` interno, no al wrapper.)
   */
  className?: string;
}

/**
 * Campo de contraseña con toggle mostrar/ocultar integrado.
 *
 * El `ref` y `{...rest}` (props nativas de `<input>`) se reenvían al `<input>`
 * interno — no al wrapper — para soportar react-hook-form (`{...register()}`) y la
 * inyección de props del consumidor (`id`, `aria-describedby`, `aria-invalid`,
 * `data-*`…). El `className` se aplica al wrapper raíz.
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField({
  label,
  labelHidden = true,
  error = false,
  errorMessage,
  helperText,
  size = 'md',
  showPasswordLabel = 'Mostrar contraseña',
  hidePasswordLabel = 'Ocultar contraseña',
  className,
  id,
  disabled,
  placeholder,
  ...rest
}, ref) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const [visible, setVisible] = useState(false);
  const errorId = errorMessage ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={['password-field', className ?? ''].filter(Boolean).join(' ')}>
      {label && <Label htmlFor={inputId} hidden={labelHidden}>{label}</Label>}
      <div className="password-field__wrapper">
        <Input
          ref={ref}
          id={inputId}
          size={size}
          error={error}
          placeholder={placeholder ?? (label && labelHidden ? label : undefined)}
          aria-describedby={describedBy}
          {...rest}
          type={visible ? 'text' : 'password'}
          disabled={disabled}
        />
        <button
          type="button"
          className="password-field__toggle"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          aria-controls={inputId}
          aria-pressed={visible}
        >
          <VisuallyHidden>{visible ? hidePasswordLabel : showPasswordLabel}</VisuallyHidden>
          <Icon name={visible ? 'eye-off' : 'eye'} className="password-field__icon" />
        </button>
      </div>
      {errorMessage && (
        <span id={errorId} className="password-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="password-field__helper">{helperText}</span>
      )}
    </div>
  );
});
