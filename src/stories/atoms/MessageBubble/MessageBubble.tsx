import './MessageBubble.css';

export interface MessageBubbleProps {
  /** Quién envía el mensaje: el usuario o el asistente. */
  role: 'user' | 'assistant';
  children: React.ReactNode;
}

export function MessageBubble({ role, children }: MessageBubbleProps) {
  return (
    <div className={`message-bubble message-bubble--${role}`}>
      {children}
    </div>
  );
}
