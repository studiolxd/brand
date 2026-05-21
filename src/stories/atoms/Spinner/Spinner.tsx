import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import './Spinner.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  /** Texto anunciado por lectores de pantalla. Ignorado cuando aria-hidden es true. */
  label?: string;
  /** Cuando true, el spinner es puramente decorativo (sin rol ni anuncio). */
  'aria-hidden'?: boolean;
}

export function Spinner({ size = 'md', label = 'Cargando…', 'aria-hidden': ariaHidden }: SpinnerProps) {
  if (ariaHidden) {
    return (
      <span className={`spinner spinner--${size}`} aria-hidden="true">
        <span className="spinner__circle" />
      </span>
    );
  }
  return (
    <span className={`spinner spinner--${size}`} role="status" aria-label={label}>
      <span className="spinner__circle" aria-hidden="true" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  );
}
