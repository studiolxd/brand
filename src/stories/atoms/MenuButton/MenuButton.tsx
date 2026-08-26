import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Icon } from '../Icon/Icon';
import './MenuButton.css';

export interface MenuButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  /** Estado del menú que gobierna. Abierto, el glifo `menu` se convierte en `close`. */
  isOpen?: boolean;
  /** Texto accesible. Dice qué abre, no qué forma tiene. */
  label?: string;
  /** Texto accesible cuando el menú está abierto («Cerrar menú»). Sin él, se usa `label` con `aria-expanded`. */
  closeLabel?: string;
  /** Talla del botón: un cuadrado de 32 o 40px. */
  size?: 'sm' | 'md';
}

/**
 * Botón que abre y cierra un menú. Dibuja el icono `menu` del catálogo y, al
 * abrir, anima sus tres líneas hasta el aspa del icono `close`: las dos formas
 * son la misma geometría, así que el botón nunca diverge del catálogo.
 */
export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(function MenuButton(
  { isOpen = false, label = 'Menú', closeLabel, size = 'md', className, ...rest },
  ref,
) {
  const classes = ['menu-button', `menu-button--${size}`, className].filter(Boolean).join(' ');
  return (
    <button ref={ref} type="button" className={classes} aria-label={isOpen && closeLabel ? closeLabel : label} aria-expanded={isOpen} {...rest}>
      <Icon name="menu" size="md" className="menu-button__icon" />
    </button>
  );
});
