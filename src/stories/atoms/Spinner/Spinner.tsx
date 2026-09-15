import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './Spinner.css';

/**
 * El único texto de la espera, y es **cromo**: lo que se dice mientras no se
 * sabe cuánto falta. Conserva los puntos suspensivos —es progreso, no una
 * frase: ver Foundations → Redacción § «Los estados de carga llevan puntos
 * suspensivos».
 */
export interface SpinnerMessages {
  /** Texto anunciado por lectores de pantalla mientras se espera. */
  label: string;
}

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  /**
   * Texto anunciado por lectores de pantalla. **Sin default**: sin él, sale de
   * `spinner.label` del `BrandMessagesProvider`. **No se lee** cuando
   * `aria-hidden` es `true`: un spinner decorativo no exige la clave.
   */
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

export function Spinner({ size = 'md', label, 'aria-hidden': ariaHidden }: SpinnerProps) {
  const t = useBrandMessages('spinner');
  // El texto se lee DONDE se pinta: el spinner decorativo sale antes de
  // llamar a `t`, así que no exige `spinner.label`.
  if (ariaHidden) {
    return (
      <span className={`spinner spinner--${size}`} aria-hidden="true">
        <Square />
      </span>
    );
  }
  const texto = t('label', label);
  return (
    <span className={`spinner spinner--${size}`} role="status" aria-label={texto}>
      <Square />
      <VisuallyHidden>{texto}</VisuallyHidden>
    </span>
  );
}
