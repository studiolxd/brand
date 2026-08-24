import type { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type {
  ContextMenuItem,
  ContextMenuRenderLinkProps,
} from '../ContextMenu/ContextMenu';
import { renderDropdownItems } from '../_shared/dropdownItems';
import './Menu.css';

/**
 * Ítem de elección exclusiva. El valor activo lo lleva el propio `Menu`
 * (`value`/`onValueChange`), como en cualquier grupo de radio.
 */
export type MenuRadioItem = {
  type: 'radio';
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
};

/** Rótulo de sección dentro del menú. No es interactivo. */
export type MenuLabelItem = {
  type: 'label';
  label: string;
};

/**
 * Vocabulario de ítems del menú: el de `ContextMenu` (botón, enlace,
 * separador — donde nació y de donde también tira `UserMenu`) más los dos
 * tipos que solo este menú necesita.
 */
export type MenuItem = ContextMenuItem | MenuRadioItem | MenuLabelItem;

export interface MenuProps {
  /**
   * Elemento que abre el menú. Se le pasan los props del trigger vía
   * `asChild`, así que vale cualquier cosa que los reenvíe (un `Button`, un
   * icono, un avatar…). Es la diferencia con `ContextMenu` (trigger fijo de
   * tres puntos) y `UserMenu` (trigger fijo de avatar).
   */
  trigger: ReactNode;
  items: MenuItem[];
  /** Valor activo del grupo de radio. Obligatorio si hay ítems `radio`. */
  value?: string;
  onValueChange?: (value: string) => void;
  renderLink?: (props: ContextMenuRenderLinkProps) => ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  minWidth?: string;
  maxWidth?: string;
  className?: string;
}

function defaultRenderLink({ href, children, className }: ContextMenuRenderLinkProps) {
  return <a href={href} className={className}>{children}</a>;
}

function itemClass(destructive?: boolean) {
  return ['menu__item', destructive ? 'menu__item--destructive' : '']
    .filter(Boolean)
    .join(' ');
}

/**
 * Menú desplegable con disparador a medida. Comparte lenguaje visual y
 * vocabulario de ítems con `ContextMenu` y `UserMenu`; lo que añade es poder
 * poner cualquier cosa de trigger y ofrecer ítems de elección exclusiva
 * (`radio`) y rótulos de sección (`label`).
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
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  minWidth = '10rem',
  maxWidth,
  className,
}: MenuProps) {
  return (
    <DropdownMenu.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={['menu__content', className].filter(Boolean).join(' ')}
          side={side}
          align={align}
          sideOffset={sideOffset}
          style={{ minWidth, ...(maxWidth ? { maxWidth } : {}) }}
        >
          {renderDropdownItems({
            items,
            itemClass,
            separatorClass: 'menu__separator',
            labelClass: 'menu__label',
            radioIndicatorClass: 'menu__radio-indicator',
            radioValue: value,
            onRadioValueChange: onValueChange,
            renderLink,
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
