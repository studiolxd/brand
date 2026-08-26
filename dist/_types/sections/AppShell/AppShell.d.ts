import { type ReactNode } from 'react';
import { type SidebarState } from './AppShellContext';
import './AppShell.css';
export { useAppShell } from './AppShellContext';
export type { AppShellContextValue, SidebarState } from './AppShellContext';
export interface AppShellProps {
    /** La barra superior: un `AppHeader`. Siempre visible. */
    header: ReactNode;
    /** La barra lateral: un `Sidebar`. Columna en escritorio, cajón en móvil. */
    sidebar: ReactNode;
    children: ReactNode;
    /** Estado inicial de la sidebar en escritorio (en móvil siempre arranca cerrada). */
    defaultSidebar?: SidebarState;
    /** Estado controlado de la sidebar en escritorio. */
    sidebarState?: SidebarState;
    onSidebarChange?: (state: SidebarState) => void;
    /** Ancho inicial de la sidebar desplegada (px). Sin él, el token `sidebar.width`. */
    defaultSidebarWidth?: number;
    onSidebarWidthChange?: (width: number) => void;
}
/**
 * El armazón de una aplicación: barra superior, barra lateral y contenido.
 * Lleva el estado de la sidebar (abierta, rail o cerrada; su ancho) y lo
 * comparte por contexto con `AppHeader` (el botón de menú), `Sidebar` (su
 * modo y su asa) y `SidebarNav` (rail). Persistir el estado es del producto:
 * `onSidebarChange` / `onSidebarWidthChange` avisan de cada cambio.
 */
export declare function AppShell({ header, sidebar, children, defaultSidebar, sidebarState, onSidebarChange, defaultSidebarWidth, onSidebarWidthChange, }: AppShellProps): import("react/jsx-runtime").JSX.Element;
