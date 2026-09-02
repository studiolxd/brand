'use client';

import { forwardRef } from 'react';
import { Button, type ButtonBaseProps } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { NumberBadge } from '../../atoms/NumberBadge/NumberBadge';
import './NotificationButton.css';

export interface NotificationButtonProps extends Omit<ButtonBaseProps, 'variant' | 'iconOnly' | 'children' | 'href' | 'size'> {
  /** Notificaciones sin leer. Con 0 (o sin él) no hay contador. */
  count?: number;
  /** Tope del contador («99+»). */
  max?: number;
  /**
   * Nombre accesible cuando no hay contador. Default: «Notificaciones»
   * (castellano). Una app multiidioma debe pasarla traducida.
   */
  label?: string;
  /**
   * Nombre accesible cuando hay contador: recibe el número, para que la frase
   * se pueda rehacer en cualquier idioma. Default: «Notificaciones: N sin
   * leer» (castellano).
   */
  countLabel?: (count: number) => string;
}

/**
 * La campana de la barra de la aplicación: un botón de icono con el contador
 * de no leídas volando sobre su esquina, en rojo. Qué abre (un panel, un
 * menú, una página) es del producto: es un botón y sirve de disparador.
 */
export const NotificationButton = forwardRef<HTMLButtonElement, NotificationButtonProps>(function NotificationButton(
  {
    count = 0,
    max = 99,
    label = 'Notificaciones',
    countLabel = (n) => `Notificaciones: ${n} sin leer`,
    className,
    ...rest
  },
  ref,
) {
  const name = count > 0 ? countLabel(count) : label;
  return (
    <Button
      ref={ref}
      variant="ghost"
      iconOnly
      size="md"
      aria-label={name}
      className={['notification-button', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <Icon name="bell" size="md" />
      {count > 0 && (
        <NumberBadge count={count} max={max} variant="danger" aria-hidden="true" className="notification-button__badge" />
      )}
    </Button>
  );
});
