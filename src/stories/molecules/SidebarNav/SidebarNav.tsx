import * as RadixAccordion from '@radix-ui/react-accordion';
import type { ReactNode } from 'react';
import { Chevron } from '../../atoms/Chevron/Chevron';
import './SidebarNav.css';

export interface SidebarNavItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
  icon?: ReactNode;
}

export interface SidebarNavGroup {
  id: string;
  label: string;
  /** Cuando se especifica, el label de la categoría se renderiza como enlace. */
  href?: string;
  items: SidebarNavItem[];
}

export type SidebarNavRenderLinkProps = {
  href: string;
  children: ReactNode;
  className: string;
  'aria-current'?: 'page';
};

export interface SidebarNavProps {
  groups: SidebarNavGroup[];
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  renderLink?: (props: SidebarNavRenderLinkProps) => ReactNode;
}

function defaultRenderLink({ href, children, className, 'aria-current': ariaCurrent }: SidebarNavRenderLinkProps) {
  return (
    <a href={href} className={className} aria-current={ariaCurrent}>
      {children}
    </a>
  );
}

export function SidebarNav({
  groups,
  defaultValue,
  value,
  onValueChange,
  renderLink = defaultRenderLink,
}: SidebarNavProps) {
  const accordionProps = value !== undefined
    ? { type: 'multiple' as const, value, onValueChange }
    : { type: 'multiple' as const, defaultValue };

  return (
    <nav className="sidebar-nav">
      <RadixAccordion.Root className="sidebar-nav__accordion" {...accordionProps}>
        {groups.map((group) => (
          <RadixAccordion.Item key={group.id} value={group.id} className="sidebar-nav__group">
            <RadixAccordion.Header className="sidebar-nav__group-header">
              {group.href
                ? renderLink({ href: group.href, className: 'sidebar-nav__group-label', children: group.label })
                : <span className="sidebar-nav__group-label">{group.label}</span>
              }
              <RadixAccordion.Trigger className="sidebar-nav__group-chevron">
                <Chevron className="sidebar-nav__group-chevron-icon" size="sm" />
              </RadixAccordion.Trigger>
            </RadixAccordion.Header>
            <RadixAccordion.Content className="sidebar-nav__group-content">
              <div className="sidebar-nav__group-content-inner">
                <ul className="sidebar-nav__items" role="list">
                  {group.items.map((item) => {
                    const cls = [
                      'sidebar-nav__item',
                      item.active ? 'sidebar-nav__item--active' : '',
                    ].filter(Boolean).join(' ');

                    return (
                      <li key={item.id}>
                        {renderLink({
                          href: item.href,
                          className: cls,
                          'aria-current': item.active ? 'page' : undefined,
                          children: (
                            <>
                              {item.icon && (
                                <span className="sidebar-nav__item-icon" aria-hidden="true">
                                  {item.icon}
                                </span>
                              )}
                              <span>{item.label}</span>
                            </>
                          ),
                        })}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        ))}
      </RadixAccordion.Root>
    </nav>
  );
}
