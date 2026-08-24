'use client';

import { useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { AppShellContext } from '../AppShell/AppShellContext';
import { Hamburger } from '../../atoms/Hamburger/Hamburger';
import './AppHeader.css';

export interface AppHeaderProps {
  /** Slot central (p. ej. OrgSwitcher). Vacío en portales sin organización. */
  center?: ReactNode;
  /** Slot final (p. ej. UserMenu — el CSS del header lo compacta a solo-avatar). */
  end?: ReactNode;
  /** Contenido del panel de navegación a pantalla completa. */
  children: ReactNode;
  /** aria-label del botón de menú. */
  menuLabel?: string;
  /** id del panel (aria-controls del botón de menú). */
  panelId?: string;
}

export function AppHeader({
  center,
  end,
  children,
  menuLabel = 'Menú de navegación',
  panelId = 'app-header-panel',
}: AppHeaderProps) {
  // Dentro de AppShell usa su contexto; standalone (Storybook) usa estado local.
  const ctx = useContext(AppShellContext);
  const [localOpen, setLocalOpen] = useState(false);
  const open = ctx ? ctx.menuOpen : localOpen;
  const setOpen = ctx ? ctx.setMenuOpen : setLocalOpen;

  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      hamburgerRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  return (
    <>
      <header className="app-header">
        <Hamburger
          ref={hamburgerRef}
          isOpen={open}
          onClick={() => setOpen(!open)}
          label={menuLabel}
          aria-controls={panelId}
        />
        <div className="app-header__center">{center}</div>
        <div className="app-header__end">{end}</div>
      </header>
      <div className="app-header__panel" id={panelId} hidden={!open}>
        {children}
      </div>
    </>
  );
}