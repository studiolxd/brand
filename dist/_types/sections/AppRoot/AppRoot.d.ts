import type { ReactNode } from 'react';
export interface AppRootProps {
    /** Texto del enlace de salto al contenido. */
    skipLabel?: string;
    /** Destino del salto: el `id` del contenido principal de la página. */
    skipHref?: string;
    children: ReactNode;
}
/**
 * La raíz de cualquier sitio o aplicación de Studio LXD: lo primero del
 * documento. Pone el enlace de salto al contenido una sola vez —antes de
 * cualquier cabecera— y deja el resto al producto. Va en el layout raíz,
 * envolviendo a todo.
 */
export declare function AppRoot({ skipLabel, skipHref, children }: AppRootProps): import("react/jsx-runtime").JSX.Element;
