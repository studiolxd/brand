import { type ReactNode } from 'react';
import './AppHeader.css';
export interface AppHeaderProps {
    /** Slot central (p. ej. OrgSwitcher). Vacío en portales sin organización. */
    center?: ReactNode;
    /** Slot final (p. ej. UserMenu — el CSS del header lo compacta a solo-avatar). */
    end?: ReactNode;
    /** Contenido del panel de navegación a pantalla completa. */
    children: ReactNode;
    /** aria-label del botón de menú. */
    menuLabel?: string;
    /** id del panel (aria-controls del botón de menú). */
    panelId?: string;
}
export declare function AppHeader({ center, end, children, menuLabel, panelId, }: AppHeaderProps): import("react/jsx-runtime").JSX.Element;
