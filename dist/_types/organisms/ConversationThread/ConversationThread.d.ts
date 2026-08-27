import { type ReactNode } from 'react';
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
/**
 * El hilo de una conversación: el contenedor con scroll que apila los mensajes,
 * los anuncia como región live y baja solo al último cuando llega uno nuevo.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `id`…) y el `ref`.
 */
export declare const ConversationThread: import("react").ForwardRefExoticComponent<ConversationThreadProps & import("react").RefAttributes<HTMLDivElement>>;
