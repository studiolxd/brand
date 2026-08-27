import { forwardRef } from 'react';
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
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({
  size = 'md',
  error = false,
  className,
  ...rest
}, ref) {
  const classes = [
    'radio',
    size !== 'md' ? `radio--${size}` : '',
    error ? 'radio--error' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      className={classes}
      aria-invalid={error || undefined}
      {...rest}
      type="radio"
    />
  );
});
