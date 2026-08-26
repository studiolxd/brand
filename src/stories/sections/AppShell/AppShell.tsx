'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AppShellContext, type SidebarState } from './AppShellContext';
import { TooltipProvider } from '../../atoms/Tooltip/Tooltip';
import './AppShell.css';

// Re-export de API pública del subpath ./app-shell; solo penaliza el HMR de
// desarrollo (full reload en lugar de hot reload para este archivo).
// eslint-disable-next-line react-refresh/only-export-components
export { useAppShell } from './AppShellContext';
export type { AppShellContextValue, SidebarState } from './AppShellContext';

/** Mismo punto de ruptura que `--breakpoint-lg`: donde el cajón pasa a columna. */
const DESKTOP_MQ = '(min-width: 1024px)';

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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(DESKTOP_MQ).matches,
  );
  useEffect(() => {
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
  header,
  sidebar,
  children,
  defaultSidebar = 'open',
  sidebarState,
  onSidebarChange,
  defaultSidebarWidth,
  onSidebarWidthChange,
}: AppShellProps) {
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

  // Al cruzar a escritorio el cajón deja de existir por construcción (`drawer`
  // exige !isDesktop); su flag se limpia en el siguiente cierre.
  const drawer = !isDesktop && drawerOpen;
  return (
    <AppShellContext.Provider value={value}>
      <TooltipProvider>
        <div
          className="app-shell"
          data-sidebar={sidebarValue}
          style={width ? ({ '--app-shell-sidebar-width': `${width}px` } as React.CSSProperties) : undefined}
        >
          {header}
          <div className="app-shell__body">
            {sidebar}
            {drawer && <div className="app-shell__backdrop" onClick={closeSidebar} aria-hidden="true" />}
            <main className="app-shell__content" inert={drawer || undefined}>
              {children}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </AppShellContext.Provider>
  );
}
