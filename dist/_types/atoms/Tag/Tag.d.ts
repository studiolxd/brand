import './Tag.css';
/** Color del tag: los de marca, `neutral` y los de feedback. */
export type TagTone = 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2' | 'neutral' | 'info' | 'warning' | 'success' | 'error';
/**
 * @deprecated Usa `TagTone`. La prop de color se llama `tone` desde la v51 y
 * `danger` es `error` (el vocabulario de estado del sistema). Se retira en la v52.
 */
export type TagVariant = TagTone | 'danger';
export interface TagProps extends React.ComponentPropsWithoutRef<'span'> {
    /** Color del tag. Default `'neutral'`. */
    tone?: TagTone;
    /**
     * @deprecated Usa `tone`. `variant="danger"` es `tone="error"`. Sigue
     * funcionando, con un aviso en desarrollo, hasta la v52.
     */
    variant?: TagVariant;
}
/**
 * Tag / badge. Extiende los atributos nativos de `<span>` y reenvía `{...rest}`
 * (`data-*`, `aria-*`, `id`…) al elemento. `className` se concatena tras las
 * clases propias.
 */
export declare const Tag: import("react").ForwardRefExoticComponent<TagProps & import("react").RefAttributes<HTMLSpanElement>>;
