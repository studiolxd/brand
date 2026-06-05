import './NumberBadge.css';
export type NumberBadgeVariant = 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2' | 'danger' | 'success' | 'neutral';
export interface NumberBadgeProps {
    count: number;
    variant?: NumberBadgeVariant;
    /** Límite a partir del cual se muestra «99+». Por defecto 99. */
    max?: number;
    /** Texto accesible completo (ej. «12 notificaciones sin leer»). */
    'aria-label'?: string;
    className?: string;
}
export declare function NumberBadge({ count, variant, max, 'aria-label': ariaLabel, className, }: NumberBadgeProps): import("react/jsx-runtime").JSX.Element;
