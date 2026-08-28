import { forwardRef } from 'react';
import { useRadioGroup } from '../RadioGroup/RadioGroupContext';
import './Radio.css';

export interface RadioProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  /** Tamaño del radio. Redeclara el `size` nativo (que es numérico). */
  size?: 'sm' | 'md' | 'lg';
  /** Marca el estado de error: aplica la clase `radio--error` y `aria-invalid`. */
  error?: boolean;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * Radio (input nativo `type="radio"`). Extiende los atributos nativos de `<input>`
 * y reenvía `{...rest}` al elemento (incluye `ref` para react-hook-form; `data-*`,
 * `aria-*`, `required`, `checked`, `value`, handlers, etc.).
 *
 * Dentro de un `RadioGroup` toma de él el `name`, si está marcado, la talla, el
 * error y el estado deshabilitado, y le avisa al elegirse. Lo que se pase a
 * mano manda sobre lo que dice el grupo.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({
  size: sizeProp,
  error: errorProp,
  className,
  ...rest
}, ref) {
  const group = useRadioGroup();
  const size = sizeProp ?? group?.size ?? 'md';
  const error = errorProp ?? group?.error ?? false;
  const name = rest.name ?? group?.name;
  const disabled = rest.disabled ?? group?.disabled;
  // Dentro de un grupo, el marcado sale del valor del grupo: el consumidor no
  // escribe un `checked` por opción.
  const checked = rest.checked ?? (group && rest.value !== undefined ? group.value === rest.value : undefined);

  const classes = [
    'radio',
    size !== 'md' ? `radio--${size}` : '',
    error ? 'radio--error' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    rest.onChange?.(event);
    if (group && event.target.checked) group.select(event.target.value);
  }

  return (
    <input
      ref={ref}
      className={classes}
      aria-invalid={error || undefined}
      {...rest}
      name={name}
      disabled={disabled}
      checked={checked}
      onChange={group ? handleChange : rest.onChange}
      type="radio"
    />
  );
});
