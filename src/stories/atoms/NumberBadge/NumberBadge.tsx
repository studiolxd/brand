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
  className?: string;
}

export function NumberBadge({
  count,
  variant = 'primary',
  max = 99,
  'aria-label': ariaLabel,
  className,
}: NumberBadgeProps) {
  const label = count > max ? `${max}+` : String(count);
  return (
    <span
      className={['number-badge', `number-badge--${variant}`, className].filter(Boolean).join(' ')}
      aria-label={ariaLabel ?? label}
      aria-atomic="true"
    >
      {label}
    </span>
  );
}
