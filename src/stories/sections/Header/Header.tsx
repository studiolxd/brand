import { useState } from 'react';
import { Logo } from '../../atoms/Logo/Logo';
import { Hamburger } from '../../atoms/Hamburger/Hamburger';
import { SkipLink } from '../../atoms/SkipLink/SkipLink';
import './Header.css';

export interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  id?: string;
  navItems: NavItem[];
  featuredLink?: NavItem;
  actions?: React.ReactNode;
  logoHref?: string;
  logoLabel?: string;
  navLabel?: string;
  dark?: boolean;
}

export function Header({
  id,
  navItems,
  featuredLink,
  actions,
  logoHref = '/',
  logoLabel = 'Studio LXD — ir al inicio',
  navLabel = 'Main navigation',
  dark = false,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      id={id}
      className={[
        'header',
        dark ? 'header--dark' : '',
      ].filter(Boolean).join(' ')}
    >
      <SkipLink href="#main-content">Saltar al contenido principal</SkipLink>
      <a href={logoHref} className="header__logo" aria-label={logoLabel}>
        <Logo />
      </a>

      <Hamburger
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
      />

      <div
        className="header__navbar"
        aria-hidden={!isOpen}
      >
        {featuredLink && (
          <a
            href={featuredLink.href}
            className="header__featured"
            onClick={handleNavClick}
          >
            {featuredLink.label}
          </a>
        )}

        <nav aria-label={navLabel}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="header__nav-link"
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {actions && (
          <div className="header__actions">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
