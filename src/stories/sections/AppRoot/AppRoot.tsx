'use client';

import type { ReactNode } from 'react';
import { SkipLink } from '../../atoms/SkipLink/SkipLink';
import { useBrandMessages } from '../../messages/BrandMessagesContext';

/**
 * El único texto de la raíz, y es **cromo**: el enlace de salto al contenido
 * dice lo mismo en todo el documento y en todos los productos.
 */
export interface AppRootMessages {
  /** Texto del enlace de salto al contenido. */
  skipToContent: string;
}

export interface AppRootProps {
  /**
   * Texto del enlace de salto al contenido. **Sin default**: sin él, sale de
   * `appRoot.skipToContent` del `BrandMessagesProvider`.
   */
  skipLabel?: string;
  /** Destino del salto: el `id` del contenido principal de la página. */
  skipHref?: string;
  /** El resto del documento. Puede ir como hermano (`<AppRoot />` antes del contenido): lo que importa es que el salto sea lo primero. */
  children?: ReactNode;
}

/**
 * La raíz de cualquier sitio o aplicación de Studio LXD: lo primero del
 * documento. Pone el enlace de salto al contenido una sola vez —antes de
 * cualquier cabecera— y deja el resto al producto. Va en el layout raíz,
 * envolviendo a todo.
 */
export function AppRoot({ skipLabel, skipHref = '#main-content', children }: AppRootProps) {
  const t = useBrandMessages('appRoot');
  return (
    <>
      <SkipLink href={skipHref}>{t('skipToContent', skipLabel)}</SkipLink>
      {children}
    </>
  );
}
