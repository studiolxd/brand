import { useEffect, useRef } from 'react';
import { AssistantMessage } from '../../molecules/AssistantMessage/AssistantMessage';
import { UserMessage } from '../../molecules/UserMessage/UserMessage';
import './ConversationThread.css';

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content?: string;
  timestamp?: string;
  /** Solo para mensajes del asistente. */
  model?: string;
  /** Solo para mensajes del asistente en curso. */
  isStreaming?: boolean;
}

export interface ConversationThreadProps {
  messages: ConversationMessage[];
  /** Texto accesible para el indicador de escritura. */
  streamingLabel?: string;
}

export function ConversationThread({ messages, streamingLabel }: ConversationThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="conversation-thread" role="log" aria-label="Conversación">
      {messages.map((message) =>
        message.role === 'user' ? (
          <UserMessage key={message.id} timestamp={message.timestamp}>
            {message.content}
          </UserMessage>
        ) : (
          <AssistantMessage
            key={message.id}
            model={message.model}
            timestamp={message.timestamp}
            isStreaming={message.isStreaming}
            streamingLabel={streamingLabel}
          >
            {message.content}
          </AssistantMessage>
        )
      )}
      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}
