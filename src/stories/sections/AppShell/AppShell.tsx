import { useState, type ReactNode } from 'react';
import { SidebarContext } from './SidebarContext';
import './AppShell.css';

function getInitialOpen(defaultOpen?: boolean): boolean {
  if (defaultOpen !== undefined) return defaultOpen;
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(min-width: 1024px)').matches;
}

export interface AppShellProps {
  sidebar: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AppShell({ sidebar, children, defaultOpen }: AppShellProps) {
  const [open, setOpen] = useState(() => getInitialOpen(defaultOpen));

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div className="app-shell">
        {sidebar}
        <div className="app-shell__content">{children}</div>
      </div>
    </SidebarContext.Provider>
  );
}
