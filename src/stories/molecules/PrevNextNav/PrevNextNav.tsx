import type { ComponentType, MouseEvent, ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import './PrevNextNav.css';

export interface PrevNextNavProps {
  /** href del enlace anterior. Mutuamente exclusivo con prevOnClick */
  prevHref?: string;
  /** href del enlace siguiente. Mutuamente exclusivo con nextOnClick */
  nextHref?: string;
  /**
   * Handler del control anterior. Con `prevHref` puesto se dispara **además**
   * del enlace: es la puerta para la navegación SPA (`preventDefault()` en el
   * handler y ruta por el router).
   */
  prevOnClick?: (event: MouseEvent<HTMLElement>) => void;
  /** Handler del control siguiente. Mismo contrato que `prevOnClick`. */
  nextOnClick?: (event: MouseEvent<HTMLElement>) => void;
  /** aria-label del control anterior. Default: "Anterior" */
  prevLabel?: string;
  /** aria-label del control siguiente. Default: "Siguiente" */
  nextLabel?: string;
  /** Contenido central: texto de periodo, semana, mes, etc. */
  label: ReactNode;
  /**
   * id del label central, para que otro elemento pueda tomarlo como nombre
   * accesible (`aria-labelledby`).
   */
  labelId?: string;
  /**
   * Componente `Link` del router para los controles con `href`. Default: `"a"`.
   * Recibe `href` y el resto de props tal cual.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent?: ComponentType<any>;
  /** Variante de densidad. Default: "md" */
  size?: 'sm' | 'md';
}

interface NavControlProps {
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  label: string;
  disabled: boolean;
  direction: 'prev' | 'next';
  chevronSize: 'xs' | 'sm' | 'md';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent?: ComponentType<any>;
}

function NavControl({
  href,
  onClick,
  label,
  disabled,
  direction,
  chevronSize,
  linkComponent,
}: NavControlProps) {
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
    const A = linkComponent ?? 'a';
    return (
      <A href={href} className={className} aria-label={label} onClick={onClick}>
        {chevron}
      </A>
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
  labelId,
  linkComponent,
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
        linkComponent={linkComponent}
      />
      <strong id={labelId} className="prev-next-nav__label">
        {label}
      </strong>
      <NavControl
        href={nextHref}
        onClick={nextOnClick}
        label={nextLabel}
        disabled={!nextHref && !nextOnClick}
        direction="next"
        chevronSize={chevronSize}
        linkComponent={linkComponent}
      />
    </div>
  );
}
