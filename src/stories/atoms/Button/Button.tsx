import { forwardRef } from 'react';
import { useFormSize } from '../../constants/form-size';
import { useRender } from '@base-ui/react/use-render';
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
  /**
   * Elemento sobre el que renderizar el botón (p. ej. `<Link href="…" />` de
   * Next.js): recibe las clases y los handlers del Button. Sustituye al
   * patrón `asChild`.
   */
  render?: React.ReactElement<Record<string, unknown>>;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye) */
  className?: string;
}

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button({
  variant = 'primary',
  destructive = false,
  size: sizeProp,
  block = false,
  iconOnly = false,
  children,
  type = 'button',
  disabled,
  onClick,
  href,
  external = false,
  render,
  className,
  ...rest
}, ref) {
  const size = useFormSize(sizeProp);
  const classes = [
    'button',
    `button--${variant}`,
    destructive ? 'button--destructive-intent' : '',
    size !== 'md' ? `button--${size}` : '',
    block ? 'button--block' : '',
    iconOnly ? 'button--icon-only' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  /**
   * `disabled` no existe en `<a>` ni en el elemento que llegue por `render`:
   * ahí el estado se comunica con `aria-disabled` y se corta la interacción a
   * mano — el navegador seguiría el enlace y dispararía el `onClick` igual.
   */
  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLElement> | undefined)?.(event);
  };

  const rendered = useRender({
    render,
    ref,
    enabled: render !== undefined,
    props: {
      className: classes,
      'aria-disabled': disabled ? true : undefined,
      onClick: handleClick,
      ...(rest as Record<string, unknown>),
      children,
    },
  });
  if (rendered) return rendered;

  if (href !== undefined) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        href={disabled ? undefined : href}
        aria-disabled={disabled ? true : undefined}
        role={disabled ? 'link' : undefined}
        onClick={handleClick as React.MouseEventHandler<HTMLAnchorElement>}
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
