import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import './TextareaField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { Textarea } from '../../atoms/Textarea/Textarea';
import { FieldShell, useFieldShell, type FieldOptionalProps } from '../_shared/FieldShell';

export interface TextareaFieldProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'value' | 'defaultValue' | 'rows'>, FieldOptionalProps {
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
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  rows?: number;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
}

/**
 * El `ref` y el resto de props nativas de `<textarea>` van al `<textarea>`
 * interno (react-hook-form `register()`, `aria-*`, `data-*`…); el `className`,
 * al contenedor.
 */
export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(function TextareaField({
  id,
  label,
  optional,
  optionalLabel,
  labelHidden: labelHiddenProp,
  name,
  placeholder,
  value,
  defaultValue,
  rows,
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
  'aria-describedby': ariaDescribedBy,
  ...rest
}: TextareaFieldProps, ref) {
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp);
  // El `aria-describedby` del consumidor se suma al propio, como en
  // `InputField`: antes se pisaba y la pista del consumidor se perdía.
  const field = useFieldShell({ id, error, errorMessage, helperText, describedBy: ariaDescribedBy });

  return (
    <FieldShell field={field} block="textarea-field" className={className} label={label} optional={optional} optionalLabel={optionalLabel} labelHidden={labelHidden} size={size}>
      <Textarea
        ref={ref}
        {...rest}
        id={id}
        name={name}
        placeholder={placeholder ?? (labelHidden ? label : undefined)}
        value={value}
        defaultValue={defaultValue}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        error={field.hasError}
        aria-describedby={field.describedBy}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </FieldShell>
  );
});
