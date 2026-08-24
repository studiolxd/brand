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

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Sección del panel: agrupa un bloque de navegación (p. ej. el árbol de
 * carpetas) separándolo del resto por su propio espacio vertical.
 */
export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return <div className={['sidebar__group', className].filter(Boolean).join(' ')} {...props} />;
}

/** Contenido de una sección — la lista en sí, sin el espacio del grupo. */
export function SidebarGroupContent({ className, ...props }: SidebarGroupProps) {
  return (
    <div className={['sidebar__group-content', className].filter(Boolean).join(' ')} {...props} />
  );
}

/** Línea divisoria entre secciones del panel. */
export function SidebarSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr className={['sidebar__separator', className].filter(Boolean).join(' ')} {...props} />
  );
}
