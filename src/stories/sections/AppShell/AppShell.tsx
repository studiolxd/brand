import { useState, useEffect, useCallback, useSyncExternalStore, type ReactNode } from 'react';
import { SidebarContext } from './SidebarContext';
import './AppShell.css';

// Re-export de API pública del subpath ./app-shell; solo penaliza el HMR de
// desarrollo (full reload en lugar de hot reload para este archivo).
// eslint-disable-next-line react-refresh/only-export-components
export { useSidebar } from './SidebarContext';
export type { SidebarContextValue } from './SidebarContext';

const MOBILE_MQ = '(max-width: 1023px)';
const DEFAULT_STORAGE_KEY = 'sidebar-collapsed';

// matchMedia como external store para useSyncExternalStore.
function subscribeToBreakpoint(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_MQ);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}
const getIsMobile = () => window.matchMedia(MOBILE_MQ).matches;
const getServerIsMobile = () => false;

// localStorage como external store: el evento 'storage' cubre escrituras
// desde otras pestañas; los listeners locales, las de esta pestaña (donde
// 'storage' no se dispara).
const storageListeners = new Set<() => void>();
function subscribeToStorage(onChange: () => void) {
  storageListeners.add(onChange);
  window.addEventListener('storage', onChange);
  return () => {
    storageListeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}
function writeStorage(key: string, value: string) {
  localStorage.setItem(key, value);
  storageListeners.forEach((listener) => listener());
}
const getServerStored = () => null;

export interface AppShellProps {
  sidebar: ReactNode;
  children: ReactNode;
  defaultCollapsed?: boolean;
  storageKey?: string;
}

export function AppShell({ sidebar, children, defaultCollapsed, storageKey = DEFAULT_STORAGE_KEY }: AppShellProps) {
  // Estados externos: breakpoint y preferencia persistida. En servidor (y en
  // el primer render de hidratación) se usan los snapshots de servidor y
  // React re-renderiza con los valores reales tras montar.
  const isMobile = useSyncExternalStore(subscribeToBreakpoint, getIsMobile, getServerIsMobile);
  const stored = useSyncExternalStore(subscribeToStorage, () => localStorage.getItem(storageKey), getServerStored);

  // Elección explícita del usuario en el breakpoint actual; se descarta al
  // cruzar el breakpoint (al entrar en móvil el sidebar siempre colapsa).
  const [override, setOverride] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setMounted(true));
    const unsubscribe = subscribeToBreakpoint(() => setOverride(null));
    return () => {
      cancelAnimationFrame(rafId);
      unsubscribe();
    };
  }, []);

  const desktopCollapsed = defaultCollapsed !== undefined ? defaultCollapsed : stored === 'true';
  const collapsed = override ?? (isMobile ? true : desktopCollapsed);

  const setCollapsed = useCallback((value: boolean) => {
    setOverride(value);
    if (!window.matchMedia(MOBILE_MQ).matches) {
      writeStorage(storageKey, String(value));
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
