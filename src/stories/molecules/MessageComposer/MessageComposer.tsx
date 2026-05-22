import { useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Textarea } from '../../atoms/Textarea/Textarea';
import './MessageComposer.css';

export interface MessageComposerProps {
  /** Callback que recibe el texto cuando el usuario envía el mensaje. */
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MessageComposer({ onSend, placeholder = 'Escribe un mensaje…', disabled }: MessageComposerProps) {
  const [value, setValue] = useState('');

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="message-composer">
      <Textarea
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        rows={1}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="primary"
        size="md"
        disabled={disabled || !value.trim()}
        onClick={handleSend}
        aria-label="Enviar mensaje"
      >
        Enviar
      </Button>
    </div>
  );
}
