'use client';

import { forwardRef } from 'react';
import { Button, type ButtonBaseProps } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { NumberBadge } from '../../atoms/NumberBadge/NumberBadge';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './NotificationButton.css';

/**
 * El cromo de la campana, y **solo el cromo**: cómo se llama el botón, con
 * contador y sin él. La campana no dice nada más —el número lo pinta el
 * `NumberBadge` y las notificaciones viven en otro sitio—, así que los dos
 * textos son todo lo que emite por su cuenta, y ninguno cambia de pantalla a
 * pantalla.
 */
export interface NotificationButtonMessages {
  /** Nombre accesible cuando no hay contador. */
  label: string;
  /** Nombre accesible cuando hay contador. Recibe el número. */
  countLabel: (count: number) => string;
}

export interface NotificationButtonProps extends Omit<ButtonBaseProps, 'variant' | 'iconOnly' | 'children' | 'href' | 'size'> {
  /** Notificaciones sin leer. Con 0 (o sin él) no hay contador. */
  count?: number;
  /** Tope del contador («99+»). */
  max?: number;
  /**
   * Nombre accesible cuando no hay contador. **Sin default**: sin ella, sale
   * de `notificationButton.label` del `BrandMessagesProvider`.
   */
  label?: string;
  /**
   * Nombre accesible cuando hay contador: recibe el número, para que la frase
   * se pueda rehacer en cualquier idioma. **Sin default**: sin ella, sale de
   * `notificationButton.countLabel` del proveedor.
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
    label,
    countLabel,
    className,
    ...rest
  },
  ref,
) {
  const t = useBrandMessages('notificationButton');
  // Cada texto se lee donde se pinta: una campana sin contador no exige
  // `countLabel`, y una con contador no exige `label`.
  const name = count > 0 ? t('countLabel', countLabel)(count) : t('label', label);
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
