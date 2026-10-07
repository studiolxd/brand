import type { AnchorHTMLAttributes, ComponentType, MouseEvent, ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import './PrevNextNav.css';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { prevNextNavEs } from '../../messages/es/prevNextNav';
import { warnDeprecated } from '../../constants/env';
import { defaultRenderLink, renderLinkFromComponent } from '../../constants/default-render-link';

/**
 * Lo que recibe `renderLink`: los atributos del `<a>` que pintaría el
 * control. Hay que reenviarlos **todos** al enlace del router.
 */
export type PrevNextNavRenderLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  className: string;
  children: ReactNode;
};

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
   * **Sin default**: sin él, sale de `prevNextNav.previous` del
   * `BrandMessagesProvider`.
   */
  prevLabel?: string;
  /**
   * Rótulo del control siguiente. Mismo contrato que `prevLabel`. **Sin
   * default**: sale de `prevNextNav.next`.
   */
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
   * Pinta los controles con `href` con el `Link` del router:
   * `renderLink={(props) => <Link {...props} />}`. Recibe todos los atributos
   * del `<a>` (`href`, `className`, `aria-label`, `onClick`, `children`) y
   * tiene que reenviarlos todos. Sin él, un `<a>`.
   */
  renderLink?: (props: PrevNextNavRenderLinkProps) => ReactNode;
  /**
   * @deprecated Usa `renderLink` (`renderLink={(props) => <Link {...props} />}`).
   * Sigue funcionando y avisa en desarrollo; se retira en la v52.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent?: ComponentType<any>;
  /** Variante de densidad. Default: "md" */
  size?: 'sm' | 'md';
  /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
  className?: string;
}

interface NavControlProps {
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  label: string;
  title?: string;
  disabled: boolean;
  direction: 'prev' | 'next';
  chevronSize: 'xs' | 'sm' | 'md';
  renderLink: (props: PrevNextNavRenderLinkProps) => ReactNode;
}

function NavControl({
  href,
  onClick,
  label,
  title,
  disabled,
  direction,
  chevronSize,
  renderLink,
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
    return renderLink({ href, className, 'aria-label': ariaLabel, onClick, children: content });
  }

  return (
    <button type="button" className={className} aria-label={ariaLabel} onClick={onClick}>
      {content}
    </button>
  );
}

/**
 * Los dos textos del par, y los dos son **cromo**: «anterior» y «siguiente»
 * dicen la dirección, no el destino. El destino —`prevTitle`, `nextTitle`, el
 * rótulo del medio— es **contenido** y lo escribe la página.
 */
export interface PrevNextNavMessages {
  /** Rótulo del control anterior. */
  previous: string;
  /** Rótulo del control siguiente. */
  next: string;
}

export function PrevNextNav({
  prevHref,
  nextHref,
  prevOnClick,
  nextOnClick,
  prevLabel,
  nextLabel,
  prevTitle,
  nextTitle,
  label,
  labelId,
  renderLink: renderLinkProp,
  linkComponent,
  size = 'md',
  className,
}: PrevNextNavProps) {
  if (linkComponent !== undefined) warnDeprecated('PrevNextNav', 'linkComponent', '`renderLink`');
  const renderLink =
    renderLinkProp ?? (linkComponent ? renderLinkFromComponent(linkComponent) : defaultRenderLink);
  const t = useBrandMessages('prevNextNav', prevNextNavEs);
  const chevronSize = size === 'sm' ? 'sm' : 'md';
  const titled = prevTitle !== undefined || nextTitle !== undefined;
  const classes = [
    'prev-next-nav',
    size === 'sm' ? 'prev-next-nav--sm' : '',
    titled ? 'prev-next-nav--titled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <NavControl
        href={prevHref}
        onClick={prevOnClick}
        label={t('previous', prevLabel)}
        disabled={!prevHref && !prevOnClick}
        direction="prev"
        title={prevTitle}
        chevronSize={chevronSize}
        renderLink={renderLink}
      />
      {label !== undefined && (
        <strong id={labelId} className="prev-next-nav__label">
          {label}
        </strong>
      )}
      <NavControl
        href={nextHref}
        onClick={nextOnClick}
        label={t('next', nextLabel)}
        disabled={!nextHref && !nextOnClick}
        direction="next"
        title={nextTitle}
        chevronSize={chevronSize}
        renderLink={renderLink}
      />
    </div>
  );
}
