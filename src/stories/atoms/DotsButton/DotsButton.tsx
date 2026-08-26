import { forwardRef } from 'react';
import { Button, type ButtonProps } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import './DotsButton.css';

export interface DotsButtonProps extends Omit<ButtonProps, 'variant' | 'iconOnly' | 'children' | 'href'> {
  /** Talla del sistema (32/40/48). */
  size?: 'sm' | 'md' | 'lg';
  /** Puntos en fila (por defecto) o en columna. */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * El botón de «más opciones»: un `Button` ghost de solo icono con el icono
 * `dots`. No tiene cara propia — es el botón del sistema — y su sitio es
 * disparar un `ContextMenu` o un `Popover`.
 */
export const DotsButton = forwardRef<HTMLButtonElement, DotsButtonProps>(function DotsButton(
  { size = 'md', orientation = 'horizontal', 'aria-label': ariaLabel = 'Más opciones', className, ...rest },
  ref,
) {
  const classes = ['dots-button', orientation === 'vertical' ? 'dots-button--vertical' : '', className]
    .filter(Boolean).join(' ');
  return (
    <Button ref={ref} variant="ghost" iconOnly size={size} aria-label={ariaLabel} className={classes} {...rest}>
      <Icon name="dots" size={size === 'lg' ? 'md' : 'sm'} />
    </Button>
  );
});
