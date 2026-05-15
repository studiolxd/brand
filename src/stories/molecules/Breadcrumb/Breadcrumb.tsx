import type { ReactNode } from 'react';
import './Breadcrumb.css';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbRenderLinkProps = {
  href: string;
  children: ReactNode;
  className: string;
};

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  renderLink?: (props: BreadcrumbRenderLinkProps) => ReactNode;
  separator?: ReactNode;
  ariaLabel?: string;
  className?: string;
}

function defaultRenderLink({ href, children, className }: BreadcrumbRenderLinkProps) {
  return <a href={href} className={className}>{children}</a>;
}

export function Breadcrumb({
  items,
  renderLink = defaultRenderLink,
  separator = '/',
  ariaLabel = 'Migas de pan',
  className,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label={ariaLabel}
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
