import './NumberBadge.css';

export type NumberBadgeVariant =
  | 'primary'
  | 'accent-1'
  | 'accent-2'
  | 'support-1'
  | 'support-2'
  | 'danger'
  | 'success'
  | 'neutral';

export interface NumberBadgeProps {
  count: number;
  variant?: NumberBadgeVariant;
  /** Límite a partir del cual se muestra «99+». Por defecto 99. */
  max?: number;
  /** Texto accesible completo (ej. «12 notificaciones sin leer»). */
  'aria-label'?: string;
  /**
   * Marca el contador como decorativo. Es lo que hay que pasar cuando el
   * número ya está en el nombre accesible de quien lo lleva encima (la campana
   * de `NotificationButton`, el disparador del `FloatingDock`): sin esto el
   * lector de pantalla lo diría dos veces.
   */
  'aria-hidden'?: boolean | 'true' | 'false';
  className?: string;
}

export function NumberBadge({
  count,
  variant = 'primary',
  max = 99,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  className,
}: NumberBadgeProps) {
  const label = count > max ? `${max}+` : String(count);
  const hidden = ariaHidden === true || ariaHidden === 'true';
  return (
    <span
      className={['number-badge', `number-badge--${variant}`, className].filter(Boolean).join(' ')}
      aria-hidden={hidden || undefined}
      // Un contador decorativo no se nombra ni se reanuncia: ya lo dice quien lo lleva
      aria-label={hidden ? undefined : (ariaLabel ?? label)}
      aria-atomic={hidden ? undefined : true}
    >
      {label}
    </span>
  );
}
