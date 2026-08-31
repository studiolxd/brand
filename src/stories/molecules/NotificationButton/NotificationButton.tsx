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
  /** Nombre accesible. Por defecto, «Notificaciones» o «Notificaciones: N sin leer». */
  label?: string;
}

/**
 * La campana de la barra de la aplicación: un botón de icono con el contador
 * de no leídas volando sobre su esquina, en rojo. Qué abre (un panel, un
 * menú, una página) es del producto: es un botón y sirve de disparador.
 */
export const NotificationButton = forwardRef<HTMLButtonElement, NotificationButtonProps>(function NotificationButton(
  { count = 0, max = 99, label, className, ...rest },
  ref,
) {
  const name = label ?? (count > 0 ? `Notificaciones: ${count} sin leer` : 'Notificaciones');
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
