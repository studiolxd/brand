import { useState, type ReactNode } from 'react';
import { SidebarContext } from './SidebarContext';
import './AppShell.css';

export { useSidebar } from './SidebarContext';
export type { SidebarContextValue } from './SidebarContext';


export interface AppShellProps {
  sidebar: ReactNode;
  children: ReactNode;
  defaultCollapsed?: boolean;
}

export function AppShell({ sidebar, children, defaultCollapsed }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(() => {
    if (defaultCollapsed !== undefined) return defaultCollapsed;
    return typeof window !== 'undefined' && window.innerWidth < 1024;
  });

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="app-shell">
        {sidebar}
        <div className="app-shell__content">{children}</div>
      </div>
    </SidebarContext.Provider>
  );
}
