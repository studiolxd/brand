import type { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsButton } from '../../atoms/DotsButton/DotsButton';
import { renderDropdownItems } from '../_shared/dropdownItems';
import './ContextMenu.css';

export type ContextMenuButtonItem = {
  type: 'button';
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
};

export type ContextMenuLinkItem = {
  type: 'link';
  label: string;
  icon?: ReactNode;
  href: string;
  disabled?: boolean;
  destructive?: boolean;
};

export type ContextMenuSeparator = {
  type: 'separator';
};

export type ContextMenuItem =
  | ContextMenuButtonItem
  | ContextMenuLinkItem
  | ContextMenuSeparator;

export type ContextMenuRenderLinkProps = {
  href: string;
  children: ReactNode;
  className: string;
};

export interface ContextMenuProps {
  items: ContextMenuItem[];
  renderLink?: (props: ContextMenuRenderLinkProps) => ReactNode;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  minWidth?: string;
  maxWidth?: string;
  triggerSize?: 'sm' | 'md' | 'lg';
  triggerOrientation?: 'horizontal' | 'vertical';
  triggerAriaLabel?: string;
}

function defaultRenderLink({ href, children, className }: ContextMenuRenderLinkProps) {
  return <a href={href} className={className}>{children}</a>;
}

function itemClass(destructive?: boolean) {
  return ['context-menu__item', destructive ? 'context-menu__item--destructive' : '']
    .filter(Boolean)
    .join(' ');
}

export function ContextMenu({
  items,
  renderLink = defaultRenderLink,
  onOpenChange,
  side = 'bottom',
  align = 'end',
  minWidth = '10rem',
  maxWidth,
  triggerSize = 'md',
  triggerOrientation = 'horizontal',
  triggerAriaLabel = 'Más opciones',
}: ContextMenuProps) {
  return (
    <DropdownMenu.Root onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger asChild>
        <DotsButton
          size={triggerSize}
          orientation={triggerOrientation}
          aria-label={triggerAriaLabel}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="context-menu__content"
          side={side}
          align={align}
          sideOffset={4}
          style={{
            minWidth,
            ...(maxWidth ? { maxWidth } : {}),
          }}
        >
          {renderDropdownItems({
            items,
            itemClass,
            separatorClass: 'context-menu__separator',
            renderLink,
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
