import type { ReactNode } from 'react';
import { Heading } from '../../atoms/Heading/Heading';
import './SiteNav.css';

export interface SiteNavItem {
  id: string;
  label: string;
  href: string;
  /** Página actual: se marca con `aria-current="page"`. */
  current?: boolean;
  /** Destino del enlace (`_blank` para abrir en otra pestaña). Útil para enlaces a otro dominio. */
  target?: string;
  /** Relación del enlace. Con `target="_blank"` y sin valor, se aplica `noopener noreferrer`. */
  rel?: string;
}

export interface SiteNavGroup {
  id: string;
  /** Cabecera del grupo. */
  label: string;
  /** Si se indica, la cabecera es también un enlace (la portada de la sección). */
  href?: string;
  items: SiteNavItem[];
}

export type SiteNavRenderLinkProps = {
  href: string;
  children: ReactNode;
  className: string;
  'aria-current'?: 'page';
  /** Presente solo si el ítem lo declara; el consumidor debe reenviarlo a su enlace. */
  target?: string;
  /** Presente solo si el ítem lo declara o si `target="_blank"` lo impone; reenviar junto a `target`. */
  rel?: string;
};

export interface SiteNavProps {
  groups: SiteNavGroup[];
  /** Nombre accesible del `nav`. */
  label?: string;
  /** Enlace del router del producto; por defecto, un `<a>`. */
  renderLink?: (props: SiteNavRenderLinkProps) => ReactNode;
  className?: string;
}

function defaultRenderLink({
  href,
  children,
  className,
  'aria-current': ariaCurrent,
  target,
  rel,
}: SiteNavRenderLinkProps) {
  return (
    <a href={href} className={className} aria-current={ariaCurrent} target={target} rel={rel}>
      {children}
    </a>
  );
}

/** `target="_blank"` sin `rel` explícito arrastra siempre `noopener noreferrer`. */
function linkRel(target?: string, rel?: string) {
  if (rel) return rel;
  return target === '_blank' ? 'noopener noreferrer' : undefined;
}

/**
 * El índice del sitio: grupos con cabecera y enlaces. Una columna en móvil,
 * una columna por grupo en escritorio. Es lo que llena el panel del
 * `SiteHeader` y, con la misma forma, el pie de página.
 */
export function SiteNav({
  groups,
  label = 'Navegación del sitio',
  renderLink = defaultRenderLink,
  className,
}: SiteNavProps) {
  const classes = ['site-nav', className].filter(Boolean).join(' ');
  return (
    <nav className={classes} aria-label={label}>
      {groups.map((group) => (
        <div key={group.id} className="site-nav__group">
          <Heading level={2} size={6} className="site-nav__label">
            {group.href
              ? renderLink({ href: group.href, className: 'site-nav__label-link', children: group.label })
              : group.label}
          </Heading>
          <ul className="site-nav__list">
            {group.items.map((item) => (
              <li key={item.id} className="site-nav__item">
                {renderLink({
                  href: item.href,
                  className: ['site-nav__link', item.current ? 'site-nav__link--current' : ''].filter(Boolean).join(' '),
                  'aria-current': item.current ? 'page' : undefined,
                  target: item.target,
                  rel: linkRel(item.target, item.rel),
                  children: item.label,
                })}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
