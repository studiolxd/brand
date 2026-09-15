import './ProgressBar.css';
/**
 * El único texto de la barra, y es **cromo**: el nombre genérico de lo que
 * avanza. Lo que avanza **de verdad** en una pantalla concreta —«Subiendo el
 * vídeo»— se dice con la prop `label`, que gana.
 */
export interface ProgressBarMessages {
    /** Nombre accesible de la barra cuando la pantalla no dice qué avanza. */
    label: string;
}
export type ProgressBarVariant = 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2';
export type ProgressBarSize = 'sm' | 'md' | 'lg';
export interface ProgressBarProps {
    /** Porcentaje completado (0–100). Se acota al rango y se redondea al entero más cercano. */
    value: number;
    /** Variante de color del relleno. */
    variant?: ProgressBarVariant;
    /** Talla de la barra. En `sm` no se muestra la cifra. */
    size?: ProgressBarSize;
    /**
     * Nombre accesible de la barra: qué está avanzando. **Sin default**: sin él,
     * sale de `progressBar.label` del `BrandMessagesProvider`, que es el nombre
     * genérico; esta prop es la que dice qué avanza en ESTA pantalla.
     */
    label?: string;
    /** Clases adicionales para el contenedor. */
    className?: string;
}
export declare function ProgressBar({ value, variant, size, label, className, }: ProgressBarProps): import("react/jsx-runtime").JSX.Element;
