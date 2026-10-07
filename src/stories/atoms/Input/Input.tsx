import { forwardRef } from 'react';
import './Input.css';
import { warnDeprecated } from '../../constants/env';

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  /** Tamaño del input. Redeclara el `size` nativo (que es numérico). */
  size?: 'sm' | 'md' | 'lg';
  /** Marca el estado de error: aplica la clase `input--error` y `aria-invalid`. */
  error?: boolean;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
  className?: string;
  /** @deprecated Usa el atributo nativo `aria-describedby`. */
  describedBy?: string;
  /** @deprecated Usa el atributo nativo `aria-label`. Sigue funcionando y avisa en desarrollo; se retira en la v52. */
  ariaLabel?: string;
}

/**
 * Input de texto. Extiende los atributos nativos de `<input>` y reenvía `{...rest}`
 * al elemento (incluye `ref`, para react-hook-form; `data-*`, `aria-*`, `required`,
 * `min`/`max`/`step`, etc.).
 *
 * Nota: `type` hereda la unión nativa completa (incluye `date`, `datetime-local`…).
 * Pasar `type="checkbox"/"radio"/"file"…` renderiza pero no aplica su estilado
 * específico — para eso existen los átomos dedicados del design system.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  size = 'md',
  error = false,
  className,
  describedBy,
  ariaLabel,
  ...rest
}, ref) {
  if (ariaLabel !== undefined) warnDeprecated('Input', 'ariaLabel', '`aria-label`');
  const classes = [
    'input',
    size !== 'md' ? `input--${size}` : '',
    error ? 'input--error' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      className={classes}
      aria-invalid={error || undefined}
      aria-describedby={describedBy}
      aria-label={ariaLabel}
      {...rest}
    />
  );
});
