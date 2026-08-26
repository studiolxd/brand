'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Container, type ContainerWidth } from '../../atoms/Container/Container';
import { Logo, type LogoSize } from '../../atoms/Logo/Logo';
import { MenuButton } from '../../atoms/MenuButton/MenuButton';
import './SiteHeader.css';

export type SiteHeaderLogoLinkProps = {
  href: string;
  className: string;
  'aria-label': string;
  children: ReactNode;
};

function defaultRenderLogoLink({ children, ...props }: SiteHeaderLogoLinkProps) {
  return <a {...props}>{children}</a>;
}

export interface SiteHeaderProps {
  /** Destino del logotipo. */
  logoHref?: string;
  /** Texto accesible del enlace del logotipo. */
  logoLabel?: string;
  /** aria-label del botón de menú. */
  menuLabel?: string;
  /** aria-label del botón de menú cuando está abierto («Cerrar menú»). */
  menuCloseLabel?: string;
  /** La marca. Por defecto el `Logo` de Studio LXD a `logoSize`; un producto de la suite pone la suya. */
  logo?: ReactNode;
  /** Talla del logotipo por defecto. `xl` (64px): la cabecera es el sitio de la marca. */
  logoSize?: LogoSize;
  /** Talla del botón de menú. `lg` (48px) acompaña al logotipo grande. */
  menuButtonSize?: 'sm' | 'md' | 'lg';
  /**
   * Enlace del logotipo para el router del producto. Recibe `href`, `className`,
   * `aria-label` y `children`, y debe reenviarlos todos.
   */
  renderLogoLink?: (props: SiteHeaderLogoLinkProps) => ReactNode;
  /** Ancho del contenido; el fondo siempre llega de lado a lado. */
  width?: ContainerWidth;
  /** Estado del menú cuando lo gobierna el producto. Si se omite, es interno. */
  open?: boolean;
  /** Notifica el cambio de estado del menú. */
  onOpenChange?: (open: boolean) => void;
  /** Índice del sitio dentro del panel: normalmente un `SiteNav`. */
  children?: ReactNode;
  /** Ajustes del sitio al final del panel (el selector de tema). */
  settings?: ReactNode;
  /** id del panel — `aria-controls` del botón de menú. */
  panelId?: string;
  /** Controles del producto en la barra (acceso, CTA…). */
  actions?: ReactNode;
  /** El selector de idioma (`LanguageSwitcher` compacto): en los ajustes del panel, delante del tema. */
  language?: ReactNode;
}

/**
 * Cabecera de las páginas públicas: logotipo, controles del producto y botón
 * de menú, con el contenido acotado por `Container` y el fondo a sangre. El
 * menú es siempre un panel a pantalla completa bajo la barra —no hay
 * navegación en línea— con el índice del sitio y, al final, sus ajustes.
 * El enlace de salto al contenido no va aquí: lo pone `AppRoot`, una vez por
 * documento.
 */
export function SiteHeader({
  logoHref = '/',
  logoLabel = 'Studio LXD — ir al inicio',
  menuLabel = 'Menú de navegación',
  menuCloseLabel,
  logoSize = 'xl',
  logo = <Logo size={logoSize} />,
  menuButtonSize = 'lg',
  renderLogoLink = defaultRenderLogoLink,
  width = 'xl',
  open,
  onOpenChange,
  children,
  settings,
  panelId = 'site-header-panel',
  actions,
  language,
}: SiteHeaderProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const hasPanel = Boolean(children || settings || language);

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  // Abierto: Escape lo cierra y devuelve el foco al botón; un clic fuera de la
  // cabecera lo cierra; la página de debajo no hace scroll.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (headerRef.current?.contains(target)) return;
      // Los menús del panel (tema, idioma…) viven en un portal fuera de la
      // cabecera: pulsar una de sus opciones no es «fuera».
      if (target?.closest('[role="menu"], [role="listbox"], [role="dialog"]')) return;
      setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setOpen es estable por construcción
  }, [isOpen]);

  return (
    <Container ref={headerRef} as="header" width={width} className="site-header" innerClassName="site-header__bar">
      {renderLogoLink({ href: logoHref, className: 'site-header__logo', 'aria-label': logoLabel, children: logo })}

      <div className="site-header__controls">
        {actions}
        {/* Sin panel no hay menú: un botón que no abre nada es un control muerto */}
        {hasPanel && (
          <MenuButton
            ref={menuButtonRef}
            isOpen={isOpen}
            onClick={() => setOpen(!isOpen)}
            label={menuLabel}
            closeLabel={menuCloseLabel}
            size={menuButtonSize}
            aria-controls={panelId}
          />
        )}
      </div>

      {hasPanel && (
        <div
          className={['site-header__panel', isOpen ? 'site-header__panel--open' : ''].filter(Boolean).join(' ')}
          id={panelId}
          inert={!isOpen}
          aria-hidden={!isOpen}
        >
          <Container width={width} space="none" innerClassName="site-header__panel-inner">
            {children}
            {(language || settings) && (
              <div className="site-header__settings">
                {language}
                {settings}
              </div>
            )}
          </Container>
        </div>
      )}
    </Container>
  );
}
