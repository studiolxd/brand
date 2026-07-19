import type { ComponentProps, KeyboardEvent, ReactNode } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Textarea } from '../../atoms/Textarea/Textarea';
import './MessageComposer.css';

export interface MessageComposerProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  sendLabel?: string;
  sendAriaLabel?: string;
  /** Contenido extra a la derecha del botón de enviar (p. ej. un botón de detener envío, o un selector de modelo). */
  actions?: ReactNode;
  /** `id` del textarea interno, para asociarlo con un `<label htmlFor>` externo. */
  inputId?: string;
  /** `aria-label` del textarea interno. */
  inputLabel?: string;
  /** `aria-labelledby` del textarea interno, alternativa a `inputLabel`. */
  inputLabelledBy?: string;
}

export function MessageComposer({
  value,
  onChange,
  onSend,
  placeholder = 'Escribe un mensaje…',
  disabled,
  sendLabel = 'Enviar',
  sendAriaLabel = 'Enviar mensaje',
  actions,
  inputId,
  inputLabel,
  inputLabelledBy,
  className,
  ...rest
}: MessageComposerProps) {
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

  return (
    <div className={`message-composer${className ? ` ${className}` : ''}`} {...rest}>
      <Textarea
        id={inputId}
        aria-label={inputLabel}
        aria-labelledby={inputLabelledBy}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        rows={2}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="primary"
        size="md"
        disabled={disabled || !value.trim()}
        onClick={handleSend}
        aria-label={sendAriaLabel}
      >
        {sendLabel}
      </Button>
      {actions}
    </div>
  );
}
