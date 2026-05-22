import { useContext, useState, type ReactNode } from 'react';
import { SidebarContext } from '../AppShell/SidebarContext';
import { Icon } from '../../atoms/Icon/Icon';
import './Sidebar.css';

export interface SidebarProps {
  logo?: ReactNode;
  children: ReactNode;
  id?: string;
}

export function Sidebar({ logo, children, id }: SidebarProps) {
  const ctx = useContext(SidebarContext);
  const [localCollapsed, setLocalCollapsed] = useState(false);
  const collapsed = ctx ? ctx.collapsed : localCollapsed;
  const setCollapsed = ctx ? ctx.setCollapsed : setLocalCollapsed;

  return (
    <div className="sidebar" data-collapsed={collapsed ? 'true' : 'false'} id={id}>
      <div className="sidebar__header">
        <div className="sidebar__logo">{logo}</div>
        <button
          type="button"
          className="sidebar__collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Expandir sidebar' : 'Plegar sidebar'}
        >
          <Icon name="chevron" className="sidebar__collapse-icon" size="sm" />
        </button>
      </div>
      <div className="sidebar__panel">{children}</div>
    </div>
  );
}
