import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { SidebarContext } from './SidebarContext';
import './AppShell.css';

export { useSidebar } from './SidebarContext';
export type { SidebarContextValue } from './SidebarContext';

const MOBILE_MQ = '(max-width: 1023px)';
const DEFAULT_STORAGE_KEY = 'sidebar-collapsed';

export interface AppShellProps {
  sidebar: ReactNode;
  children: ReactNode;
  defaultCollapsed?: boolean;
  storageKey?: string;
}

export function AppShell({ sidebar, children, defaultCollapsed, storageKey = DEFAULT_STORAGE_KEY }: AppShellProps) {
  const [collapsed, setCollapsedState] = useState(defaultCollapsed ?? false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia(MOBILE_MQ).matches;

    if (isMobile) {
      setCollapsedState(true);
    } else if (defaultCollapsed !== undefined) {
      setCollapsedState(defaultCollapsed);
    } else {
      const stored = localStorage.getItem(storageKey);
      setCollapsedState(stored === 'true');
    }

    const rafId = requestAnimationFrame(() => setMounted(true));

    const mq = window.matchMedia(MOBILE_MQ);
    const handleBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setCollapsedState(true);
      } else {
        const stored = localStorage.getItem(storageKey);
        setCollapsedState(stored === 'true');
      }
    };
    mq.addEventListener('change', handleBreakpoint);
    return () => {
      cancelAnimationFrame(rafId);
      mq.removeEventListener('change', handleBreakpoint);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setCollapsed = useCallback((value: boolean) => {
    setCollapsedState(value);
    if (!window.matchMedia(MOBILE_MQ).matches) {
      localStorage.setItem(storageKey, String(value));
    }
  }, [storageKey]);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="app-shell" data-mounted={mounted || undefined}>
        {sidebar}
        <div className="app-shell__content">{children}</div>
      </div>
    </SidebarContext.Provider>
  );
}
