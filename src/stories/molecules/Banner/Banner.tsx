'use client';

import { forwardRef } from 'react';
import { CloseButton } from '../../atoms/CloseButton/CloseButton';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './Banner.css';

/**
 * El cromo de la barra. Solo hay uno: el aspa. Lo que la barra DICE
 * (`children`) y lo que ofrezcan sus acciones son contenido —«estás viendo la
 * aplicación como alguien», «dejar de suplantar»— y los pone la aplicación.
 */
export interface BannerMessages {
  /** Nombre accesible del aspa que descarta la barra. */
  dismiss: string;
}

export type BannerVariant = 'info' | 'warning';

export interface BannerProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Intención de la barra. Default `'info'` (relleno prusia); `'warning'` es el relleno de aviso. */
  variant?: BannerVariant;
  /** El mensaje. Texto corriente: una frase, no un bloque. */
  children?: React.ReactNode;
  /** Ranura para las acciones — normalmente un `Button` del sistema. */
  actions?: React.ReactNode;
  /**
   * Qué hacer al descartar. Si se pasa, la barra pinta el aspa. La barra **no
   * se oculta sola**: es de sistema y quien decide si sigue en pantalla es la
   * aplicación, que sabe si la condición que la provocó sigue vigente.
   */
  onDismiss?: () => void;
  /**
   * Nombre accesible del aspa. **Sin default**: sin él, sale de
   * `banner.dismiss` del `BrandMessagesProvider`. Solo se lee cuando el aspa
   * se pinta, o sea cuando hay `onDismiss`.
   */
  dismissLabel?: string;
}

/**
 * Barra de sistema: un aviso persistente, a ancho completo, que acompaña a toda
 * la sesión y vive **fuera** del contenido —el caso de referencia es «estás
 * viendo la aplicación como alguien» con el botón de dejar de suplantar—.
 *
 * No es un `Alert`: el alert va **en el flujo**, dentro del contenido, y habla
 * de lo que hay a su alrededor (un formulario que falló, un dato que hace
 * falta). El banner habla del estado de la sesión entera y por eso no se
 * intercala en la lectura: se pega arriba (o abajo) del chrome.
 *
 * No fija su posición: `sticky` lo decide la aplicación con el layout del
 * sistema. Tampoco se oculta sola — `onDismiss` avisa y la app decide.
 *
 * Anuncia como `role="status"` con `aria-live="polite"`, que es lo que
 * corresponde a un aviso que no interrumpe. Ambos se pueden sobrescribir.
 *
 * Extiende los atributos nativos de `<div>` y reenvía `{...rest}` al raíz.
 */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner({
  variant = 'info',
  children,
  actions,
  onDismiss,
  dismissLabel,
  className,
  role,
  'aria-live': ariaLive,
  ...rest
}, ref) {
  const t = useBrandMessages('banner');
  const classes = [
    'banner',
    `banner--${variant}`,
    // El relleno de `info` es prusia y es universal: declara su cara en la raíz,
    // así que lo que se componga dentro (el botón de las acciones, un enlace, el
    // aspa) toma la cara clara sin configurarlo. El aviso queda fuera: su
    // relleno es amarillo y su cara es la clara (`interiorSurface`).
    variant === 'info' ? 'surface-dark' : '',
    onDismiss ? 'banner--dismissible' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  // El relleno del aviso es el único claro, y lo es en las dos superficies. Lo
  // que cae dentro tiene que leer en oscuro también cuando la página es oscura
  // y la tinta ambiente es blanca — que es lo que declara `.surface-light`. No
  // va en la raíz: ahí es la superficie ambiente la que decide el relleno.
  const interiorSurface = variant === 'warning' ? ' surface-light' : '';

  return (
    <div
      ref={ref}
      role={role ?? 'status'}
      aria-live={ariaLive ?? 'polite'}
      className={classes}
      {...rest}
    >
      <div className={`banner__content${interiorSurface}`}>{children}</div>
      {actions && <div className={`banner__actions${interiorSurface}`}>{actions}</div>}
      {onDismiss && (
        <CloseButton
          className={`banner__close${interiorSurface}`}
          label={t('dismiss', dismissLabel)}
          onClick={onDismiss}
        />
      )}
    </div>
  );
});
