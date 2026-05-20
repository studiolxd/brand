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

export interface SidebarNavLinkEntry {
  kind: 'link';
  id: string;
  label: string;
  href: string;
  active?: boolean;
  icon?: ReactNode;
}

export interface SidebarNavGroupEntry {
  kind: 'group';
  id: string;
  label: string;
  /** Cuando se especifica, el label de la categoría se renderiza como enlace. */
  href?: string;
  /** Icono del grupo, visible en modo colapsado. */
  icon?: ReactNode;
  items: SidebarNavItem[];
}

export type SidebarNavEntry = SidebarNavLinkEntry | SidebarNavGroupEntry;

export type SidebarNavRenderLinkProps = {
  href: string;
  children: ReactNode;
  className: string;
  title?: string;
  'aria-current'?: 'page';
};

export interface SidebarNavProps {
  entries: SidebarNavEntry[];
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  renderLink?: (props: SidebarNavRenderLinkProps) => ReactNode;
}

function defaultRenderLink({ href, children, className, title, 'aria-current': ariaCurrent }: SidebarNavRenderLinkProps) {
  return (
    <a href={href} className={className} title={title} aria-current={ariaCurrent}>
      {children}
    </a>
  );
}

export function SidebarNav({
  entries,
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
        {entries.map((entry) => {
          if (entry.kind === 'link') {
            const cls = [
              'sidebar-nav__top-link',
              entry.active ? 'sidebar-nav__top-link--active' : '',
            ].filter(Boolean).join(' ');

            return (
              <div key={entry.id}>
                {renderLink({
                  href: entry.href,
                  className: cls,
                  title: entry.label,
                  'aria-current': entry.active ? 'page' : undefined,
                  children: (
                    <>
                      {entry.icon && (
                        <span className="sidebar-nav__item-icon" aria-hidden="true">
                          {entry.icon}
                        </span>
                      )}
                      <span className="sidebar-nav__item-label">{entry.label}</span>
                    </>
                  ),
                })}
              </div>
            );
          }

          return (
            <RadixAccordion.Item key={entry.id} value={entry.id} className="sidebar-nav__group">
              <RadixAccordion.Header className="sidebar-nav__group-header">
                {entry.icon && (
                  <span className="sidebar-nav__item-icon" aria-hidden="true" title={entry.label}>
                    {entry.icon}
                  </span>
                )}
                {entry.href
                  ? renderLink({ href: entry.href, className: 'sidebar-nav__group-label', title: entry.label, children: <span className="sidebar-nav__item-label">{entry.label}</span> })
                  : <span className="sidebar-nav__group-label"><span className="sidebar-nav__item-label">{entry.label}</span></span>
                }
                <RadixAccordion.Trigger className="sidebar-nav__group-chevron">
                  <Chevron className="sidebar-nav__group-chevron-icon" size="sm" />
                </RadixAccordion.Trigger>
              </RadixAccordion.Header>
              <RadixAccordion.Content className="sidebar-nav__group-content">
                <div className="sidebar-nav__group-content-inner">
                  <ul className="sidebar-nav__items" role="list">
                    {entry.items.map((item) => {
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
                                <span className="sidebar-nav__item-label">{item.label}</span>
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
          );
        })}
      </RadixAccordion.Root>
    </nav>
  );
}
