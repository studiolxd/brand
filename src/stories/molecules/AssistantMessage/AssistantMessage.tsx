import { MessageBubble } from '../../atoms/MessageBubble/MessageBubble';
import { TypingIndicator } from '../../atoms/TypingIndicator/TypingIndicator';
import './AssistantMessage.css';

export interface AssistantMessageProps {
  children?: React.ReactNode;
  /** Nombre del modelo que generó la respuesta (ej. "GPT-4o"). */
  model?: string;
  /** Marca de tiempo visible (ej. "14:33"). */
  timestamp?: string;
  /** Cuando true, muestra el indicador de escritura en lugar del contenido. */
  isStreaming?: boolean;
  /** Texto anunciado por lectores de pantalla para el estado de escritura. */
  streamingLabel?: string;
}

export function AssistantMessage({
  children,
  model,
  timestamp,
  isStreaming = false,
  streamingLabel,
}: AssistantMessageProps) {
  return (
    <div className="assistant-message">
      {model && <span className="assistant-message__model">{model}</span>}
      <MessageBubble role="assistant">
        {isStreaming ? <TypingIndicator label={streamingLabel} /> : children}
      </MessageBubble>
      {timestamp && !isStreaming && (
        <time className="assistant-message__timestamp">{timestamp}</time>
      )}
    </div>
  );
}
