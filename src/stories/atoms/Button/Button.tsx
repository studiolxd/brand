import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import './Button.css';

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick'> {
  /** Visual variant of the button */
  variant?: 'primary' | 'outline' | 'ghost' | 'text';
  /** Applies destructive (red) color intent — composable with outline and text */
  destructive?: boolean;
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Stretches the button to full container width */
  block?: boolean;
  /**
   * Renders a square, icon-only button (aspect-ratio 1). Composable with `variant`
   * and `size`. Requiere `aria-label` (o texto visually-hidden) para accesibilidad.
   */
  iconOnly?: boolean;
  /**
   * HTML button type (ignored when href is set). Se mantiene el default `"button"`;
   * dentro de un `<form>` el default nativo sería `submit`, así que pásalo explícito
   * cuando quieras enviar el formulario.
   */
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** Renders as <a> when provided */
  href?: string;
  /** Adds target="_blank" rel="noopener noreferrer" (solo con href) */
  external?: boolean;
  /** Merges props onto the child element instead of rendering a wrapper (e.g. Next.js Link) */
  asChild?: boolean;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye) */
  className?: string;
}

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button({
  variant = 'primary',
  destructive = false,
  size = 'md',
  block = false,
  iconOnly = false,
  children,
  type = 'button',
  disabled,
  onClick,
  href,
  external = false,
  asChild = false,
  className,
  ...rest
}, ref) {
  const classes = [
    'button',
    `button--${variant}`,
    destructive ? 'button--destructive-intent' : '',
    size !== 'md' ? `button--${size}` : '',
    block ? 'button--block' : '',
    iconOnly ? 'button--icon-only' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  if (asChild) {
    return (
      <Slot
        ref={ref}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLElement>}
        {...(rest as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Slot>
    );
  }

  if (href !== undefined) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        href={disabled ? undefined : href}
        aria-disabled={disabled ? true : undefined}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      {...rest}
    >
      {children}
    </button>
  );
});
