'use client';

import { forwardRef, useId, type ReactNode } from 'react';
import { useFormSize } from '../../constants/form-size';
import { Label } from '../../atoms/Label/Label';
import { Icon } from '../../atoms/Icon/Icon';
import { Menu, type MenuItem } from '../Menu/Menu';
import './DropdownField.css';

export interface DropdownFieldProps {
  /** `id` del control; enlaza la etiqueta. Si no se pasa, se genera con `useId`. */
  id?: string;
  /** Etiqueta visible. Si no hay, es obligatorio `aria-label`. */
  label?: string;
  /** Oculta la etiqueta visualmente sin quitarla a los lectores de pantalla. */
  labelHidden?: boolean;
  /** Nombre accesible cuando no hay etiqueta visible. */
  'aria-label'?: string;
  /** Opciones del menú (radio para elección exclusiva, botones, enlaces…). */
  items: MenuItem[];
  /** Valor elegido (para los ítems `radio`). */
  value?: string;
  onValueChange?: (value: string) => void;
  /** Lo que muestra el control: el nombre de la opción actual, con icono si lo hay. */
  children: ReactNode;
  /** `inline`: etiqueta delante del control, en línea. Por defecto, encima como el resto de campos. */
  inline?: boolean;
  /** Talla del sistema (32/40/48). En superficies públicas, `lg`; dentro de las aplicaciones, `md`. */
  size?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
  disabled?: boolean;
  /** Nombre del campo en el formulario: se monta un input oculto con el valor. */
  name?: string;
  /** Marca el control en error sin mensaje. Un `errorMessage` ya lo implica. */
  error?: boolean;
  /** Mensaje de error: se anuncia (`role="alert"`) y pone el control en error. */
  errorMessage?: string;
  /** Texto de ayuda, enlazado por `aria-describedby`. */
  helperText?: string;
  /** Se llama al salir del disparador (react-hook-form lo usa para validar). */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * Campo desplegable: una etiqueta (visible u oculta) y un control rectangular
 * a la altura del sistema que abre un `Menu`. Es el Select cuando las
 * opciones no son un `<select>` — llevan icono, son enlaces o acciones — y
 * su cara es la misma que la del Select para que convivan en un formulario.
 */
export const DropdownField = forwardRef<HTMLButtonElement, DropdownFieldProps>(function DropdownField({
  id: idProp,
  label,
  labelHidden = false,
  'aria-label': ariaLabel,
  items,
  value,
  onValueChange,
  children,
  inline = false,
  size: sizeProp,
  align = 'start',
  disabled = false,
  name,
  error = false,
  errorMessage,
  helperText,
  onBlur,
  className,
}: DropdownFieldProps, ref) {
  const size = useFormSize(sizeProp);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  // Un mensaje de error implica estado de error, como en el resto de campos
  const hasError = error || !!errorMessage;
  const classes = ['dropdown-field', inline ? 'dropdown-field--inline' : '', size !== 'md' ? `dropdown-field--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      {label && <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>}
      <Menu
        align={align}
        size={size}
        value={value}
        onValueChange={onValueChange}
        items={items}
        trigger={
          <button
            ref={ref}
            type="button"
            id={id}
            className="dropdown-field__control"
            aria-label={label ? undefined : ariaLabel}
            aria-describedby={describedBy}
            aria-invalid={hasError || undefined}
            disabled={disabled}
            onBlur={onBlur}
          >
            <span className="dropdown-field__value">{children}</span>
            <Icon name="chevron" size="sm" className="dropdown-field__icon" aria-hidden="true" />
          </button>
        }
      />
      {/* Lo que se envía con el formulario. */}
      {name && <input type="hidden" name={name} value={value ?? ''} />}
      {errorMessage && (
        <span id={errorId} className="dropdown-field__error" role="alert">{errorMessage}</span>
      )}
      {helperText && (
        <span id={helperId} className="dropdown-field__helper">{helperText}</span>
      )}
    </div>
  );
});
