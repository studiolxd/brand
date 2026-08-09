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
export declare function ConversationThread({ messages, streamingLabel }: ConversationThreadProps): import("react/jsx-runtime").JSX.Element;
