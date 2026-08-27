import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import './Spinner.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  /** Texto anunciado por lectores de pantalla. Default castellano: «Cargando…». Ignorado cuando aria-hidden es true. */
  label?: string;
  /** Cuando true, el spinner es puramente decorativo (sin rol ni anuncio). */
  'aria-hidden'?: boolean;
}

/**
 * Cuadrado de contorno que se dibuja desde la esquina superior izquierda hasta
 * completarse y vuelve a empezar. El `<rect>` lleva `pathLength="100"` para que
 * el CSS anime `stroke-dashoffset` de 100 a 0 sin depender del tamaño.
 */
function Square() {
  return (
    <svg className="spinner__square" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect className="spinner__stroke" x="2" y="2" width="20" height="20" pathLength="100" />
    </svg>
  );
}

export function Spinner({ size = 'md', label = 'Cargando…', 'aria-hidden': ariaHidden }: SpinnerProps) {
  if (ariaHidden) {
    return (
      <span className={`spinner spinner--${size}`} aria-hidden="true">
        <Square />
      </span>
    );
  }
  return (
    <span className={`spinner spinner--${size}`} role="status" aria-label={label}>
      <Square />
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  );
}
