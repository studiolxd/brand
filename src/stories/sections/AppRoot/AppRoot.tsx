import type { ReactNode } from 'react';
import { SkipLink } from '../../atoms/SkipLink/SkipLink';

export interface AppRootProps {
  /** Texto del enlace de salto al contenido. */
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
export function AppRoot({ skipLabel = 'Saltar al contenido principal', skipHref = '#main-content', children }: AppRootProps) {
  return (
    <>
      <SkipLink href={skipHref}>{skipLabel}</SkipLink>
      {children}
    </>
  );
}
