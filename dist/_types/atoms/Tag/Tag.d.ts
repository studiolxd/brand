import './Tag.css';
type TagVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
interface TagProps {
    /** Variante de color del tag. */
    variant?: TagVariant;
    /** Contenido del tag. */
    children: React.ReactNode;
}
export declare function Tag({ variant, children }: TagProps): import("react/jsx-runtime").JSX.Element;
export {};
