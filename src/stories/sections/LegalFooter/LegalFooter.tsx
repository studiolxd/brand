import type { ReactNode } from 'react';
import { Container, type ContainerWidth } from '../../atoms/Container/Container';
import { Heading } from '../../atoms/Heading/Heading';
import './LegalFooter.css';

export interface LegalFooterLink {
  id: string;
  label: string;
  href: string;
}

export type LegalFooterRenderLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
};

export interface LegalFooterProps {
  /** Nombre accesible del `nav`. */
  label?: string;
  /** Título opcional sobre los enlaces. */
  title?: string;
  links: LegalFooterLink[];
  /** Enlace del router del producto. Debe reenviar todas las props. */
  renderLink?: (props: LegalFooterRenderLinkProps) => ReactNode;
  /** Ancho del contenido, como en `SiteHeader`. */
  width?: ContainerWidth;
  /** Pie sobre superficie oscura. */
  surface?: 'dark';
  className?: string;
}

function defaultRenderLink({ children, ...props }: LegalFooterRenderLinkProps) {
  return <a {...props}>{children}</a>;
}

/**
 * El pie legal: los enlaces a aviso legal, privacidad, cookies y condiciones,
 * y nada más. Contenido acotado por `Container`, fondo a sangre. Es el pie de
 * las aplicaciones de la suite; la web tiene su pie propio con más cosas.
 */
export function LegalFooter({
  label = 'Legal',
  title,
  links,
  renderLink = defaultRenderLink,
  width = 'xl',
  surface,
  className,
}: LegalFooterProps) {
  return (
    <Container
      as="footer"
      width={width}
      surface={surface}
      className={['legal-footer', className].filter(Boolean).join(' ')}
      innerClassName="legal-footer__inner"
    >
      {title && <Heading level={2} size={6} className="legal-footer__title">{title}</Heading>}
      <nav aria-label={label}>
        <ul className="legal-footer__links">
          {links.map((link) => (
            <li key={link.id}>
              {renderLink({ href: link.href, className: 'legal-footer__link link--ink', children: link.label })}
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
