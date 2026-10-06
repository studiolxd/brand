import type { ReactNode } from 'react';
import { Container, type ContainerWidth } from '../../atoms/Container/Container';
import { Heading } from '../../atoms/Heading/Heading';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './LegalFooter.css';
import { defaultRenderLink } from '../../constants/default-render-link';

/**
 * El único texto del pie, y es **cromo**: cómo se llama esa navegación. Los
 * rótulos de los enlaces —aviso legal, privacidad, cookies— son datos y viajan
 * en `links`; el `title` es el contenido de ESE pie.
 */
export interface LegalFooterMessages {
  /** Nombre accesible del `nav` de enlaces legales. */
  label: string;
}

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
  /**
   * Nombre accesible del `nav`. **Sin default**: sin él, sale de
   * `legalFooter.label` del `BrandMessagesProvider`.
   */
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
  /**
   * Elemento raíz (default `'footer'`, el `contentinfo` de la página). `'div'`
   * cuando va dentro de otro pie: un `<footer>` no puede contener otro, y la
   * página tendría dos `contentinfo`. `SiteFooter` lo pone solo en su `legal`.
   */
  as?: 'footer' | 'div';
  className?: string;
}

/**
 * El pie legal: los enlaces a aviso legal, privacidad, cookies y condiciones,
 * y nada más. Se monta a sangre, con su propio aire vertical
 * (`--legal-footer-padding-block`) y el contenido acotado por su `Container`
 * interior. Es el pie de las aplicaciones de la suite; la web tiene su pie
 * propio con más cosas.
 */
export function LegalFooter({
  label,
  title,
  links,
  renderLink = defaultRenderLink,
  width = 'xl',
  surface,
  as: Root = 'footer',
  className,
}: LegalFooterProps) {
  const t = useBrandMessages('legalFooter');
  return (
    <Root className={['legal-footer', surface === 'dark' && 'surface-dark', className].filter(Boolean).join(' ')}>
      <Container width={width} innerClassName="legal-footer__inner">
        {title && <Heading level={2} size={6} className="legal-footer__title">{title}</Heading>}
        <nav aria-label={t('label', label)}>
          <ul className="legal-footer__links">
            {links.map((link) => (
              <li key={link.id}>
                {renderLink({ href: link.href, className: 'legal-footer__link link--ink', children: link.label })}
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Root>
  );
}
