import { Slot } from '@radix-ui/react-slot';
import './Button.css';

interface ButtonProps {
  /** Visual variant of the button */
  variant?: 'primary' | 'accent' | 'outline' | 'destructive' | 'ghost';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Stretches the button to full container width */
  block?: boolean;
  /** Button label */
  children: React.ReactNode;
  /** HTML button type (ignored when href is set) */
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** Renders as <a> when provided */
  href?: string;
  /** Adds target="_blank" rel="noopener noreferrer" (solo con href) */
  external?: boolean;
  /** Merges props onto the child element instead of rendering a wrapper (e.g. Next.js Link) */
  asChild?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  children,
  type = 'button',
  disabled,
  onClick,
  href,
  external = false,
  asChild = false,
}: ButtonProps) {
  const classes = [
    'button',
    `button--${variant}`,
    size !== 'md' ? `button--${size}` : '',
    block ? 'button--block' : '',
  ].filter(Boolean).join(' ');

  if (asChild) {
    return (
      <Slot className={classes} onClick={onClick as React.MouseEventHandler<HTMLElement>}>
        {children}
      </Slot>
    );
  }

  if (href !== undefined) {
    return (
      <a
        className={classes}
        href={disabled ? undefined : href}
        aria-disabled={disabled ? true : undefined}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}
