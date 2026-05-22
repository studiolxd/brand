import type { ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import './PrevNextNav.css';

export interface PrevNextNavProps {
  /** href del enlace anterior. Mutuamente exclusivo con prevOnClick */
  prevHref?: string;
  /** href del enlace siguiente. Mutuamente exclusivo con nextOnClick */
  nextHref?: string;
  /** Handler del botón anterior. Mutuamente exclusivo con prevHref */
  prevOnClick?: () => void;
  /** Handler del botón siguiente. Mutuamente exclusivo con nextHref */
  nextOnClick?: () => void;
  /** aria-label del control anterior. Default: "Anterior" */
  prevLabel?: string;
  /** aria-label del control siguiente. Default: "Siguiente" */
  nextLabel?: string;
  /** Contenido central: texto de periodo, semana, mes, etc. */
  label: ReactNode;
  /** Variante de densidad. Default: "md" */
  size?: 'sm' | 'md';
}

interface NavControlProps {
  href?: string;
  onClick?: () => void;
  label: string;
  disabled: boolean;
  direction: 'prev' | 'next';
  chevronSize: 'xs' | 'sm' | 'md';
}

function NavControl({ href, onClick, label, disabled, direction, chevronSize }: NavControlProps) {
  const className = [
    'prev-next-nav__btn',
    `prev-next-nav__btn--${direction}`,
    disabled ? 'prev-next-nav__btn--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const chevron = <Icon name="chevron" size={chevronSize} />;

  if (disabled) {
    return (
      <button type="button" className={className} aria-label={label} disabled>
        {chevron}
      </button>
    );
  }

  if (href) {
    return (
      <a href={href} className={className} aria-label={label}>
        {chevron}
      </a>
    );
  }

  return (
    <button type="button" className={className} aria-label={label} onClick={onClick}>
      {chevron}
    </button>
  );
}

export function PrevNextNav({
  prevHref,
  nextHref,
  prevOnClick,
  nextOnClick,
  prevLabel = 'Anterior',
  nextLabel = 'Siguiente',
  label,
  size = 'md',
}: PrevNextNavProps) {
  const chevronSize = size === 'sm' ? 'sm' : 'md';
  const classes = ['prev-next-nav', size === 'sm' ? 'prev-next-nav--sm' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <NavControl
        href={prevHref}
        onClick={prevOnClick}
        label={prevLabel}
        disabled={!prevHref && !prevOnClick}
        direction="prev"
        chevronSize={chevronSize}
      />
      <strong className="prev-next-nav__label">{label}</strong>
      <NavControl
        href={nextHref}
        onClick={nextOnClick}
        label={nextLabel}
        disabled={!nextHref && !nextOnClick}
        direction="next"
        chevronSize={chevronSize}
      />
    </div>
  );
}
