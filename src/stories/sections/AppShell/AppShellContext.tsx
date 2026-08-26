'use client';

import { createContext, useContext } from 'react';

/** Estado de la barra lateral. En móvil solo existen `open` (cajón) y `closed`. */
export type SidebarState = 'open' | 'rail' | 'closed';

export interface AppShellContextValue {
  sidebar: SidebarState;
  setSidebar: (state: SidebarState) => void;
  /** Ancho de la sidebar desplegada en escritorio, en px. */
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  /** Alterna la sidebar: abierta ↔ cerrada (desde rail, abre). */
  toggleSidebar: () => void;
  closeSidebar: () => void;
  /** ≥ breakpoint lg: la sidebar es una columna; por debajo, un cajón. */
  isDesktop: boolean;
}

export const AppShellContext = createContext<AppShellContextValue | null>(null);

export function useAppShell(): AppShellContextValue {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error('useAppShell must be used within AppShell');
  return ctx;
}
