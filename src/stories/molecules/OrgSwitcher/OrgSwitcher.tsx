import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Chevron } from '../../atoms/Chevron/Chevron';
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
}

export function OrgSwitcher({ current, organizations, onOrgChange, defaultOpen }: OrgSwitcherProps) {
  const others = organizations.filter((o) => o.id !== current.id);

  return (
    <DropdownMenu.Root defaultOpen={defaultOpen}>
      <DropdownMenu.Trigger asChild>
        <button type="button" className="org-switcher__trigger">
          <Avatar src={current.logoUrl} name={current.name} alt="" size="sm" shape="square" className="org-switcher__logo" />
          <span className="org-switcher__name">{current.name}</span>
          <Chevron size="sm" className="org-switcher__chevron" />
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

          {others.length > 0 && (
            <>
              <DropdownMenu.Separator className="org-switcher__separator" />
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
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
