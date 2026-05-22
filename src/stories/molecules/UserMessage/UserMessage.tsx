import { MessageBubble } from '../../atoms/MessageBubble/MessageBubble';
import './UserMessage.css';

export interface UserMessageProps {
  children: React.ReactNode;
  /** Marca de tiempo visible (ej. "14:32"). */
  timestamp?: string;
}

export function UserMessage({ children, timestamp }: UserMessageProps) {
  return (
    <div className="user-message">
      <MessageBubble role="user">{children}</MessageBubble>
      {timestamp && <time className="user-message__timestamp">{timestamp}</time>}
    </div>
  );
}
