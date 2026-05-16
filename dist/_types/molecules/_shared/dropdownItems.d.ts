import type { ReactNode } from 'react';
import type { ContextMenuItem, ContextMenuRenderLinkProps } from '../ContextMenu/ContextMenu';
interface RenderDropdownItemsOptions {
    items: ContextMenuItem[];
    itemClass: (destructive?: boolean) => string;
    separatorClass: string;
    renderLink: (props: ContextMenuRenderLinkProps) => ReactNode;
}
export declare function renderDropdownItems({ items, itemClass, separatorClass, renderLink, }: RenderDropdownItemsOptions): ReactNode;
export {};
