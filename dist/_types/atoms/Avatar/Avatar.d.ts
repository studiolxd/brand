import './Avatar.css';
export interface AvatarProps {
    /** URL de la imagen. Si se omite, se muestran las iniciales calculadas desde `name`. */
    src?: string;
    /** Texto alternativo accesible para la imagen. Se usa también como fallback de `alt` cuando `name` no está disponible. */
    alt?: string;
    /** Nombre completo. Se usa para generar las iniciales cuando no hay `src`. */
    name?: string;
    /** Talla del avatar. */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Forma del avatar. `circle` para personas, `square` para logos de organización. */
    shape?: 'circle' | 'square';
    /** Clase adicional. */
    className?: string;
}
export declare function Avatar({ src, alt, name, size, shape, className, }: AvatarProps): import("react/jsx-runtime").JSX.Element;
