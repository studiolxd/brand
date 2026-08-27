import './TypingIndicator.css';
export interface TypingIndicatorProps {
    /** Texto anunciado por lectores de pantalla. Default castellano: «El asistente está escribiendo…». */
    label?: string;
}
/** Tres puntos cuadrados que laten en secuencia: «alguien está escribiendo». */
export declare function TypingIndicator({ label }: TypingIndicatorProps): import("react/jsx-runtime").JSX.Element;
