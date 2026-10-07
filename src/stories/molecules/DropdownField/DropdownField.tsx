'use client';

import { forwardRef, useRef, type ReactNode } from 'react';
import { useFormSize } from '../../constants/form-size';
import { useFieldOptional } from '../../constants/field-optional';
import { useLabelHidden } from '../../constants/field-labels';
import {
  FieldRequiredText,
  FieldShell,
  joinIds,
  requiredTextId,
  useFieldShell,
  type FieldOptionalProps,
  type FieldRequiredProps,
} from '../_shared/FieldShell';
import { RequiredInput } from '../_shared/requiredInput';
import { Icon } from '../../atoms/Icon/Icon';
import { Menu, type MenuItem } from '../Menu/Menu';
import './DropdownField.css';

export interface DropdownFieldProps extends FieldOptionalProps, FieldRequiredProps {
  /** `id` del control; enlaza la etiqueta. Si no se pasa, se genera con `useId`. */
  id?: string;
  /** Etiqueta visible. Si no hay, es obligatorio `aria-label`. */
  label?: string;
  /** Oculta la etiqueta visualmente sin quitarla a los lectores de pantalla.   * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
   * es la primera de la lista, la etiqueta se oculta sola.
 */
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
  /**
   * Campo obligatorio. El disparador es un botón, que no admite
   * `aria-required` (D73): lo obligatorio va en su **descripción**, un texto
   * oculto «obligatorio» (`requiredLabel`, o `field.required` del catálogo)
   * enlazado por `aria-describedby` detrás de la ayuda y el error. El `<form>`
   * no se envía sin valor (`required` en el campo que sincroniza el valor,
   * que devuelve el foco al disparador).
   */
  required?: boolean;
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
  optional,
  optionalLabel,
  labelHidden: labelHiddenProp,
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
  required = false,
  requiredLabel,
  error = false,
  errorMessage,
  helperText,
  onBlur,
  className,
}: DropdownFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  const showOptional = useFieldOptional(optional, required);
  const field = useFieldShell({ id: idProp, error, errorMessage, helperText });
  const { id } = field;
  const requiredId = required ? requiredTextId(id) : undefined;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const setTriggerRef = (node: HTMLButtonElement | null) => {
    triggerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };
  return (
    <FieldShell
      field={field}
      block="dropdown-field"
      modifiers={[inline && 'dropdown-field--inline', size !== 'md' && `dropdown-field--${size}`]}
      className={className}
      label={label}
      optional={showOptional}
      optionalLabel={optionalLabel}
      labelHidden={labelHidden}
      size={size}
    >
      <Menu
        align={align}
        size={size}
        value={value}
        onValueChange={onValueChange}
        items={items}
        trigger={
          <button
            ref={setTriggerRef}
            type="button"
            id={id}
            className="dropdown-field__control"
            aria-label={label ? undefined : ariaLabel}
            aria-describedby={joinIds(field.describedBy, requiredId)}
            aria-invalid={field.hasError || undefined}
            disabled={disabled}
            onBlur={onBlur}
          >
            <span className="dropdown-field__value">{children}</span>
            <Icon name="chevron" size="sm" className="dropdown-field__icon" aria-hidden="true" />
          </button>
        }
      />
      {requiredId && <FieldRequiredText id={requiredId} label={requiredLabel} />}
      {/* Lo que se envía con el formulario (y, si es obligatorio, lo que lo valida). */}
      <RequiredInput name={name} value={value ?? ''} required={required} focusTarget={() => triggerRef.current} />
    </FieldShell>
  );
});
