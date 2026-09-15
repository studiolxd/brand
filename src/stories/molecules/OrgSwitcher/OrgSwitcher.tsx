import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ReactNode } from 'react';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Icon } from '../../atoms/Icon/Icon';
import type { MenuItem, MenuRenderLinkProps } from '../Menu/Menu';
import { renderDropdownItems, defaultRenderLink } from '../_shared/dropdownItems';
import { useSidebar } from '../../sections/Sidebar/SidebarContext';
import './OrgSwitcher.css';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { usePortalContainer } from '../../constants/portal-container';


export interface OrgOption {
  id: string;
  name: string;
  logoUrl?: string;
}

/**
 * El único texto que el conmutador dice por su cuenta, y es **cromo**: cómo se
 * nombra su botón. Interpola la organización activa, así que es una función.
 * Los nombres de las organizaciones son **contenido** y vienen en
 * `organizations`.
 */
export interface OrgSwitcherMessages {
  /** Nombre accesible del botón, a partir del nombre de la organización. */
  trigger: (name: string) => string;
}

export interface OrgSwitcherProps {
  /**
   * Nombre accesible del botón. **Sin default**: sin él, sale de
   * `orgSwitcher.trigger` del `BrandMessagesProvider`, que recibe el nombre de
   * la organización activa.
   */
  label?: string;
  /** Ocupa todo el ancho disponible (en la Sidebar). Por defecto mide lo que su contenido. */
  block?: boolean;
  /** Solo el logo. Sin él, lo decide la `Sidebar` (rail). */
  compact?: boolean;
  current: OrgOption;
  organizations: OrgOption[];
  onOrgChange: (id: string) => void;
  defaultOpen?: boolean;
  items?: MenuItem[];
  renderLink?: (props: MenuRenderLinkProps) => ReactNode;
}

export function OrgSwitcher({ label, block = false, compact, current, organizations, onOrgChange, defaultOpen, items, renderLink = defaultRenderLink }: OrgSwitcherProps) {
  const t = useBrandMessages('orgSwitcher');
  const portalContainer = usePortalContainer(undefined);
  const others = organizations.filter((o) => o.id !== current.id);
  const sidebar = useSidebar();
  const isCompact = compact ?? sidebar.rail;

  return (
    <BaseMenu.Root defaultOpen={defaultOpen}>
      <BaseMenu.Trigger className={['org-switcher__trigger', block && !isCompact ? 'org-switcher__trigger--block' : '', isCompact ? 'org-switcher__trigger--compact' : ''].filter(Boolean).join(' ')} aria-label={label ?? t('trigger')(current.name)}>
          <Avatar src={current.logoUrl} name={current.name} alt="" size="sm" shape="square" />
          {!isCompact && <span className="org-switcher__name">{current.name}</span>}
          {!isCompact && <Icon name="chevron" size="sm" className="org-switcher__chevron" />}
      </BaseMenu.Trigger>

      <BaseMenu.Portal container={portalContainer}>
        <BaseMenu.Positioner className="org-switcher__positioner" sideOffset={4} align="start">
        <BaseMenu.Popup className="org-switcher__content">
          <BaseMenu.CheckboxItem
            className="org-switcher__item org-switcher__item--active"
            checked
            onCheckedChange={() => undefined}
          >
            <Avatar src={current.logoUrl} name={current.name} alt="" size="sm" shape="square" />
            <span>{current.name}</span>
          </BaseMenu.CheckboxItem>

          {others.map((org) => (
            <BaseMenu.Item
              key={org.id}
              className="org-switcher__item"
              onClick={() => onOrgChange(org.id)}
            >
              <Avatar src={org.logoUrl} name={org.name} alt="" size="sm" shape="square" />
              <span>{org.name}</span>
            </BaseMenu.Item>
          ))}

          {items && items.length > 0 && (
            <>
              <BaseMenu.Separator className="org-switcher__separator" />
              {renderDropdownItems({
                items,
                itemClass: (destructive) => ['org-switcher__item', destructive ? 'org-switcher__item--destructive' : ''].filter(Boolean).join(' '),
                separatorClass: 'org-switcher__separator',
                renderLink,
              })}
            </>
          )}
        </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
