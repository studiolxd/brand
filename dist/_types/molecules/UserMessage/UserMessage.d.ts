import { type MessageTimestamp } from '../_shared/messageTimestamp';
import './UserMessage.css';
export interface UserMessageProps extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    /**
     * Nombre visible del usuario que envía el mensaje (ej. "María"). Opcional:
     * sin él, el emisor lo dicen la alineación y la cola, como hasta ahora. Se
     * pinta discreto sobre el globo, coherente con el nombre del modelo de
     * `AssistantMessage` pero sin su énfasis — aquí es un dato de apoyo, no la
     * única pista de quién habla.
     */
    author?: string;
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
    /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * Un mensaje del usuario dentro del hilo: el globo, alineado al lado de fin, y
 * su marca de tiempo debajo.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `aria-*`, `id`…) y el `ref`.
 */
export declare const UserMessage: import("react").ForwardRefExoticComponent<UserMessageProps & import("react").RefAttributes<HTMLDivElement>>;
