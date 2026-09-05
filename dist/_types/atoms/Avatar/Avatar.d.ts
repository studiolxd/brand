import './Avatar.css';
export interface AvatarProps {
    /** URL de la imagen. Si se omite, se muestran las iniciales calculadas desde `name`. */
    src?: string;
    /** Nombre accesible. Por defecto, `name`. `alt=""` lo hace decorativo (cuando el nombre ya está al lado). */
    alt?: string;
    /** Nombre completo. Se usa para generar las iniciales cuando no hay `src`. */
    name?: string;
    /**
     * Talla del avatar: las tres del sistema (32/40/48) más `xl` (64), la talla
     * de marca para cuando el avatar es el asunto de la pantalla.
     */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Forma del avatar. `circle` para personas, `square` para logos de organización. */
    shape?: 'circle' | 'square';
    /** Clase adicional. */
    className?: string;
}
export declare function Avatar({ src, alt, name, size, shape, className, }: AvatarProps): import("react/jsx-runtime").JSX.Element;
