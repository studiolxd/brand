import { forwardRef } from 'react';
import './Textarea.css';

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  /** Tamaño del textarea. */
  size?: 'sm' | 'md' | 'lg';
  /** Marca el estado de error: aplica la clase `textarea--error` y `aria-invalid`. */
  error?: boolean;
  /**
   * El campo renuncia a su caja —borde, fondo, aire, altura mínima, asa de
   * redimensionado y anillo de foco— para que la dibuje el contenedor que lo
   * enmarca. Es lo que usa `MessageComposer`: un solo marco alrededor del
   * campo y del botón de enviar. Quien lo monte debe dibujar el foco en ese
   * contenedor (`:focus-within`), o el campo se queda sin indicador.
   */
  bare?: boolean;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
  className?: string;
  /** @deprecated Usa el atributo nativo `aria-describedby`. */
  describedBy?: string;
}

/**
 * Textarea. Extiende los atributos nativos de `<textarea>` y reenvía `{...rest}`
 * al elemento (incluye `ref` para react-hook-form; `data-*`, `aria-*`, `maxLength`,
 * `required`, etc.).
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({
  size = 'md',
  error = false,
  bare = false,
  className,
  describedBy,
  ...rest
}, ref) {
  const classes = [
    'textarea',
    size !== 'md' ? `textarea--${size}` : '',
    error ? 'textarea--error' : '',
    bare ? 'textarea--bare' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <textarea
      ref={ref}
      className={classes}
      aria-invalid={error || undefined}
      aria-describedby={describedBy}
      {...rest}
    />
  );
});
