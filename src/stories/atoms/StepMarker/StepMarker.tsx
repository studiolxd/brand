import { Icon, type IconName } from '../Icon/Icon';
import './StepMarker.css';

/** Estado del paso: decide si la marca va rellena o hueca y qué contenido lleva por defecto. */
export type StepMarkerState = 'done' | 'current' | 'pending' | 'neutral';

/** Color del relleno. Las mismas variantes que `NumberBadgeVariant`, mapeadas 1:1. */
export type StepMarkerTone =
  | 'primary'
  | 'accent-1'
  | 'accent-2'
  | 'support-1'
  | 'support-2'
  | 'danger'
  | 'success'
  | 'neutral';

export type StepMarkerSize = 'sm' | 'md';

export interface StepMarkerProps {
  /**
   * Estado del paso. `done` y `current` van rellenos con el tono; `pending`
   * es una marca hueca (filete y cifra secundaria, sin tono); `neutral` —el
   * de `Steps`, que no tiene noción de progreso— va relleno con el tono,
   * igual que `current`. Default `neutral`.
   */
  state?: StepMarkerState;
  /** Color del relleno en los estados rellenos (`done`, `current`, `neutral`). Sin efecto en `pending`. Default `primary`. */
  tone?: StepMarkerTone;
  /** Talla de la marca. Default `md` (32px, la de `Stepper`). */
  size?: StepMarkerSize;
  /** La cifra del paso. Se ignora si hay `icon` o si `state` es `done`. */
  count?: number;
  /** Icono del paso, en vez de la cifra. Se ignora si `state` es `done`, que siempre muestra el check. */
  icon?: IconName;
  className?: string;
}

/**
 * La marca de un paso: un cuadrado —el radio del sistema, no un círculo—
 * con una cifra, un icono o el check de completado dentro. La comparten
 * `Stepper` (que tiene estado: completado, actual, pendiente) y `Steps`
 * (que no lo tiene, y usa el estado `neutral`).
 *
 * Es puramente decorativa: `aria-hidden` siempre, porque la numeración
 * semántica la da el `<ol>` que la contiene, no la cifra pintada dentro.
 */
export function StepMarker({ state = 'neutral', tone = 'primary', size = 'md', count, icon, className }: StepMarkerProps) {
  const done = state === 'done';
  const pending = state === 'pending';
  const classes = [
    'step-marker',
    `step-marker--${size}`,
    `step-marker--state-${state}`,
    !pending && `step-marker--tone-${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  let content: React.ReactNode = count;
  if (done) {
    content = <Icon name="check" className="step-marker__icon" />;
  } else if (icon) {
    content = <Icon name={icon} className="step-marker__icon" />;
  }

  return (
    <span className={classes} aria-hidden="true">
      {content}
    </span>
  );
}
