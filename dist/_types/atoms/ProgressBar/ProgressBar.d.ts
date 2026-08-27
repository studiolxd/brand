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
export declare function ProgressBar({ value, variant, size, label, className, }: ProgressBarProps): import("react/jsx-runtime").JSX.Element;
