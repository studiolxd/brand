import type { AnchorHTMLAttributes, ReactNode } from 'react';
import './Breadcrumb.css';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { breadcrumbEs } from '../../messages/es/breadcrumb';
import { defaultRenderLink } from '../../constants/default-render-link';
import { warnDeprecated } from '../../constants/env';

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
  'aria-label'?: string;
  /** @deprecated Usa `aria-label`. Sigue funcionando y avisa en desarrollo; se retira en la v52. */
  ariaLabel?: string;
  className?: string;
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
  'aria-label': ariaLabelProp,
  ariaLabel: ariaLabelDeprecated,
  className,
}: BreadcrumbProps) {
  if (ariaLabelDeprecated !== undefined) warnDeprecated('Breadcrumb', 'ariaLabel', '`aria-label`');
  const ariaLabel = ariaLabelProp ?? ariaLabelDeprecated;
  const t = useBrandMessages('breadcrumb', breadcrumbEs);
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
