import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ReactNode } from 'react';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Icon } from '../../atoms/Icon/Icon';
import { NumberBadge } from '../../atoms/NumberBadge/NumberBadge';
import type { MenuItem, MenuRenderLinkProps } from '../Menu/Menu';
import { renderDropdownItems } from '../_shared/dropdownItems';
import './UserMenu.css';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { usePortalContainer } from '../../constants/portal-container';

/**
 * Convierte una longitud CSS (`4px`, `0.25rem`) a píxeles. Sin unidad
 * reconocible devuelve 0: el token viaja siempre con el CSS del componente.
 */
function cssLengthToPx(raw: string): number {
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return 0;
  if (raw.endsWith('rem')) return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
  return value;
}

/**
 * `sideOffset` por defecto: el Positioner de Base UI necesita un número, así que
 * el token `--user-menu-offset` (el desplazamiento compartido de los flotantes
 * de la cabecera) se lee en runtime sobre `<html>` en cada cálculo de posición.
 */
function tokenSideOffset(): number {
  const root = document.documentElement;
  return cssLengthToPx(getComputedStyle(root).getPropertyValue('--user-menu-offset').trim());
}

/**
 * Lo que el menú de cuenta dice por su cuenta, y es **cromo**: cómo se nombra
 * su botón y cómo se cuentan las notificaciones sin leer. Los dos interpolan un
 * dato —el nombre, el número—, así que son funciones. El nombre, el correo y
 * los ítems son **contenido** y siguen viniendo por props.
 */
export interface UserMenuMessages {
  /** Nombre accesible del botón, a partir del nombre del usuario. */
  trigger: (name: string) => string;
  /** Nombre accesible del contador de notificaciones sin leer. */
  unread: (count: number) => string;
}

export interface UserMenuProps {
  name: string;
  email: string;
  avatarUrl?: string;
  /**
   * Nombre accesible del botón. **Sin default**: sin él, sale de
   * `userMenu.trigger` del `BrandMessagesProvider`, que recibe el nombre.
   */
  label?: string;
  /** Sin nombre — avatar, badge y chevron: para la barra del AppHeader. El nombre sigue en el panel y en el nombre accesible. */
  compact?: boolean;
  /** Número de notificaciones sin leer. Si es 0 o undefined, no se muestra el badge. */
  notificationCount?: number;
  items?: MenuItem[];
  renderLink?: (props: MenuRenderLinkProps) => ReactNode;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

// Reenvía TODO lo que inyecta Base UI (role, tabIndex, data-highlighted, handlers…):
// un renderLink que solo copie href/className rompe el menú. Los consumidores
// con router deben hacer lo mismo (`<Link {...props} />`).
function defaultRenderLink({ children, ...props }: MenuRenderLinkProps) {
  return <a {...props}>{children}</a>;
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
  label,
  compact = false,
  renderLink = defaultRenderLink,
  onOpenChange,
  defaultOpen,
}: UserMenuProps) {
  const t = useBrandMessages('userMenu');
  const portalContainer = usePortalContainer(undefined);
  return (
    <BaseMenu.Root onOpenChange={(open) => onOpenChange?.(open)} defaultOpen={defaultOpen}>
      <BaseMenu.Trigger className={['user-menu__trigger', compact ? 'user-menu__trigger--compact' : ''].filter(Boolean).join(' ')} aria-label={label ?? t('trigger')(name)}>
          <span className="user-menu__avatar-wrap">
            <Avatar src={avatarUrl} name={name} alt="" size="sm" />
            {!!notificationCount && notificationCount > 0 && (
              <NumberBadge
                count={notificationCount}
                variant="danger"
                aria-label={t('unread')(notificationCount)}
                className="user-menu__notification-badge"
              />
            )}
          </span>
          {!compact && <span className="user-menu__name">{name}</span>}
          <Icon name="chevron" size="sm" className="user-menu__chevron" />
      </BaseMenu.Trigger>

      <BaseMenu.Portal container={portalContainer}>
        <BaseMenu.Positioner className="user-menu__positioner" sideOffset={tokenSideOffset} align="start">
        <BaseMenu.Popup className="user-menu__content">
          <div className="user-menu__header">
            <span className="user-menu__header-name">{name}</span>
            <span className="user-menu__header-email">{email}</span>
          </div>

          {items.length > 0 && (
            <>
              <BaseMenu.Separator className="user-menu__separator" />
              {renderDropdownItems({
                items,
                itemClass,
                separatorClass: 'user-menu__separator',
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
