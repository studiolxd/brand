'use client';

import { forwardRef, useEffect, useRef, type ReactNode } from 'react';
import { AssistantMessage } from '../../molecules/AssistantMessage/AssistantMessage';
import { UserMessage } from '../../molecules/UserMessage/UserMessage';
import type { MessageTimestamp } from '../../molecules/_shared/messageTimestamp';
import './ConversationThread.css';

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content?: string;
  /**
   * Momento del mensaje: un `Date` o una cadena ISO 8601. Nunca una hora ya
   * formateada — el hilo la escribe en `<time datetime>` y la formatea con
   * `Intl`.
   */
  timestamp?: MessageTimestamp;
  /** Solo para mensajes del asistente. */
  model?: string;
  /** Solo para mensajes del asistente en curso. */
  isStreaming?: boolean;
}

export interface ConversationThreadProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Mensajes a pintar con `UserMessage`/`AssistantMessage`. Con `children`, no hace falta. */
  messages?: ConversationMessage[];
  /** Burbujas ya montadas por el producto (mensajes con herramientas, adjuntos…): el hilo pone el contenedor, el `role="log"` y el autoscroll. */
  children?: ReactNode;
  /** Texto accesible para el indicador de escritura. */
  streamingLabel?: string;
  /**
   * aria-label del `role="log"` que envuelve el hilo. Default: "Conversación"
   * (castellano). Una app multiidioma debe pasarla traducida.
   */
  ariaLabel?: string;
  /** Locale con el que se formatean las marcas de tiempo. Default `'es-ES'`. */
  locale?: string;
  /** Opciones de `Intl.DateTimeFormat` para las marcas de tiempo. */
  timestampFormat?: Intl.DateTimeFormatOptions;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
  className?: string;
}

/** Quien ha pedido menos movimiento no quiere que el hilo se deslice. */
function scrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'auto';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

/**
 * El hilo de una conversación: el contenedor con scroll que apila los mensajes,
 * los anuncia como región live y baja solo al último cuando llega uno nuevo.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `id`…) y el `ref`.
 */
export const ConversationThread = forwardRef<HTMLDivElement, ConversationThreadProps>(function ConversationThread({
  messages = [],
  children,
  streamingLabel,
  ariaLabel = 'Conversación',
  locale,
  timestampFormat,
  className,
  ...rest
}, ref) {
  // Centinela sin altura al final del hilo: es a él a quien se le pide el
  // scroll, así no hace falta calcular la altura del contenedor ni la del
  // último mensaje (que además cambia mientras se genera la respuesta).
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: scrollBehavior() });
  }, [messages, children]);

  return (
    <div
      ref={ref}
      className={`conversation-thread${className ? ` ${className}` : ''}`}
      role="log"
      aria-label={ariaLabel}
      {...rest}
    >
      {children ?? messages.map((message) =>
        message.role === 'user' ? (
          <UserMessage
            key={message.id}
            timestamp={message.timestamp}
            locale={locale}
            timestampFormat={timestampFormat}
          >
            {message.content}
          </UserMessage>
        ) : (
          <AssistantMessage
            key={message.id}
            model={message.model}
            timestamp={message.timestamp}
            locale={locale}
            timestampFormat={timestampFormat}
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
});
