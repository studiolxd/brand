import './ProgressBar.css';

export type ProgressBarVariant = 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  /** Porcentaje completado (0–100). Se redondea al entero más cercano. */
  value: number;
  /** Variante de color del relleno. */
  variant?: ProgressBarVariant;
  /** Tamaño de la barra. En `sm` no se muestra la etiqueta numérica. */
  size?: ProgressBarSize;
  /** Etiqueta accesible para lectores de pantalla. */
  label?: string;
}

const INSIDE_THRESHOLD = 15;

export function ProgressBar({ value, variant = 'primary', size = 'md', label }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));
  const showLabel = size !== 'sm';
  const labelInside = showLabel && clamped >= INSIDE_THRESHOLD;
  const labelOutside = showLabel && !labelInside;

  return (
    <div className={`progress-bar progress-bar--${variant} progress-bar--${size}`}>
      <div
        className="progress-bar__track"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
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
