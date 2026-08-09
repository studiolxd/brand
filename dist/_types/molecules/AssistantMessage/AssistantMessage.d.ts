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
export declare function AssistantMessage({ children, model, timestamp, isStreaming, streamingLabel, }: AssistantMessageProps): import("react/jsx-runtime").JSX.Element;
