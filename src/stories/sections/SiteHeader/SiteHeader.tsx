'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Container, type ContainerWidth } from '../../atoms/Container/Container';
import { Logo } from '../../atoms/Logo/Logo';
import { MenuButton } from '../../atoms/MenuButton/MenuButton';
import { SkipLink } from '../../atoms/SkipLink/SkipLink';
import './SiteHeader.css';

export interface SiteHeaderProps {
  /** Destino del logotipo. */
  logoHref?: string;
  /** Texto accesible del enlace del logotipo. */
  logoLabel?: string;
  /** aria-label del botón de menú. */
  menuLabel?: string;
  /** Texto del enlace de salto al contenido. Omítelo para no renderizarlo. */
  skipLabel?: string;
  /** Destino del enlace de salto. */
  skipHref?: string;
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
  /** El selector de idioma, entre las acciones y el botón de menú: un `LanguageSwitcher` compacto. */
  language?: ReactNode;
}

/**
 * Cabecera de las páginas públicas: logotipo, controles del producto y botón
 * de menú, con el contenido acotado por `Container` y el fondo a sangre. El
 * menú es siempre un panel a pantalla completa bajo la barra —no hay
 * navegación en línea— con el índice del sitio y, al final, sus ajustes.
 */
export function SiteHeader({
  logoHref = '/',
  logoLabel = 'Studio LXD — ir al inicio',
  menuLabel = 'Menú de navegación',
  skipLabel = 'Saltar al contenido principal',
  skipHref = '#main-content',
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
  const hasPanel = Boolean(children || settings);

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
      if (headerRef.current?.contains(event.target as Node)) return;
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
      {skipLabel && <SkipLink href={skipHref}>{skipLabel}</SkipLink>}

      <a href={logoHref} className="site-header__logo" aria-label={logoLabel}>
        <Logo />
      </a>

      <div className="site-header__controls">
        {actions}
        {language}
        <MenuButton
          ref={menuButtonRef}
          isOpen={isOpen}
          onClick={() => setOpen(!isOpen)}
          label={menuLabel}
          aria-controls={hasPanel ? panelId : undefined}
        />
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
            {settings && <div className="site-header__settings">{settings}</div>}
          </Container>
        </div>
      )}
    </Container>
  );
}
