import type { ReactNode } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../atoms/Accordion/Accordion';
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
      <Accordion className="sidebar-nav__accordion" {...accordionProps}>
        {groups.map((group) => (
          <AccordionItem key={group.id} value={group.id} className="sidebar-nav__group">
            <AccordionTrigger className="sidebar-nav__group-trigger" chevronSize="sm">
              <span className="sidebar-nav__group-label">{group.label}</span>
            </AccordionTrigger>
            <AccordionContent className="sidebar-nav__group-content">
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  );
}
