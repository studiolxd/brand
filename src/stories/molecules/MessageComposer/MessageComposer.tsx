'use client';

import { forwardRef, useId, type ComponentProps, type KeyboardEvent, type ReactNode } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Kbd } from '../../atoms/Kbd/Kbd';
import { Textarea } from '../../atoms/Textarea/Textarea';
import './MessageComposer.css';

export interface MessageComposerProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  /** Texto del botón de enviar. Es también su nombre accesible: no hay `aria-label` que lo contradiga. */
  sendLabel?: string;
  /**
   * Línea de ayuda bajo el marco, enlazada al campo con `aria-describedby`.
   * Por defecto, el atajo de teclado en castellano. `null` la quita.
   */
  helperText?: ReactNode;
  /** Contenido extra a la derecha del botón de enviar (p. ej. un botón de detener envío, o un selector de modelo). */
  actions?: ReactNode;
  /** `id` del textarea interno, para asociarlo con un `<label htmlFor>` externo. */
  inputId?: string;
  /** `aria-label` del textarea interno. */
  inputLabel?: string;
  /** `aria-labelledby` del textarea interno, alternativa a `inputLabel`. */
  inputLabelledBy?: string;
  /** Líneas que mide el campo en reposo. */
  rows?: number;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
  className?: string;
}

/** El atajo, dicho con las teclas de verdad. Es el default de `helperText`. */
const ATAJO = (
  <>
    <Kbd size="sm">Enter</Kbd> para enviar, <Kbd size="sm">Mayús</Kbd> +{' '}
    <Kbd size="sm">Enter</Kbd> para salto de línea
  </>
);

/**
 * La caja de escribir de un chat: el campo, el botón de enviar y la línea que
 * cuenta el atajo de teclado, todo dentro de un solo marco.
 *
 * El campo es un `Textarea` en variante `bare` —sin caja propia—, así que el
 * marco, el fondo y el anillo de foco los dibuja el composer: el átomo no se
 * pisa desde fuera.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `id`…) y el `ref`.
 */
export const MessageComposer = forwardRef<HTMLDivElement, MessageComposerProps>(function MessageComposer({
  value,
  onChange,
  onSend,
  placeholder = 'Escribe un mensaje…',
  disabled,
  sendLabel = 'Enviar',
  helperText = ATAJO,
  actions,
  inputId,
  inputLabel,
  inputLabelledBy,
  rows = 2,
  className,
  ...rest
}, ref) {
  const helperId = `${useId()}-helper`;

  function handleSend() {
    if (!value.trim()) return;
    onSend();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const classes = [
    'message-composer',
    disabled ? 'message-composer--disabled' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      <div className="message-composer__box">
        <Textarea
          bare
          className="message-composer__input"
          id={inputId}
          aria-label={inputLabel}
          aria-labelledby={inputLabelledBy}
          aria-describedby={helperText ? helperId : undefined}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="message-composer__actions">
          <Button
            variant="primary"
            size="md"
            disabled={disabled || !value.trim()}
            onClick={handleSend}
          >
            {sendLabel}
          </Button>
          {actions}
        </div>
      </div>

      {helperText && (
        <p className="message-composer__helper" id={helperId}>
          {helperText}
        </p>
      )}
    </div>
  );
});
