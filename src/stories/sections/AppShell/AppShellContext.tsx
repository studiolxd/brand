import { createContext, useContext } from 'react';

export interface AppShellContextValue {
  /** Menú de navegación móvil desplegado (solo aplica <1024px; en desktop siempre false). */
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export const AppShellContext = createContext<AppShellContextValue | null>(null);

export function useAppShell(): AppShellContextValue {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error('useAppShell must be used within AppShell');
  return ctx;
}
