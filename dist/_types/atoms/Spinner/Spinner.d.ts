import './Spinner.css';
/**
 * El único texto de la espera, y es **cromo**: lo que se dice mientras no se
 * sabe cuánto falta. Conserva los puntos suspensivos —es progreso, no una
 * frase: ver Foundations → Redacción § «Los estados de carga llevan puntos
 * suspensivos».
 */
export interface SpinnerMessages {
    /** Texto anunciado por lectores de pantalla mientras se espera. */
    label: string;
}
export type SpinnerSize = 'sm' | 'md' | 'lg';
export interface SpinnerProps {
    size?: SpinnerSize;
    /**
     * Texto anunciado por lectores de pantalla. **Sin default**: sin él, sale de
     * `spinner.label` del `BrandMessagesProvider`. **No se lee** cuando
     * `aria-hidden` es `true`: un spinner decorativo no exige la clave.
     */
    label?: string;
    /** Cuando true, el spinner es puramente decorativo (sin rol ni anuncio). */
    'aria-hidden'?: boolean;
}
export declare function Spinner({ size, label, 'aria-hidden': ariaHidden }: SpinnerProps): import("react/jsx-runtime").JSX.Element;
