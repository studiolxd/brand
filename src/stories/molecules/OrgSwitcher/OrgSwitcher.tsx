import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { ReactNode } from 'react';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Icon } from '../../atoms/Icon/Icon';
import type { ContextMenuItem, ContextMenuRenderLinkProps } from '../ContextMenu/ContextMenu';
import './OrgSwitcher.css';

export interface OrgOption {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface OrgSwitcherProps {
  current: OrgOption;
  organizations: OrgOption[];
  onOrgChange: (id: string) => void;
  defaultOpen?: boolean;
  items?: ContextMenuItem[];
  renderLink?: (props: ContextMenuRenderLinkProps) => ReactNode;
}

export function OrgSwitcher({ current, organizations, onOrgChange, defaultOpen, items, renderLink }: OrgSwitcherProps) {
  const others = organizations.filter((o) => o.id !== current.id);

  return (
    <DropdownMenu.Root defaultOpen={defaultOpen}>
      <DropdownMenu.Trigger asChild>
        <button type="button" className="org-switcher__trigger">
          <Avatar src={current.logoUrl} name={current.name} alt="" size="sm" shape="square" className="org-switcher__logo" />
          <span className="org-switcher__name">{current.name}</span>
          <Icon name="chevron" size="sm" className="org-switcher__chevron" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="org-switcher__content"
          sideOffset={4}
          align="start"
        >
          <DropdownMenu.CheckboxItem
            className="org-switcher__item org-switcher__item--active"
            checked
            onCheckedChange={() => undefined}
          >
            <Avatar src={current.logoUrl} name={current.name} alt="" size="sm" shape="square" />
            <span>{current.name}</span>
          </DropdownMenu.CheckboxItem>

          {others.map((org) => (
            <DropdownMenu.Item
              key={org.id}
              className="org-switcher__item"
              onSelect={() => onOrgChange(org.id)}
            >
              <Avatar src={org.logoUrl} name={org.name} alt="" size="sm" shape="square" />
              <span>{org.name}</span>
            </DropdownMenu.Item>
          ))}

          {items && items.length > 0 && (
            <>
              <DropdownMenu.Separator className="org-switcher__separator" />
              {items.map((item, i) => {
                if (item.type === 'separator') {
                  return <DropdownMenu.Separator key={i} className="org-switcher__separator" />;
                }
                if (item.type === 'link') {
                  return (
                    <DropdownMenu.Item key={i} className="org-switcher__item" disabled={item.disabled} asChild>
                      {renderLink
                        ? renderLink({ href: item.href, children: item.label, className: '' })
                        : <a href={item.href}>{item.label}</a>
                      }
                    </DropdownMenu.Item>
                  );
                }
                return (
                  <DropdownMenu.Item
                    key={i}
                    className={`org-switcher__item${item.destructive ? ' org-switcher__item--destructive' : ''}`}
                    disabled={item.disabled}
                    onSelect={item.onClick}
                  >
                    {item.icon && item.icon}
                    {item.label}
                  </DropdownMenu.Item>
                );
              })}
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
