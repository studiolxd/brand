'use client';

import { useContext, useState, type ReactNode } from 'react';
import { AppShellContext } from '../AppShell/AppShellContext';
import { MenuButton } from '../../atoms/MenuButton/MenuButton';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { appHeaderEs } from '../../messages/es/appHeader';
import './AppHeader.css';
import { defaultRenderLink } from '../../constants/default-render-link';

export type AppHeaderLogoLinkProps = {
  href: string;
  className: string;
  'aria-label': string;
  children: ReactNode;
};

/**
 * El único texto propio de la barra, y solo cuando lleva `logo`: es **cromo**,
 * qué hace el logotipo («ir al inicio»), no qué marca es — el mismo criterio
 * que `siteHeader.logo`.
 */
export interface AppHeaderMessages {
  /**
   * Texto accesible del enlace del logotipo. Opcional, como el espacio entero:
   * solo hace falta si algún `AppHeader` lleva `logo` sin `logoLabel`.
   */
  logo?: string;
}

export interface AppHeaderProps {
  /**
   * La marca del producto, entre el botón de menú y `start`: un `Logo`, un SVG
   * o una imagen de cualquier proporción. Toma el alto de contenido de la barra
   * (`--app-header-content-height`) y el ancho que le dé su proporción; no hay
   * que darle medidas. Sin `logo`, la barra no cambia.
   */
  logo?: ReactNode;
  /** Destino del logotipo. Solo se usa con `logo`. */
  logoHref?: string;
  /**
   * Texto accesible del enlace del logotipo. **Sin default**: sin él, sale de
   * `appHeader.logo` del `BrandMessagesProvider`. Solo se lee con `logo`.
   */
  logoLabel?: string;
  /**
   * Enlace del logotipo para el router del producto. Recibe `href`, `className`,
   * `aria-label` y `children`, y debe reenviarlos todos. Mismo contrato que en
   * `SiteHeader`.
   */
  renderLogoLink?: (props: AppHeaderLogoLinkProps) => ReactNode;
  /** Tras el botón de menú: breadcrumb, buscador, título de página… */
  start?: ReactNode;
  /** Antes del avatar: la campana con su contador. Sitio fijo. */
  notifications?: ReactNode;
  /** Al final, siempre: el `UserMenu` (compacto). */
  end?: ReactNode;
  /**
   * Texto accesible del botón de menú. **Reenvío puro** al `MenuButton`: sin
   * él, el botón lee `menuButton.open` del `BrandMessagesProvider`.
   */
  menuLabel?: string;
  /**
   * Texto accesible del botón con la sidebar abierta. **Reenvío puro** al
   * `MenuButton`: sin él, lee `menuButton.close`.
   */
  menuCloseLabel?: string;
  /** id de la sidebar que gobierna el botón (`aria-controls`). */
  sidebarId?: string;
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * La barra superior de la aplicación, en todos los anchos. A la izquierda el
 * botón de menú, que abre el cajón en móvil y pliega/despliega la sidebar en
 * escritorio; a la derecha, notificaciones y cuenta. Entre medias, lo que la
 * página necesite. Con `logo`, la marca del producto va justo tras el botón.
 */
export function AppHeader({
  logo,
  logoHref = '/',
  logoLabel,
  renderLogoLink = defaultRenderLink,
  start,
  notifications,
  end,
  menuLabel,
  menuCloseLabel,
  sidebarId,
  className,
}: AppHeaderProps) {
  // Dentro de AppShell gobierna la sidebar; suelto (Storybook), estado local.
  const shell = useContext(AppShellContext);
  const [localOpen, setLocalOpen] = useState(false);
  const open = shell ? shell.sidebar === 'open' : localOpen;
  const toggle = shell ? shell.toggleSidebar : () => setLocalOpen((v) => !v);
  const t = useBrandMessages('appHeader', appHeaderEs);

  return (
    <header className={['app-header', className].filter(Boolean).join(' ')}>
      <MenuButton isOpen={open} onClick={toggle} label={menuLabel} closeLabel={menuCloseLabel} aria-controls={sidebarId} aria-expanded={open} />
      {/* El texto del enlace se lee solo aquí: sin logo, la barra no exige su clave */}
      {logo && renderLogoLink({ href: logoHref, className: 'app-header__logo', 'aria-label': t('logo', logoLabel), children: logo })}
      <div className="app-header__start">{start}</div>
      {notifications && <div className="app-header__notifications">{notifications}</div>}
      {end && <div className="app-header__end">{end}</div>}
    </header>
  );
}
