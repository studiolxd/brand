import type { AnchorHTMLAttributes, ReactNode } from 'react';
import './Breadcrumb.css';
import { useBrandMessages } from '../../messages/BrandMessagesContext';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbRenderLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  className: string;
};

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  renderLink?: (props: BreadcrumbRenderLinkProps) => ReactNode;
  separator?: ReactNode;
  /**
   * `aria-label` del `<nav>`. **Sin default**: sin él, sale de
   * `breadcrumb.label` del `BrandMessagesProvider`.
   */
  ariaLabel?: string;
  className?: string;
}

// Reenvía todo lo que reciba: un renderLink del consumidor (router propio) puede
// añadir atributos de enlace sin que Breadcrumb tenga que conocerlos.
function defaultRenderLink({ children, ...props }: BreadcrumbRenderLinkProps) {
  return <a {...props}>{children}</a>;
}

/**
 * El único texto que las migas dicen por su cuenta, y es **cromo**: el nombre de
 * la región. Los rótulos del rastro son **contenido** y vienen en `items`.
 */
export interface BreadcrumbMessages {
  /** Nombre accesible del `nav`. */
  label: string;
}

export function Breadcrumb({
  items,
  renderLink = defaultRenderLink,
  separator = '/',
  ariaLabel,
  className,
}: BreadcrumbProps) {
  const t = useBrandMessages('breadcrumb');
  return (
    <nav
      aria-label={t('label', ariaLabel)}
      className={['breadcrumb', className].filter(Boolean).join(' ')}
    >
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className={[
                'breadcrumb__item',
                isLast ? 'breadcrumb__item--current' : '',
              ].filter(Boolean).join(' ')}
            >
              {isLast || !item.href ? (
                <span
                  className={isLast ? 'breadcrumb__current' : 'breadcrumb__static'}
                  {...(isLast ? { 'aria-current': 'page' as const } : {})}
                >
                  {item.label}
                </span>
              ) : (
                renderLink({ href: item.href, children: item.label, className: 'breadcrumb__link' })
              )}
              {!isLast && (
                <span className="breadcrumb__separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
