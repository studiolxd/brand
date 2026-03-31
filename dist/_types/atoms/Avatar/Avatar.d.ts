import './Avatar.css';
interface AvatarProps {
    /** URL de la imagen. */
    src: string;
    /** Texto alternativo accesible. */
    alt: string;
    /** Talla del avatar. */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Clase adicional. */
    className?: string;
}
export declare function Avatar({ src, alt, size, className }: AvatarProps): import("react/jsx-runtime").JSX.Element;
export {};
