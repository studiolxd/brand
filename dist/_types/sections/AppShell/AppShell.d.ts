import { type ReactNode } from 'react';
import { type SidebarState } from './AppShellContext';
import './AppShell.css';
export { useAppShell } from './AppShellContext';
export type { AppShellContextValue, SidebarState } from './AppShellContext';
export interface AppShellProps {
    /**
     * Ranura para una barra de sistema (`Banner`), **por encima de todo, incluida
     * la cabecera**. Es para el estado de sesión que no se puede perder de vista
     * —la suplantación es el caso de referencia—, no para un aviso de pantalla:
     * eso es un `Alert` dentro del contenido.
     *
     * El armazón la mide (`ResizeObserver`) y publica su alto en
     * `--app-shell-banner-height`, de donde lo toman el cajón de la sidebar y su
     * velo para arrancar por debajo de cabecera **más** barra en móvil.
     */
    banner?: ReactNode;
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
    /**
     * Texto del enlace de salto al contenido (`SkipLink`). **Sin default**: sin
     * él, sale de `appShell.skipToContent` del `BrandMessagesProvider`.
     */
    skipLabel?: string;
}
/**
 * El único texto que el armazón dice por su cuenta, y es **cromo**: el enlace
 * de salto al contenido dice lo mismo en todas las pantallas de todas las
 * aplicaciones. Lo que hay dentro del armazón —la barra, la navegación, la
 * página— lo escribe el producto.
 */
export interface AppShellMessages {
    /** Texto del enlace de salto al contenido. */
    skipToContent: string;
}
/**
 * El armazón de una aplicación: barra superior, barra lateral y contenido.
 * Lleva el estado de la sidebar (abierta, rail o cerrada; su ancho) y lo
 * comparte por contexto con `AppHeader` (el botón de menú), `Sidebar` (su
 * modo y su asa) y `SidebarNav` (rail). Persistir el estado es del producto:
 * `onSidebarChange` / `onSidebarWidthChange` avisan de cada cambio.
 */
export declare function AppShell({ banner, header, sidebar, children, defaultSidebar, sidebarState, onSidebarChange, defaultSidebarWidth, onSidebarWidthChange, skipLabel, }: AppShellProps): import("react/jsx-runtime").JSX.Element;
