import { Icon, type IconName } from '../Icon/Icon';
import { warnDeprecated } from '../../constants/env';
import './StepMarker.css';

/** Estado del paso: decide si la marca va rellena o hueca y qué contenido lleva por defecto. */
export type StepMarkerState = 'done' | 'current' | 'pending' | 'neutral';

/** Color del relleno. Los mismos tonos que `NumberBadgeTone`, mapeados 1:1. */
export type StepMarkerTone =
  | 'primary'
  | 'accent-1'
  | 'accent-2'
  | 'support-1'
  | 'support-2'
  | 'error'
  | 'success'
  | 'neutral';

/**
 * @deprecated `danger` es `error` desde la v51 (el vocabulario de estado del
 * sistema). Sigue funcionando, con un aviso en desarrollo, hasta la v52.
 */
export type StepMarkerToneDeprecated = 'danger';

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
  tone?: StepMarkerTone | StepMarkerToneDeprecated;
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
export function StepMarker({ state = 'neutral', tone: toneProp = 'primary', size = 'md', count, icon, className }: StepMarkerProps) {
  let tone = toneProp;
  if (tone === 'danger') {
    warnDeprecated('StepMarker', 'tone="danger"', '`tone="error"`');
    tone = 'error';
  }
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
