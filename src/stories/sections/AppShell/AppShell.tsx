'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { AppShellContext } from './AppShellContext';
import './AppShell.css';

// Re-export de API pública del subpath ./app-shell; solo penaliza el HMR de
// desarrollo (full reload en lugar de hot reload para este archivo).
// eslint-disable-next-line react-refresh/only-export-components
export { useAppShell } from './AppShellContext';
export type { AppShellContextValue } from './AppShellContext';

const DESKTOP_MQ = '(min-width: 1024px)';

export interface AppShellProps {
  /** Chrome de escritorio (≥1024px): un <Sidebar>. */
  sidebar: ReactNode;
  /** Chrome móvil (<1024px): un <AppHeader>. */
  header?: ReactNode;
  children: ReactNode;
}

export function AppShell({ sidebar, header, children }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Higiene de estado: si el viewport cruza a desktop con el menú abierto,
  // se cierra (el header desaparece por CSS y no habría forma de cerrarlo).
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <AppShellContext.Provider value={{ menuOpen, setMenuOpen }}>
      <div className="app-shell" data-menu-open={menuOpen || undefined}>
        {header}
        {sidebar}
        <div className="app-shell__content" inert={menuOpen || undefined}>
          {children}
        </div>
      </div>
    </AppShellContext.Provider>
  );
}