import type { ReactNode } from 'react';
import './Sidebar.css';

export interface SidebarProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  id?: string;
}

export function Sidebar({ open, onOpenChange, children, id }: SidebarProps) {
  return (
    <div className="sidebar" data-open={open ? 'true' : 'false'} id={id}>
      <div
        className="sidebar__backdrop"
        onClick={() => onOpenChange?.(false)}
        aria-hidden="true"
      />
      <div className="sidebar__panel">{children}</div>
    </div>
  );
}
