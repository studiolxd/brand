import { forwardRef } from 'react';
import './Label.css';

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  /**
   * Oculta el label visualmente manteniéndolo accesible para lectores de pantalla
   * (aplica la clase `visually-hidden`).
   *
   * Nota: sombrea el atributo global nativo `hidden` (que hace `display:none`).
   * Es intencional en este design system — para ocultar por completo el elemento,
   * no lo renderices.
   */
  hidden?: boolean;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * Label de formulario. Extiende los atributos nativos de `<label>` (`htmlFor`,
 * `id`, `data-*`…) y reenvía `{...rest}` al elemento.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label({
  children,
  hidden = false,
  className,
  ...rest
}, ref) {
  const classes = [
    'label',
    hidden ? 'visually-hidden' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <label ref={ref} className={classes} {...rest}>
      {children}
    </label>
  );
});
