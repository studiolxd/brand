import { forwardRef } from 'react';
import './Tag.css';

export type TagVariant =
  | 'default' | 'primary' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2'
  | 'neutral' | 'info' | 'warning' | 'success' | 'danger';

export interface TagProps extends React.ComponentPropsWithoutRef<'span'> {
  /** Variante de color del tag. */
  variant?: TagVariant;
}

/**
 * Tag / badge. Extiende los atributos nativos de `<span>` y reenvía `{...rest}`
 * (`data-*`, `aria-*`, `id`…) al elemento. `className` se concatena tras las
 * clases propias.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag({
  variant = 'default',
  className,
  children,
  ...rest
}, ref) {
  const classes = ['tag', `tag--${variant}`, className ?? ''].filter(Boolean).join(' ');
  return (
    <span ref={ref} className={classes} {...rest}>
      {children}
    </span>
  );
});
