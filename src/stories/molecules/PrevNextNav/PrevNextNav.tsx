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
  /**
   * Rótulo del control anterior. Sin `prevTitle` es el `aria-label` del
   * chevron; con `prevTitle` es el rótulo **visible** que lo encabeza.
   * Default: "Anterior"
   */
  prevLabel?: string;
  /** Rótulo del control siguiente. Mismo contrato que `prevLabel`. Default: "Siguiente" */
  nextLabel?: string;
  /**
   * Título visible del destino anterior (el de la página, el capítulo…). Con
   * él el control deja de ser un chevron pelado: se lee «Anterior ·
   * Instalación», y ese texto visible es ya su nombre accesible.
   */
  prevTitle?: string;
  /** Título visible del destino siguiente. Mismo contrato que `prevTitle`. */
  nextTitle?: string;
  /**
   * Contenido central: texto de periodo, semana, mes, etc. Opcional — el
   * paginador de documentación no tiene centro, solo los dos destinos.
   */
  label?: ReactNode;
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
  title?: string;
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
  title,
  disabled,
  direction,
  chevronSize,
  linkComponent,
}: NavControlProps) {
  const className = [
    'prev-next-nav__btn',
    `prev-next-nav__btn--${direction}`,
    title ? 'prev-next-nav__btn--titled' : '',
    disabled ? 'prev-next-nav__btn--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const chevron = <Icon name="chevron" size={chevronSize} />;

  // Con título, el texto visible («Anterior · Instalación») ya nombra el
  // control: el `aria-label` sobraría y además taparía el título.
  const content = title ? (
    <>
      {chevron}
      <span className="prev-next-nav__text">
        <span className="prev-next-nav__eyebrow">{label}</span>
        <span className="prev-next-nav__title">{title}</span>
      </span>
    </>
  ) : (
    chevron
  );
  const ariaLabel = title ? undefined : label;

  if (disabled) {
    return (
      <button type="button" className={className} aria-label={ariaLabel} disabled>
        {content}
      </button>
    );
  }

  if (href) {
    const A = linkComponent ?? 'a';
    return (
      <A href={href} className={className} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </A>
    );
  }

  return (
    <button type="button" className={className} aria-label={ariaLabel} onClick={onClick}>
      {content}
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
  prevTitle,
  nextTitle,
  label,
  labelId,
  linkComponent,
  size = 'md',
}: PrevNextNavProps) {
  const chevronSize = size === 'sm' ? 'sm' : 'md';
  const titled = prevTitle !== undefined || nextTitle !== undefined;
  const classes = [
    'prev-next-nav',
    size === 'sm' ? 'prev-next-nav--sm' : '',
    titled ? 'prev-next-nav--titled' : '',
  ]
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
        title={prevTitle}
        chevronSize={chevronSize}
        linkComponent={linkComponent}
      />
      {label !== undefined && (
        <strong id={labelId} className="prev-next-nav__label">
          {label}
        </strong>
      )}
      <NavControl
        href={nextHref}
        onClick={nextOnClick}
        label={nextLabel}
        disabled={!nextHref && !nextOnClick}
        direction="next"
        title={nextTitle}
        chevronSize={chevronSize}
        linkComponent={linkComponent}
      />
    </div>
  );
}
