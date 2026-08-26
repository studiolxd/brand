import { type ReactNode } from 'react';
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
}
export declare function ConversationThread({ messages, children, streamingLabel, ariaLabel, }: ConversationThreadProps): import("react/jsx-runtime").JSX.Element;
