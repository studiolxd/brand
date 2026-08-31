import { forwardRef } from 'react';
import { useFormSize } from '../../constants/form-size';
import { useRender } from '@base-ui/react/use-render';
import './Button.css';

/**
 * Nombre accesible obligatorio en un botón de solo icono: sin texto visible,
 * el nombre tiene que venir de `aria-label` o de `aria-labelledby`. Va en el
 * tipo, no solo en el JSDoc, para que el compilador lo exija.
 */
export type ButtonIconOnlyProps =
  | { iconOnly: true; 'aria-label': string }
  | { iconOnly: true; 'aria-labelledby': string }
  | { iconOnly?: false | undefined };

/** Todo lo que no es la disyuntiva de `iconOnly`. Para componentes que envuelven `Button` y lo fijan. */
export interface ButtonBaseProps
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
   * and `size`. Con `iconOnly` el tipo exige `aria-label` o `aria-labelledby`:
   * sin texto visible no hay otra forma de nombrar el control.
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

export type ButtonProps = ButtonBaseProps & ButtonIconOnlyProps;

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

  const rendered = useRender({
    render,
    ref,
    enabled: render !== undefined,
    props: {
      className: classes,
      onClick: onClick as React.MouseEventHandler<HTMLElement>,
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
