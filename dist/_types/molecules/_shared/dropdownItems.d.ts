import type { ReactNode } from 'react';
import type { ContextMenuItem, ContextMenuRenderLinkProps } from '../ContextMenu/ContextMenu';
import type { MenuItem } from '../Menu/Menu';
interface RenderDropdownItemsOptions {
    items: ContextMenuItem[] | MenuItem[];
    itemClass: (destructive?: boolean) => string;
    separatorClass: string;
    renderLink: (props: ContextMenuRenderLinkProps) => ReactNode;
    /** Clase de los ítems de tipo `label`. Sin ella, los `label` se ignoran. */
    labelClass?: string;
    /** Clase del glifo decorativo de los ítems de tipo `radio`. */
    radioIndicatorClass?: string;
    /** Valor activo del grupo de radio, para pintar el glifo. */
    radioValue?: string;
    onRadioValueChange?: (value: string) => void;
}
export declare function renderDropdownItems({ items, itemClass, separatorClass, renderLink, labelClass, radioIndicatorClass, radioValue, onRadioValueChange, }: RenderDropdownItemsOptions): ReactNode;
export {};
