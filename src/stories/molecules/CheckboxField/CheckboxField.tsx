import { forwardRef, useId, type ReactNode } from 'react';
import './CheckboxField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';

export interface CheckboxFieldProps {
  /** Texto de la opción, a la derecha de la marca. Acepta JSX (un enlace, por ejemplo). */
  label: ReactNode;
  /**
   * Oculta el texto de la opción **visualmente**, sin quitarlo del árbol de
   * accesibilidad: la marca conserva su nombre. Para una casilla dentro de una
   * tabla o de una barra de acciones, donde el rótulo lo da la columna. Misma
   * prop que en `InputField`, `TextareaField`, `SelectField` y `FileUploadField`.
   * Default: `false`.
   * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
   * es la primera de la lista, la etiqueta se oculta sola.
   */
  labelHidden?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  /** Talla del sistema. Sin ella, la del `Form` que lo envuelva; sin `Form`, `md`. */
  size?: 'sm' | 'md' | 'lg';
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
  name?: string;
  value?: string;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

/**
 * El `Checkbox` como campo: marca, texto de la opción, ayuda y error. El `ref`
 * va al disparador (el `<button role="checkbox">`) para que react-hook-form
 * pueda enfocarlo al fallar la validación; el `className`, al contenedor.
 */
export const CheckboxField = forwardRef<HTMLElement, CheckboxFieldProps>(function CheckboxField({
  label,
  labelHidden: labelHiddenProp,
  checked,
  defaultChecked,
  disabled,
  size: sizeProp,
  id: idProp,
  name,
  value,
  error = false,
  errorMessage,
  helperText,
  className,
  onCheckedChange,
  onBlur,
}: CheckboxFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
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
        'checkbox-field',
        size !== 'md' ? `checkbox-field--${size}` : '',
        disabled ? 'checkbox-field--disabled' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <label className="checkbox-field__control" htmlFor={id}>
        <Checkbox
          ref={ref}
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          size={size}
          name={name}
          value={value}
          error={hasError}
          aria-describedby={describedBy}
          onCheckedChange={onCheckedChange}
          onBlur={onBlur}
        />
        {labelHidden
          ? <VisuallyHidden className="checkbox-field__label">{label}</VisuallyHidden>
          : <span className="checkbox-field__label">{label}</span>}
      </label>
      {errorMessage && (
        <span id={errorId} className="checkbox-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="checkbox-field__helper">{helperText}</span>
      )}
    </div>
  );
});
