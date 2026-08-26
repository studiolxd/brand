'use client';

import { useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import { AppShellContext } from '../AppShell/AppShellContext';
import { SidebarContext } from './SidebarContext';
import './Sidebar.css';

// eslint-disable-next-line react-refresh/only-export-components
export { useSidebar } from './SidebarContext';

export interface SidebarProps {
  /** Arriba del todo (un `Logo`). */
  logo?: ReactNode;
  /** El panel: `OrgSwitcher`, `SidebarNav`, secciones… */
  children: ReactNode;
  /** Pie fijo, fuera del scroll del panel. */
  footer?: ReactNode;
  id?: string;
  /** Nombre accesible del `aside`. */
  label?: string;
  /** Texto accesible del asa de redimensión. */
  resizerLabel?: string;
  /** Fuerza el modo sin `AppShell` (Storybook, pruebas). Con shell, lo decide el shell. */
  mode?: 'open' | 'rail';
}

function readPx(el: HTMLElement, prop: string): number {
  const probe = document.createElement('div');
  probe.style.position = 'absolute';
  probe.style.inlineSize = `var(${prop})`;
  el.appendChild(probe);
  const px = parseFloat(getComputedStyle(probe).inlineSize);
  probe.remove();
  return px;
}

/**
 * La barra lateral de la aplicación. En escritorio es una columna con tres
 * estados que gobierna el `AppShell`: desplegada (ancho redimensionable
 * arrastrando su borde o con el teclado en el asa), rail (solo iconos; los
 * grupos de navegación se abren como menú) y cerrada. En móvil es un cajón
 * que entra por la izquierda y se cierra al navegar.
 */
export function Sidebar({
  logo,
  children,
  footer,
  id,
  label = 'Barra lateral',
  resizerLabel = 'Ancho de la barra lateral',
  mode,
}: SidebarProps) {
  const shell = useContext(AppShellContext);
  const state = shell ? shell.sidebar : (mode ?? 'open');
  const isDesktop = shell ? shell.isDesktop : true;
  const rail = isDesktop && state === 'rail';
  const drawer = !isDesktop;
  const ref = useRef<HTMLElement>(null);

  // En móvil, navegar cierra el cajón.
  const onClick = (e: React.MouseEvent) => {
    if (!drawer || !shell) return;
    if ((e.target as HTMLElement).closest('a[href]')) shell.closeSidebar();
  };

  // ── Redimensión (solo escritorio, desplegada) ──
  const applyWidth = useCallback(
    (px: number) => {
      const el = ref.current;
      if (!el || !shell) return;
      const min = readPx(el, '--sidebar-min-width');
      const max = readPx(el, '--sidebar-max-width');
      const railW = readPx(el, '--sidebar-rail-width');
      if (px < railW) {
        shell.setSidebar('closed');
      } else if (px < min) {
        shell.setSidebar('rail');
      } else {
        shell.setSidebarWidth(Math.min(max, Math.round(px)));
      }
    },
    [shell],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    e.preventDefault();
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    target.dataset.dragging = 'true';
    const left = ref.current.getBoundingClientRect().left;
    const move = (ev: PointerEvent) => applyWidth(ev.clientX - left);
    const up = () => {
      delete target.dataset.dragging;
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerup', up);
      target.removeEventListener('pointercancel', up);
    };
    target.addEventListener('pointermove', move);
    target.addEventListener('pointerup', up);
    target.addEventListener('pointercancel', up);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!ref.current || !shell) return;
    const step = readPx(ref.current, '--sidebar-resize-step-px');
    const current = ref.current.getBoundingClientRect().width;
    if (e.key === 'ArrowLeft') { e.preventDefault(); applyWidth(current - step); }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (state === 'open') applyWidth(current + step);
      else shell.setSidebar('open');
    }
    if (e.key === 'Home') { e.preventDefault(); shell.setSidebar('rail'); }
    if (e.key === 'End') { e.preventDefault(); applyWidth(readPx(ref.current, '--sidebar-max-width')); }
  };

  // Foco atrapado con sentido: al abrir el cajón, el foco entra en él.
  useEffect(() => {
    if (drawer && state === 'open') ref.current?.focus();
  }, [drawer, state]);

  const classes = ['sidebar', drawer ? 'sidebar--drawer' : `sidebar--${state}`].join(' ');
  return (
    <SidebarContext.Provider value={{ rail }}>
      <aside
        ref={ref}
        id={id}
        className={classes}
        aria-label={label}
        data-state={state}
        tabIndex={drawer ? -1 : undefined}
        inert={drawer && state === 'closed' ? true : undefined}
        onClick={onClick}
      >
        {logo && <div className="sidebar__header">{logo}</div>}
        <div className="sidebar__panel">{children}</div>
        {footer && <div className="sidebar__footer">{footer}</div>}
        {isDesktop && shell && state !== 'closed' && (
          <div
            className="sidebar__resizer"
            role="separator"
            aria-orientation="vertical"
            aria-label={resizerLabel}
            aria-valuenow={state === 'open' ? Math.round(shell.sidebarWidth || 0) || undefined : 0}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onKeyDown={onKeyDown}
          />
        )}
      </aside>
    </SidebarContext.Provider>
  );
}

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Sección del panel: agrupa un bloque (p. ej. el árbol de carpetas) con su propio aire vertical. */
export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return <div className={['sidebar__group', className].filter(Boolean).join(' ')} {...props} />;
}

/** Contenido de una sección — la lista en sí, sin el aire del grupo. */
export function SidebarGroupContent({ className, ...props }: SidebarGroupProps) {
  return <div className={['sidebar__group-content', className].filter(Boolean).join(' ')} {...props} />;
}

/** Línea divisoria entre secciones del panel. */
export function SidebarSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={['sidebar__separator', className].filter(Boolean).join(' ')} {...props} />;
}
