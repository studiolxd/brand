import type { ReactNode } from 'react';
import { DotsButton } from '../../atoms/DotsButton/DotsButton';
import { Menu, type MenuItem, type MenuRenderLinkProps } from '../Menu/Menu';

/** Los ítems del ContextMenu son los del `Menu`. */
export type ContextMenuItem = MenuItem;
export type ContextMenuRenderLinkProps = MenuRenderLinkProps;

export interface ContextMenuProps {
  items: MenuItem[];
  renderLink?: (props: MenuRenderLinkProps) => ReactNode;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  minWidth?: string;
  maxWidth?: string;
  /** Talla del botón de tres puntos (talla del sistema). */
  triggerSize?: 'sm' | 'md' | 'lg';
  triggerOrientation?: 'horizontal' | 'vertical';
  /** Nombre accesible del botón. */
  label?: string;
}

/**
 * El menú de acciones de una fila, una tarjeta, un elemento: un `Menu` cuyo
 * disparador es el botón de tres puntos (`DotsButton`). Todo lo demás —ítems,
 * enlaces del router, colocación, cara— es del `Menu`.
 */
export function ContextMenu({
  items,
  renderLink,
  onOpenChange,
  side = 'bottom',
  align = 'end',
  minWidth,
  maxWidth,
  triggerSize = 'md',
  triggerOrientation = 'horizontal',
  label = 'Más opciones',
}: ContextMenuProps) {
  return (
    <Menu
      items={items}
      renderLink={renderLink}
      onOpenChange={onOpenChange}
      side={side}
      align={align}
      minWidth={minWidth}
      maxWidth={maxWidth}
      trigger={<DotsButton size={triggerSize} orientation={triggerOrientation} aria-label={label} />}
    />
  );
}
