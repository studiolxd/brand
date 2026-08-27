import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import './TypingIndicator.css';

export interface TypingIndicatorProps {
  /** Texto anunciado por lectores de pantalla. Default castellano: «El asistente está escribiendo…». */
  label?: string;
}

/** Tres puntos cuadrados que laten en secuencia: «alguien está escribiendo». */
export function TypingIndicator({ label = 'El asistente está escribiendo…' }: TypingIndicatorProps) {
  return (
    <span className="typing-indicator" role="status">
      <span className="typing-indicator__dot" aria-hidden="true" />
      <span className="typing-indicator__dot" aria-hidden="true" />
      <span className="typing-indicator__dot" aria-hidden="true" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  );
}
