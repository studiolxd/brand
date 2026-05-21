import './Spinner.css';
export type SpinnerSize = 'sm' | 'md' | 'lg';
export interface SpinnerProps {
    size?: SpinnerSize;
    /** Texto anunciado por lectores de pantalla. Ignorado cuando aria-hidden es true. */
    label?: string;
    /** Cuando true, el spinner es puramente decorativo (sin rol ni anuncio). */
    'aria-hidden'?: boolean;
}
export declare function Spinner({ size, label, 'aria-hidden': ariaHidden }: SpinnerProps): import("react/jsx-runtime").JSX.Element;
