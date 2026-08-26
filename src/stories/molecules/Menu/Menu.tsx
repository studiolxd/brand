import type { ReactNode } from 'react';
import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import {
  renderDropdownItems,
  defaultRenderLink,
  type MenuItem,
  type MenuRenderLinkProps,
} from '../_shared/dropdownItems';
import './Menu.css';

export type {
  MenuItem,
  MenuButtonItem,
  MenuLinkItem,
  MenuSeparatorItem,
  MenuLabelItem,
  MenuRadioItem,
  MenuRenderLinkProps,
} from '../_shared/dropdownItems';

export interface MenuProps {
  /**
   * Elemento que abre el menú. Recibe las props del trigger por `render`,
   * así que vale cualquier cosa que las reenvíe (un `Button`, un icono, un
   * avatar…). `ContextMenu` (tres puntos) y `UserMenu` (avatar) son este
   * menú con un disparador fijado.
   */
  trigger: ReactNode;
  items: MenuItem[];
  /** Valor activo del grupo de radio. Obligatorio si hay ítems `radio`. */
  value?: string;
  onValueChange?: (value: string) => void;
  renderLink?: (props: MenuRenderLinkProps) => ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Abre también al pasar el ratón por el disparador (flyout). Pulsar sigue funcionando. */
  openOnHover?: boolean;
  /** Retardo del hover, en ms. */
  hoverDelay?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  minWidth?: string;
  maxWidth?: string;
  /** Talla de los ítems, la del disparador (32/40/48): el panel desplegado casa con el control plegado, como en el Select. */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function itemClass(destructive?: boolean) {
  return ['menu__item', destructive ? 'menu__item--destructive' : '']
    .filter(Boolean)
    .join(' ');
}

/**
 * El menú desplegable del sistema: define el vocabulario de ítems y la cara
 * (tokens `menu.*`) de todos los menús; `ContextMenu`, `UserMenu`,
 * `OrgSwitcher` o `DropdownField` son este menú con un disparador concreto.
 */
export function Menu({
  trigger,
  items,
  value,
  onValueChange,
  renderLink = defaultRenderLink,
  open,
  defaultOpen,
  onOpenChange,
  openOnHover = false,
  hoverDelay = 150,
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  minWidth = '10rem',
  maxWidth,
  size = 'md',
  className,
}: MenuProps) {
  return (
    <BaseMenu.Root open={open} defaultOpen={defaultOpen} onOpenChange={(next) => onOpenChange?.(next)}>
      <BaseMenu.Trigger render={trigger as React.ReactElement<Record<string, unknown>>} openOnHover={openOnHover} delay={hoverDelay} />
      <BaseMenu.Portal>
        <BaseMenu.Positioner className="menu__positioner" side={side} align={align} sideOffset={sideOffset}>
          <BaseMenu.Popup
            className={['menu__content', size !== 'md' ? `menu__content--${size}` : '', className].filter(Boolean).join(' ')}
            style={{ minWidth, ...(maxWidth ? { maxWidth } : {}) }}
          >
            {renderDropdownItems({
              items,
              itemClass,
              separatorClass: 'menu__separator',
              labelClass: 'menu__label',
              radioValue: value,
              onRadioValueChange: onValueChange,
              renderLink,
            })}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
