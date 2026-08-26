import type { ReactNode } from 'react';
export type MenuButtonItem = {
    type: 'button';
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    destructive?: boolean;
    /**
     * `false` mantiene el menú abierto tras elegir el ítem — para acciones que
     * se encadenan (marcar varias cosas) o que dejan al usuario donde estaba.
     * Por defecto el menú se cierra.
     */
    closeOnSelect?: boolean;
};
export type MenuLinkItem = {
    type: 'link';
    label: string;
    icon?: ReactNode;
    href: string;
    disabled?: boolean;
    destructive?: boolean;
};
export type MenuSeparatorItem = {
    type: 'separator';
};
/** Rótulo de sección dentro del menú. No es interactivo. */
export type MenuLabelItem = {
    type: 'label';
    label: string;
};
/**
 * Ítem de elección exclusiva. El valor activo lo lleva el menú
 * (`value`/`onValueChange`), como en cualquier grupo de radio.
 */
export type MenuRadioItem = {
    type: 'radio';
    /** Texto del ítem; admite un nodo para, por ejemplo, marcar el idioma con `lang`. */
    label: ReactNode;
    value: string;
    icon?: ReactNode;
    disabled?: boolean;
};
export type MenuItem = MenuButtonItem | MenuLinkItem | MenuSeparatorItem | MenuLabelItem | MenuRadioItem;
/**
 * Props del enlace de un ítem. Además de `href`, `children` y `className`,
 * el motor de menú inyecta atributos (role, tabIndex, handlers de teclado…):
 * el `renderLink` del producto debe **propagarlos todos** a su enlace.
 */
export type MenuRenderLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: ReactNode;
    className: string;
};
/** Reenvía TODO lo que inyecta Base UI: un renderLink que solo copie href/className rompe el menú. */
export declare function defaultRenderLink({ children, ...props }: MenuRenderLinkProps): import("react/jsx-runtime").JSX.Element;
interface RenderDropdownItemsOptions {
    items: MenuItem[];
    itemClass: (destructive?: boolean) => string;
    separatorClass: string;
    renderLink: (props: MenuRenderLinkProps) => ReactNode;
    /** Clase del rótulo de sección (ítems `label`). Sin ella, no se renderizan. */
    labelClass?: string;
    /** Valor activo del grupo de radio. */
    radioValue?: string;
    onRadioValueChange?: (value: string) => void;
}
export declare function renderDropdownItems({ items, itemClass, separatorClass, renderLink, labelClass, radioValue, onRadioValueChange, }: RenderDropdownItemsOptions): ReactNode;
export {};
