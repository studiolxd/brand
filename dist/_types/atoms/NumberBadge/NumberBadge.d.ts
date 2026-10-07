import './NumberBadge.css';
/** Color del contador: los de marca, los de feedback y `neutral`. */
export type NumberBadgeTone = 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2' | 'error' | 'success' | 'neutral';
/**
 * @deprecated Usa `NumberBadgeTone`. La prop de color se llama `tone` desde la
 * v51 y `danger` es `error`. Se retira en la v52.
 */
export type NumberBadgeVariant = NumberBadgeTone | 'danger';
export interface NumberBadgeProps {
    count: number;
    /** Color del contador. Default `'primary'`. */
    tone?: NumberBadgeTone;
    /**
     * @deprecated Usa `tone`. `variant="danger"` es `tone="error"`. Sigue
     * funcionando, con un aviso en desarrollo, hasta la v52.
     */
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
export declare function NumberBadge({ count, tone: toneProp, variant, max, 'aria-label': ariaLabel, 'aria-hidden': ariaHidden, className, }: NumberBadgeProps): import("react/jsx-runtime").JSX.Element;
