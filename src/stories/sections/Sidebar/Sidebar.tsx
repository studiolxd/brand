import { useContext, type ReactNode } from 'react';
import { SidebarContext } from '../AppShell/SidebarContext';
import './Sidebar.css';

export interface SidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  id?: string;
}

export function Sidebar({ open: openProp, onOpenChange, children, id }: SidebarProps) {
  const ctx = useContext(SidebarContext);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : (ctx?.open ?? false);

  const handleClose = () => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      ctx?.setOpen(false);
    }
  };

  return (
    <div className="sidebar" data-open={open ? 'true' : 'false'} id={id}>
      <div className="sidebar__backdrop" onClick={handleClose} aria-hidden="true" />
      <div className="sidebar__panel">{children}</div>
    </div>
  );
}
