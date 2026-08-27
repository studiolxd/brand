import { forwardRef, useId, type ReactNode } from 'react';
import './SwitcherField.css';
import { useFormSize } from '../../constants/form-size';
import { Switcher } from '../../atoms/Switcher/Switcher';

export interface SwitcherFieldProps {
  /** Texto del interruptor, a su derecha. Acepta JSX. */
  label: ReactNode;
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  /** Valor enviado con el formulario cuando está activo. */
  value?: string;
  /** Talla del sistema. Sin ella, la del `Form` que lo envuelva; sin `Form`, `md`. */
  size?: 'sm' | 'md' | 'lg';
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

/**
 * El `Switcher` como campo: interruptor, texto, ayuda y error. El `ref` va al
 * disparador (el `<button role="switch">`) para que react-hook-form pueda
 * enfocarlo al fallar la validación; el `className`, al contenedor.
 */
export const SwitcherField = forwardRef<HTMLElement, SwitcherFieldProps>(function SwitcherField({
  label,
  id: idProp,
  checked,
  defaultChecked,
  disabled,
  required,
  name,
  value,
  size: sizeProp,
  error = false,
  errorMessage,
  helperText,
  className,
  onCheckedChange,
  onBlur,
}: SwitcherFieldProps, ref) {
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en el resto de campos
  const hasError = error || !!errorMessage;

  return (
    <div
      className={[
        'switcher-field',
        size !== 'md' ? `switcher-field--${size}` : '',
        disabled ? 'switcher-field--disabled' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <label className="switcher-field__control" htmlFor={id}>
        <Switcher
          ref={ref}
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          size={size}
          name={name}
          value={value}
          required={required}
          error={hasError}
          aria-labelledby={`${id}-label`}
          aria-describedby={describedBy}
          onCheckedChange={onCheckedChange}
          onBlur={onBlur}
        />
        <span id={`${id}-label`} className="switcher-field__label">
          {label}
        </span>
      </label>
      {errorMessage && (
        <span id={errorId} className="switcher-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="switcher-field__helper">{helperText}</span>
      )}
    </div>
  );
});
