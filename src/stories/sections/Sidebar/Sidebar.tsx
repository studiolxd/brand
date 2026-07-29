import type { ReactNode } from 'react';
import './Sidebar.css';

export interface SidebarProps {
  logo?: ReactNode;
  children: ReactNode;
  /** Slot inferior fijo (p. ej. UserMenu), fuera del scroll del panel. */
  footer?: ReactNode;
  id?: string;
  /** Mantiene el rail siempre desplegado en escritorio, sin depender de hover/foco. */
  expanded?: boolean;
}

export function Sidebar({ logo, children, footer, id, expanded }: SidebarProps) {
  return (
    <div className={expanded ? 'sidebar sidebar--expanded' : 'sidebar'} id={id}>
      {logo && (
        <div className="sidebar__header">
          <div className="sidebar__logo">{logo}</div>
        </div>
      )}
      <div className="sidebar__panel">{children}</div>
      {footer && <div className="sidebar__footer">{footer}</div>}
    </div>
  );
}
