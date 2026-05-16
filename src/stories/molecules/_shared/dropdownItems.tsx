import type { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { ContextMenuItem, ContextMenuRenderLinkProps } from '../ContextMenu/ContextMenu';

interface RenderDropdownItemsOptions {
  items: ContextMenuItem[];
  itemClass: (destructive?: boolean) => string;
  separatorClass: string;
  renderLink: (props: ContextMenuRenderLinkProps) => ReactNode;
}

function itemContent(label: string, icon?: ReactNode) {
  if (!icon) return <>{label}</>;
  return (
    <>
      <span aria-hidden="true">{icon}</span>
      {label}
    </>
  );
}

export function renderDropdownItems({
  items,
  itemClass,
  separatorClass,
  renderLink,
}: RenderDropdownItemsOptions): ReactNode {
  return items.map((item, index) => {
    if (item.type === 'separator') {
      return <DropdownMenu.Separator key={index} className={separatorClass} />;
    }

    const content = itemContent(item.label, item.icon);

    if (item.type === 'link') {
      if (item.disabled) {
        return (
          <DropdownMenu.Item key={index} className={itemClass(item.destructive)} disabled>
            {content}
          </DropdownMenu.Item>
        );
      }
      return (
        <DropdownMenu.Item key={index} asChild>
          {renderLink({ href: item.href, children: content, className: itemClass(item.destructive) })}
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
        {content}
      </DropdownMenu.Item>
    );
  });
}
