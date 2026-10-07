import { forwardRef } from 'react';
import { warnDeprecated } from '../../constants/env';
import './Tag.css';

/** Color del tag: los de marca, `neutral` y los de feedback. */
export type TagTone =
  | 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2'
  | 'neutral' | 'info' | 'warning' | 'success' | 'error';

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
 * El color de un tag a partir de `tone` y del alias obsoleto `variant`, con
 * el aviso de desarrollo por los nombres viejos. `danger` se lee como `error`.
 */
function resolveTagTone(component: string, tone: TagTone | undefined, variant: TagVariant | undefined): TagTone {
  if (variant !== undefined) warnDeprecated(component, 'variant', '`tone`');
  const resolved = tone ?? variant ?? 'neutral';
  if (resolved === 'danger') {
    warnDeprecated(component, 'variant="danger"', '`tone="error"`');
    return 'error';
  }
  return resolved;
}

/**
 * Tag / badge. Extiende los atributos nativos de `<span>` y reenvía `{...rest}`
 * (`data-*`, `aria-*`, `id`…) al elemento. `className` se concatena tras las
 * clases propias.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag({
  tone: toneProp,
  variant,
  className,
  children,
  ...rest
}, ref) {
  const tone = resolveTagTone('Tag', toneProp, variant);
  const classes = ['tag', `tag--${tone}`, className ?? ''].filter(Boolean).join(' ');
  return (
    <span ref={ref} className={classes} {...rest}>
      {children}
    </span>
  );
});
