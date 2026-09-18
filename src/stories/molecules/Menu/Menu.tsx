import type { ReactNode } from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { useCssProperties } from '../../constants/css-properties';
import {
  renderDropdownItems,
  defaultRenderLink,
  type MenuItem,
  type MenuRenderLinkProps,
} from '../_shared/dropdownItems';
import './Menu.css';
import { usePortalContainer } from '../../constants/portal-container';

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
  /**
   * Nodo DOM donde montar el portal. Por defecto, el nodo de la superficie que
   * llegue por contexto —`SiteShell` publica el suyo, para que la capa herede
   * la talla de la superficie pública— y, si no hay ninguna, `document.body`.
   * Pásalo solo para llevar la capa a otro sitio: gana siempre.
   */
  container?: HTMLElement | null;
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
  container,
  className,
}: MenuProps) {
  const portalContainer = usePortalContainer(container);
  // Base UI reconoce «su» disparador comparando el id del DOM con el id que él
  // mismo asigna al Trigger: si el `id` va solo en el elemento de `render`, no
  // casan y el disparador nunca recibe `aria-expanded` ni `data-popup-open`
  // (el chevron no gira). Se le pasa el id del elemento al Trigger.
  const triggerElement = trigger as React.ReactElement<Record<string, unknown>>;
  const triggerId = typeof triggerElement.props?.id === 'string' ? triggerElement.props.id : undefined;
  // El popup vive en un portal y solo existe en cliente: sus anchos se escriben
  // por el CSSOM, nunca en un atributo `style` (que una app con
  // `style-src 'self'` descartaría sin avisar).
  const popupRef = useCssProperties({ 'min-width': minWidth, 'max-width': maxWidth });
  return (
    <BaseMenu.Root open={open} defaultOpen={defaultOpen} onOpenChange={(next) => onOpenChange?.(next)}>
      <BaseMenu.Trigger id={triggerId} render={triggerElement} openOnHover={openOnHover} delay={hoverDelay} />
      <BaseMenu.Portal container={portalContainer}>
        <BaseMenu.Positioner className="menu__positioner" side={side} align={align} sideOffset={sideOffset}>
          <BaseMenu.Popup
            ref={popupRef}
            className={['menu__content', size !== 'md' ? `menu__content--${size}` : '', className].filter(Boolean).join(' ')}
          >
            {renderDropdownItems({
              items,
              itemClass,
              separatorClass: 'menu__separator',
              labelClass: 'menu__label',
              blockClass: 'menu',
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
