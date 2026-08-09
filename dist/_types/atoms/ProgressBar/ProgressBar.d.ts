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
export declare function ProgressBar({ value, variant, size, label }: ProgressBarProps): import("react/jsx-runtime").JSX.Element;
