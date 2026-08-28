import type { ReactNode } from 'react';
import { Container, type ContainerWidth } from '../../atoms/Container/Container';
import { Heading, type HeadingLevel } from '../../atoms/Heading/Heading';
import { List } from '../../atoms/List/List';
import { Logo } from '../../atoms/Logo/Logo';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import './SiteFooter.css';

export interface SiteFooterLink {
  /** Clave de React. Sin ella se usa el `href`. */
  id?: string;
  label: string;
  href: string;
  /** Abre en otra pestaña (`target="_blank"` con su `rel`). */
  external?: boolean;
}

export interface SiteFooterColumn {
  /** Clave de React. Sin ella se usa el título. */
  id?: string;
  /** Título de la columna. Es también el nombre accesible de su `nav`. */
  title: string;
  links: SiteFooterLink[];
}

export type SiteFooterRenderLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
  target?: string;
  rel?: string;
};

export interface SiteFooterProps {
  /** El logotipo. Por defecto el de Studio LXD a talla `lg`. */
  logo?: ReactNode;
  /** La frase bajo el logotipo. */
  tagline?: ReactNode;
  /** Columnas de enlaces. */
  columns?: SiteFooterColumn[];
  /** Enlace del router del producto. Debe reenviar todas las props. */
  renderLink?: (props: SiteFooterRenderLinkProps) => ReactNode;
  /**
   * Bloque libre a la derecha de las columnas: los datos de contacto, el
   * formulario de newsletter, las redes. Lo compone quien usa el pie con los
   * componentes del sistema; el pie solo le reserva el sitio.
   */
  aside?: ReactNode;
  /** Bloque legal bajo el pie, separado por una línea. Se espera un `LegalFooter`. */
  legal?: ReactNode;
  /** Nivel semántico del título de cada columna. Por defecto `2`. */
  columnTitleLevel?: HeadingLevel;
  /** Superficie del pie. Por defecto oscura: es el cierre de una página pública. */
  surface?: 'dark' | 'light';
  /** Ancho del contenido, como en `SiteHeader`. */
  width?: ContainerWidth;
  className?: string;
  id?: string;
}

function defaultRenderLink({ children, ...props }: SiteFooterRenderLinkProps) {
  return <a {...props}>{children}</a>;
}

/**
 * El pie de una página pública: la marca con su frase, las columnas de
 * enlaces, un bloque libre para el contacto o la newsletter y, debajo, el pie
 * legal. Fondo a sangre y contenido acotado, como el resto de bandas
 * (`Container`).
 *
 * Va sobre superficie oscura por defecto —es el cierre de la página— y no
 * pinta ningún color por su cuenta: el lienzo lo pone la superficie, así que
 * cambiar `surface` a `light` basta para que todo el pie voltee.
 *
 * Es el hermano mayor de `LegalFooter`, que sigue siendo el pie de las
 * aplicaciones de la suite: solo los enlaces legales y nada más.
 */
export function SiteFooter({
  logo = <Logo size="lg" />,
  tagline,
  columns,
  renderLink = defaultRenderLink,
  aside,
  legal,
  columnTitleLevel = 2,
  surface = 'dark',
  width = 'xl',
  className,
  id,
}: SiteFooterProps) {
  return (
    <Container
      as="footer"
      id={id}
      width={width}
      space="2xl"
      surface={surface === 'dark' ? 'dark' : undefined}
      className={['site-footer', className].filter(Boolean).join(' ')}
      innerClassName="site-footer__inner"
    >
      <div className="site-footer__brand">
        {logo}
        {tagline && <Paragraph size="large" className="site-footer__tagline">{tagline}</Paragraph>}
      </div>

      {(columns?.length || aside) && (
        <div className="site-footer__body">
          {columns?.map((column) => (
            <nav key={column.id ?? column.title} className="site-footer__column" aria-label={column.title}>
              <Heading level={columnTitleLevel} size={3} className="site-footer__column-title">
                {column.title}
              </Heading>
              <List type="plain" className="site-footer__links">
                {column.links.map((link) => (
                  <li key={link.id ?? link.href}>
                    {renderLink({
                      href: link.href,
                      className: 'site-footer__link link--ink',
                      children: link.label,
                      ...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                    })}
                  </li>
                ))}
              </List>
            </nav>
          ))}
          {aside && <div className="site-footer__aside">{aside}</div>}
        </div>
      )}

      {legal && <div className="site-footer__legal">{legal}</div>}
    </Container>
  );
}
