import type { ReactNode } from 'react';
import './AppShell.css';

export interface AppShellProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppShell({ sidebar, children }: AppShellProps) {
  return (
    <div className="app-shell">
      {sidebar}
      <div className="app-shell__content">{children}</div>
    </div>
  );
}
