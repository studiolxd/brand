'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AppShellContext, type SidebarState } from './AppShellContext';
import { TooltipProvider } from '../../atoms/Tooltip/Tooltip';
import { SkipLink } from '../../atoms/SkipLink/SkipLink';
import { useCssProperties } from '../../constants/css-properties';
import './AppShell.css';
import { useBrandMessages } from '../../messages/BrandMessagesContext';

// Re-export de API pública del subpath ./app-shell; solo penaliza el HMR de
// desarrollo (full reload en lugar de hot reload para este archivo).
// eslint-disable-next-line react-refresh/only-export-components
export { useAppShell } from './AppShellContext';
export type { AppShellContextValue, SidebarState } from './AppShellContext';

/** Mismo punto de ruptura que `--breakpoint-lg`: donde el cajón pasa a columna. */
const DESKTOP_MQ = '(min-width: 1024px)';

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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' || typeof window.matchMedia !== 'function'
      ? true
      : window.matchMedia(DESKTOP_MQ).matches,
  );
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

/**
 * El armazón de una aplicación: barra superior, barra lateral y contenido.
 * Lleva el estado de la sidebar (abierta, rail o cerrada; su ancho) y lo
 * comparte por contexto con `AppHeader` (el botón de menú), `Sidebar` (su
 * modo y su asa) y `SidebarNav` (rail). Persistir el estado es del producto:
 * `onSidebarChange` / `onSidebarWidthChange` avisan de cada cambio.
 */
export function AppShell({
  banner,
  header,
  sidebar,
  children,
  defaultSidebar = 'open',
  sidebarState,
  onSidebarChange,
  defaultSidebarWidth,
  onSidebarWidthChange,
  skipLabel,
}: AppShellProps) {
  const t = useBrandMessages('appShell');
  const isDesktop = useIsDesktop();
  const [desktopState, setDesktopState] = useState<SidebarState>(defaultSidebar);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [width, setWidth] = useState<number | undefined>(defaultSidebarWidth);

  const desktop = sidebarState ?? desktopState;
  const sidebarValue: SidebarState = isDesktop ? desktop : drawerOpen ? 'open' : 'closed';

  const setSidebar = useCallback(
    (next: SidebarState) => {
      if (isDesktop) {
        setDesktopState(next);
        onSidebarChange?.(next);
      } else {
        setDrawerOpen(next === 'open');
      }
    },
    [isDesktop, onSidebarChange],
  );
  const toggleSidebar = useCallback(
    () => setSidebar(sidebarValue === 'open' ? 'closed' : 'open'),
    [setSidebar, sidebarValue],
  );
  const closeSidebar = useCallback(() => setSidebar('closed'), [setSidebar]);
  const setSidebarWidth = useCallback(
    (next: number) => {
      setWidth(next);
      onSidebarWidthChange?.(next);
    },
    [onSidebarWidthChange],
  );

  // Cajón abierto: Escape lo cierra y la página no hace scroll.
  useEffect(() => {
    if (isDesktop || !drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [isDesktop, drawerOpen]);

  const value = useMemo(
    () => ({
      sidebar: sidebarValue,
      setSidebar,
      sidebarWidth: width ?? 0,
      setSidebarWidth,
      toggleSidebar,
      closeSidebar,
      isDesktop,
    }),
    [sidebarValue, setSidebar, width, setSidebarWidth, toggleSidebar, closeSidebar, isDesktop],
  );

  // El alto de la barra de sistema no se puede dar por sabido: lo decide su
  // contenido (el mensaje parte en dos líneas en móvil, las acciones apilan) y
  // cambia al redimensionar. Se mide con un `ResizeObserver` y se publica en
  // `--app-shell-banner-height`, que es lo que suman el cajón de la sidebar y
  // su velo a la altura de la cabecera para arrancar por debajo de las dos.
  // Sin `ResizeObserver` (jsdom sin polyfill) se mide una vez y no se observa.
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const medir = () => setBannerHeight(node.getBoundingClientRect().height);
    medir();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(medir);
    observer.observe(node);
    return () => {
      observer.disconnect();
      setBannerHeight(0);
    };
  }, []);

  // Al cruzar a escritorio el cajón deja de existir por construcción (`drawer`
  // exige !isDesktop); su flag se limpia en el siguiente cierre.
  const shellRef = useCssProperties({
    '--app-shell-sidebar-width': width ? `${width}px` : undefined,
    '--app-shell-banner-height': banner ? `${bannerHeight}px` : undefined,
  });
  const drawer = !isDesktop && drawerOpen;
  // El ancho de la barra lo fija el usuario arrastrando: es un dato de cliente
  // y se escribe por el CSSOM, no en un atributo `style` (que una app con
  // `style-src 'self'` descartaría sin avisar). En el HTML del servidor la
  // barra sale con el ancho del token `sidebar.width`.
  return (
    <AppShellContext.Provider value={value}>
      <TooltipProvider>
        <SkipLink href="#main-content">{t('skipToContent', skipLabel)}</SkipLink>
        <div
          ref={shellRef}
          className="app-shell"
          data-sidebar={sidebarValue}
        >
          {banner && (
            <div ref={bannerRef} className="app-shell__banner">
              {banner}
            </div>
          )}
          {header}
          <div className="app-shell__body">
            {sidebar}
            {drawer && <div className="app-shell__backdrop" onClick={closeSidebar} aria-hidden="true" />}
            <main id="main-content" tabIndex={-1} className="app-shell__content" inert={drawer || undefined}>
              {children}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </AppShellContext.Provider>
  );
}
