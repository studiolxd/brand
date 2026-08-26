'use client';

import { useContext, useState, type ReactNode } from 'react';
import { AppShellContext } from '../AppShell/AppShellContext';
import { MenuButton } from '../../atoms/MenuButton/MenuButton';
import './AppHeader.css';

export interface AppHeaderProps {
  /** Tras el botón de menú: breadcrumb, buscador, título de página… */
  start?: ReactNode;
  /** Antes del avatar: la campana con su contador. Sitio fijo. */
  notifications?: ReactNode;
  /** Al final, siempre: el `UserMenu` (compacto). */
  end?: ReactNode;
  /** Texto accesible del botón de menú. */
  menuLabel?: string;
  /** id de la sidebar que gobierna el botón (`aria-controls`). */
  sidebarId?: string;
}

/**
 * La barra superior de la aplicación, en todos los anchos. A la izquierda el
 * botón de menú, que abre el cajón en móvil y pliega/despliega la sidebar en
 * escritorio; a la derecha, notificaciones y cuenta. Entre medias, lo que la
 * página necesite.
 */
export function AppHeader({
  start,
  notifications,
  end,
  menuLabel = 'Menú de navegación',
  sidebarId,
}: AppHeaderProps) {
  // Dentro de AppShell gobierna la sidebar; suelto (Storybook), estado local.
  const shell = useContext(AppShellContext);
  const [localOpen, setLocalOpen] = useState(false);
  const open = shell ? shell.sidebar === 'open' : localOpen;
  const toggle = shell ? shell.toggleSidebar : () => setLocalOpen((v) => !v);

  return (
    <header className="app-header">
      <MenuButton isOpen={open} onClick={toggle} label={menuLabel} aria-controls={sidebarId} aria-expanded={open} />
      <div className="app-header__start">{start}</div>
      {notifications && <div className="app-header__notifications">{notifications}</div>}
      {end && <div className="app-header__end">{end}</div>}
    </header>
  );
}
