import './Tag.css';
type TagVariant = 'default' | 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2' | 'neutral' | 'info' | 'warning' | 'success' | 'danger';
interface TagProps {
    /** Variante de color del tag. */
    variant?: TagVariant;
    /** Contenido del tag. */
    children: React.ReactNode;
}
export declare function Tag({ variant, children }: TagProps): import("react/jsx-runtime").JSX.Element;
export {};
