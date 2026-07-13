import './Tag.css';
export type TagVariant = 'default' | 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2' | 'neutral' | 'info' | 'warning' | 'success' | 'danger';
export interface TagProps extends React.ComponentPropsWithoutRef<'span'> {
    /** Variante de color del tag. */
    variant?: TagVariant;
}
/**
 * Tag / badge. Extiende los atributos nativos de `<span>` y reenvía `{...rest}`
 * (`data-*`, `aria-*`, `id`…) al elemento. `className` se concatena tras las
 * clases propias.
 */
export declare const Tag: import("react").ForwardRefExoticComponent<TagProps & import("react").RefAttributes<HTMLSpanElement>>;
