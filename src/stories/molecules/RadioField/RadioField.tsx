import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import './RadioField.css';
import { useFormSize } from '../../constants/form-size';
import { useLabelHidden } from '../../constants/field-labels';
import { Radio } from '../../atoms/Radio/Radio';
import { useRadioGroup } from '../../atoms/RadioGroup/RadioGroupContext';
import { FieldShell, useFieldShell } from '../_shared/FieldShell';

export interface RadioFieldProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'id'> {
  /** Texto de la opción, a la derecha de la marca. Acepta JSX (un enlace, por ejemplo). */
  label: ReactNode;
  /**
   * Oculta el texto de la opción **visualmente**, sin quitarlo del árbol de
   * accesibilidad: el radio conserva su nombre. Misma prop que en
   * `CheckboxField` y `SwitcherField`. Default: `false`.
   * Sin valor, lo decide quien lo envuelva: dentro de un `FieldRow` que no
   * es la primera de la lista, la etiqueta se oculta sola.
   */
  labelHidden?: boolean;
  /** `id` del control. Si no se pasa, se genera con `useId`. */
  id?: string;
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
}

/**
 * El `Radio` como campo: marca, texto de la opción, ayuda y error. El `ref` y
 * el resto de props nativas de `<input type="radio">` van al input real
 * (react-hook-form, `name`, `onBlur`, `aria-*`, `data-*`…); el `className`, al
 * contenedor.
 *
 * Dentro de un `RadioGroup` toma de él la talla, el error y el estado
 * deshabilitado (el `name` y el marcado los toma el propio `Radio`). Lo que se
 * pase a mano manda sobre lo que dice el grupo.
 */
export const RadioField = forwardRef<HTMLInputElement, RadioFieldProps>(function RadioField({
  label,
  labelHidden: labelHiddenProp,
  id: idProp,
  size: sizeProp,
  disabled,
  error = false,
  errorMessage,
  helperText,
  className,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: RadioFieldProps, ref) {
  const group = useRadioGroup();
  const labelHidden = useLabelHidden(labelHiddenProp);
  const size = useFormSize(sizeProp ?? group?.size);
  // El error del grupo también pone la opción en error. El `aria-describedby`
  // del consumidor se suma al propio (antes lo pisaba).
  const field = useFieldShell({
    id: idProp,
    error: error || (group?.error ?? false),
    errorMessage,
    helperText,
    describedBy: ariaDescribedBy,
  });
  const { id } = field;
  const isDisabled = disabled ?? group?.disabled;

  return (
    <FieldShell
      field={field}
      block="radio-field"
      modifiers={[size !== 'md' && `radio-field--${size}`, isDisabled && 'radio-field--disabled']}
      className={className}
      layout="inline"
      label={label}
      labelHidden={labelHidden}
    >
      <Radio
        ref={ref}
        {...rest}
        id={id}
        size={size}
        disabled={isDisabled}
        error={field.hasError}
        aria-describedby={field.describedBy}
      />
    </FieldShell>
  );
});
