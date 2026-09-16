import { type MessageTimestamp } from '../_shared/messageTimestamp';
import './AssistantMessage.css';
export interface AssistantMessageProps extends React.ComponentPropsWithoutRef<'div'> {
    children?: React.ReactNode;
    /** Nombre del modelo que generó la respuesta (ej. "Claude Opus 5"). */
    model?: string;
    /**
     * Momento del mensaje: un `Date` o una cadena ISO 8601. Se pinta en un
     * `<time datetime>`, así que tiene que ser el instante, no una hora ya
     * formateada — de eso se encarga el componente con `Intl`.
     */
    timestamp?: MessageTimestamp;
    /** Locale con el que se formatea la marca de tiempo. Default `'es-ES'`. */
    locale?: string;
    /**
     * Opciones de `Intl.DateTimeFormat` para la marca de tiempo.
     * Default: hora y minutos a dos dígitos.
     */
    timestampFormat?: Intl.DateTimeFormatOptions;
    /** Cuando true, muestra el indicador de escritura en lugar del contenido. */
    isStreaming?: boolean;
    /**
     * Quién escribe mientras se genera la respuesta, para el `TypingIndicator`.
     * **Obligatoria y sin default**: el nombre del asistente es contenido del
     * producto, y el verbo lo pone el catálogo
     * (`typingIndicator.typing(name)`). Se pide siempre, aunque este mensaje no
     * esté generándose: el mensaje del asistente puede estarlo en cualquier
     * momento, y un nombre que aparece solo a veces es un texto sin traducir
     * esperando su turno.
     */
    streamingName: string;
    /**
     * La frase entera del estado de escritura, cuando la plantilla del catálogo
     * no vale. **Sin default**: sin ella, sale de
     * `typingIndicator.typing(streamingName)`.
     */
    streamingLabel?: string;
    /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * Un mensaje del asistente dentro del hilo: el nombre del modelo que firma la
 * respuesta, el globo alineado al lado de inicio y su marca de tiempo debajo.
 * Mientras la respuesta se está generando, el globo lleva el `TypingIndicator`.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `aria-*`, `id`…) y el `ref`.
 */
export declare const AssistantMessage: import("react").ForwardRefExoticComponent<AssistantMessageProps & import("react").RefAttributes<HTMLDivElement>>;
