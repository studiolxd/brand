import type { ReactNode } from 'react';
import { Heading } from '../../atoms/Heading/Heading';
import { Tag } from '../../atoms/Tag/Tag';
import './SiteNav.css';
import { useBrandMessages } from '../../messages/BrandMessagesContext';

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
  /**
   * Producto anunciado y todavía no disponible: el ítem se ve en su sitio pero
   * **apagado y sin navegación** — no es un enlace, no pasa por `renderLink` y
   * el tabulador no se detiene en él.
   */
  disabled?: boolean;
  /**
   * Texto del distintivo junto al rótulo («Próximamente», «Nuevo», «Beta»…).
   * Llega **ya traducido**: es contenido de ESTE sitio, como el propio rótulo,
   * no cromo del índice.
   */
  badge?: string;
}

export interface SiteNavGroup {
  id: string;
  /** Cabecera del grupo. */
  label: string;
  /** Si se indica, la cabecera es también un enlace (la portada de la sección). */
  href?: string;
  /**
   * En cuántas columnas se reparten los ítems de ESTE grupo, bajo **un solo
   * título**. Por defecto `1`, el grupo de siempre. Con `2` —el caso de un
   * grupo largo, como «Aplicaciones»— el grupo ocupa en la rejilla el ancho de
   * dos y sus ítems se pintan en dos columnas dentro de él; por debajo de `md`
   * vuelve a una, como todo lo demás. No es otro componente ni dos grupos: la
   * cabecera sigue siendo una, y con ella el encabezado por el que se recorre
   * el índice.
   */
  columns?: 1 | 2;
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

/** Tope de columnas en el breakpoint ancho — {site-nav.columns-max}. */
const COLUMNS_MAX = 5;

/**
 * El índice del sitio: grupos con cabecera y enlaces. Una columna en móvil,
 * una columna por grupo en escritorio. Es lo que llena el panel del
 * `SiteHeader` y, con la misma forma, el pie de página.
 *
 * En el breakpoint ancho el número de columnas sigue al número de grupos
 * (hasta `COLUMNS_MAX`), para que un quinto grupo no caiga solo en una
 * segunda fila; en `md` y `lg` el número de columnas es fijo. El dato viaja
 * en `data-columns`, no en un atributo `style`: una app con
 * `style-src 'self'` descarta el atributo sin avisar y el grupo de más caía
 * a la segunda fila.
 *
 * Un grupo puede valer por dos (`columns: 2`): ocupa el ancho de dos en la
 * rejilla y reparte sus ítems en dos columnas bajo un solo título. El dato va
 * también en un atributo, `data-group-columns`, por el mismo motivo.
 */
/**
 * El único texto que el índice dice por su cuenta, y es **cromo**: el nombre de
 * la región de navegación. Los grupos y sus enlaces son **contenido** y vienen
 * en `groups`.
 */
export interface SiteNavMessages {
  /** Nombre accesible del `nav`. */
  label: string;
}

export function SiteNav({
  groups,
  label,
  renderLink = defaultRenderLink,
  className,
}: SiteNavProps) {
  const t = useBrandMessages('siteNav');
  const classes = ['site-nav', className].filter(Boolean).join(' ');
  // El tope de columnas cuenta TRAMOS, no grupos: un grupo ancho (`columns: 2`)
  // vale por dos, que es lo que ocupa en la rejilla. Si no, cinco grupos con uno
  // ancho pedían cinco columnas para seis tramos de contenido.
  const tramos = groups.reduce((total, group) => total + (group.columns ?? 1), 0);
  const wideColumns = Math.min(tramos, COLUMNS_MAX) || 1;
  return (
    <nav className={classes} aria-label={t('label', label)} data-columns={wideColumns}>
      {groups.map((group) => (
        <div
          key={group.id}
          className="site-nav__group"
          // El dato va en un atributo `data-*` y no en `style`, como
          // `data-columns`: una app con `style-src 'self'` descarta los
          // atributos de estilo en silencio y el grupo perdería su ancho.
          data-group-columns={group.columns === 2 ? 2 : undefined}
        >
          <Heading level={2} size={6} className="site-nav__label">
            {group.href
              ? renderLink({ href: group.href, className: 'site-nav__label-link', children: group.label })
              : group.label}
          </Heading>
          <ul className="site-nav__list">
            {group.items.map((item) => (
              <li key={item.id} className="site-nav__item">
                {item.disabled ? (
                  /* Apagado NO es un enlace: no hay destino que seguir, así que
                     tampoco pasa por `renderLink`. Se pinta como un enlace
                     inactivo (`role="link"` + `aria-disabled`, donde el atributo
                     sí es válido y el lector lo anuncia como no disponible) y
                     sin `tabIndex`, de modo que el tabulador lo salta. */
                  <span className="site-nav__link site-nav__link--disabled" role="link" aria-disabled="true">
                    {item.label}
                  </span>
                ) : (
                  renderLink({
                    href: item.href,
                    className: ['site-nav__link', item.current ? 'site-nav__link--current' : ''].filter(Boolean).join(' '),
                    'aria-current': item.current ? 'page' : undefined,
                    target: item.target,
                    rel: linkRel(item.target, item.rel),
                    children: item.label,
                  })
                )}
                {item.badge && (
                  /* El distintivo va FUERA del enlace, hermano suyo en el `li`:
                     dentro, la línea de hover —que en el DS es una línea bajo el
                     elemento, no `text-decoration`— cruzaría también la píldora.
                     Apagado va en neutro: la píldora de información sobre un
                     ítem que no lleva a ningún sitio se leería como una novedad
                     disponible. */
                  <Tag variant={item.disabled ? 'neutral' : 'info'} className="site-nav__badge">
                    {item.badge}
                  </Tag>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
