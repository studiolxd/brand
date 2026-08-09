import './MessageBubble.css';
export interface MessageBubbleProps {
    /** Quién envía el mensaje: el usuario o el asistente. */
    role: 'user' | 'assistant';
    children: React.ReactNode;
}
export declare function MessageBubble({ role, children }: MessageBubbleProps): import("react/jsx-runtime").JSX.Element;
