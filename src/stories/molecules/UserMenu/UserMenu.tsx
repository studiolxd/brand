import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { ReactNode } from 'react';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Icon } from '../../atoms/Icon/Icon';
import { NumberBadge } from '../../atoms/NumberBadge/NumberBadge';
import type { ContextMenuItem, ContextMenuRenderLinkProps } from '../ContextMenu/ContextMenu';
import { renderDropdownItems } from '../_shared/dropdownItems';
import './UserMenu.css';

export interface UserMenuProps {
  name: string;
  email: string;
  avatarUrl?: string;
  /** Número de notificaciones sin leer. Si es 0 o undefined, no se muestra el badge. */
  notificationCount?: number;
  items?: ContextMenuItem[];
  renderLink?: (props: ContextMenuRenderLinkProps) => ReactNode;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

function defaultRenderLink({ href, children, className }: ContextMenuRenderLinkProps) {
  return <a href={href} className={className}>{children}</a>;
}

function itemClass(destructive?: boolean) {
  return ['user-menu__item', destructive ? 'user-menu__item--destructive' : '']
    .filter(Boolean)
    .join(' ');
}

export function UserMenu({
  name,
  email,
  avatarUrl,
  notificationCount,
  items = [],
  renderLink = defaultRenderLink,
  onOpenChange,
  defaultOpen,
}: UserMenuProps) {
  return (
    <DropdownMenu.Root onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      <DropdownMenu.Trigger asChild>
        <button type="button" className="user-menu__trigger">
          <span className="user-menu__avatar-wrap">
            <Avatar src={avatarUrl} name={name} alt="" size="sm" className="user-menu__avatar" />
            {!!notificationCount && notificationCount > 0 && (
              <NumberBadge
                count={notificationCount}
                variant="danger"
                aria-label={`${notificationCount} notificaciones sin leer`}
                className="user-menu__notification-badge"
              />
            )}
          </span>
          <span className="user-menu__name">{name}</span>
          <Icon name="chevron" size="sm" className="user-menu__chevron" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="user-menu__content"
          sideOffset={4}
          align="start"
        >
          <div className="user-menu__header">
            <span className="user-menu__header-name">{name}</span>
            <span className="user-menu__header-email">{email}</span>
          </div>

          {items.length > 0 && (
            <>
              <DropdownMenu.Separator className="user-menu__separator" />
              {renderDropdownItems({
                items,
                itemClass,
                separatorClass: 'user-menu__separator',
                renderLink,
              })}
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
