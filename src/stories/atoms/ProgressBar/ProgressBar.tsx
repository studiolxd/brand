import './ProgressBar.css';

export type ProgressBarVariant = 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  /** Porcentaje completado (0–100). Se acota al rango y se redondea al entero más cercano. */
  value: number;
  /** Variante de color del relleno. */
  variant?: ProgressBarVariant;
  /** Talla de la barra. En `sm` no se muestra la cifra. */
  size?: ProgressBarSize;
  /** Nombre accesible de la barra: qué está avanzando. Por defecto, «Progreso». */
  label?: string;
  /** Clases adicionales para el contenedor. */
  className?: string;
}

/**
 * Barra de progreso determinada: cuánto se ha completado de una tarea con final
 * conocido. Para una espera sin final conocido, `Spinner`.
 *
 * La cifra se escribe dentro del relleno cuando cabe y fuera cuando no; siempre
 * es decorativa (`aria-hidden`), porque el valor lo anuncia `aria-valuenow`.
 */
const INSIDE_THRESHOLD = 15;

export function ProgressBar({
  value,
  variant = 'primary',
  size = 'md',
  label = 'Progreso',
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));
  const showLabel = size !== 'sm';
  const labelInside = showLabel && clamped >= INSIDE_THRESHOLD;
  const labelOutside = showLabel && !labelInside;

  return (
    <div className={['progress-bar', `progress-bar--${variant}`, `progress-bar--${size}`, className].filter(Boolean).join(' ')}>
      <div
        className="progress-bar__track"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${clamped}%`}
        aria-label={label}
      >
        <div className="progress-bar__fill" style={{ width: `${clamped}%` }}>
          {labelInside && (
            <span className="progress-bar__label progress-bar__label--inside" aria-hidden="true">
              {clamped}%
            </span>
          )}
        </div>
        {labelOutside && (
          <span
            className="progress-bar__label progress-bar__label--outside"
            aria-hidden="true"
            style={{ insetInlineStart: `${clamped}%` }}
          >
            {clamped}%
          </span>
        )}
      </div>
    </div>
  );
}
