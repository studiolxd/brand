import { type ReactNode } from 'react';
import './AppHeader.css';
export interface AppHeaderProps {
    /** Tras el botón de menú: breadcrumb, buscador, título de página… */
    start?: ReactNode;
    /** Antes del avatar: la campana con su contador. Sitio fijo. */
    notifications?: ReactNode;
    /** Al final, siempre: el `UserMenu` (compacto). */
    end?: ReactNode;
    /** Texto accesible del botón de menú. */
    menuLabel?: string;
    /** Texto accesible del botón cuando la sidebar está abierta («Cerrar menú»). */
    menuCloseLabel?: string;
    /** id de la sidebar que gobierna el botón (`aria-controls`). */
    sidebarId?: string;
}
/**
 * La barra superior de la aplicación, en todos los anchos. A la izquierda el
 * botón de menú, que abre el cajón en móvil y pliega/despliega la sidebar en
 * escritorio; a la derecha, notificaciones y cuenta. Entre medias, lo que la
 * página necesite.
 */
export declare function AppHeader({ start, notifications, end, menuLabel, menuCloseLabel, sidebarId, }: AppHeaderProps): import("react/jsx-runtime").JSX.Element;
