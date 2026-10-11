import './Tag.css';
/** Color del tag: los de marca, `neutral` y los de feedback. */
export type TagTone = 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2' | 'neutral' | 'info' | 'warning' | 'success' | 'error';
export interface TagProps extends React.ComponentPropsWithoutRef<'span'> {
    /** Color del tag. Default `'neutral'`. */
    tone?: TagTone;
}
/**
 * Tag / badge. Extiende los atributos nativos de `<span>` y reenvía `{...rest}`
 * (`data-*`, `aria-*`, `id`…) al elemento. `className` se concatena tras las
 * clases propias.
 */
export declare const Tag: import("react").ForwardRefExoticComponent<TagProps & import("react").RefAttributes<HTMLSpanElement>>;
