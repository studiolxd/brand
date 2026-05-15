import type { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsButton } from '../../atoms/DotsButton/DotsButton';
import './ContextMenu.css';

export type ContextMenuButtonItem = {
  type: 'button';
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
};

export type ContextMenuLinkItem = {
  type: 'link';
  label: string;
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
          {items.map((item, index) => {
            if (item.type === 'separator') {
              return <DropdownMenu.Separator key={index} className="context-menu__separator" />;
            }

            if (item.type === 'link') {
              if (item.disabled) {
                return (
                  <DropdownMenu.Item
                    key={index}
                    className={itemClass(item.destructive)}
                    disabled
                  >
                    {item.label}
                  </DropdownMenu.Item>
                );
              }
              return (
                <DropdownMenu.Item key={index} asChild>
                  {renderLink({
                    href: item.href,
                    children: item.label,
                    className: itemClass(item.destructive),
                  })}
                </DropdownMenu.Item>
              );
            }

            return (
              <DropdownMenu.Item
                key={index}
                className={itemClass(item.destructive)}
                disabled={item.disabled}
                onSelect={item.disabled ? undefined : item.onClick}
              >
                {item.label}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
