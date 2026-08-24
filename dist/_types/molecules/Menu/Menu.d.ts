import type { ReactNode } from 'react';
import type { ContextMenuItem, ContextMenuRenderLinkProps } from '../ContextMenu/ContextMenu';
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
/**
 * Menú desplegable con disparador a medida. Comparte lenguaje visual y
 * vocabulario de ítems con `ContextMenu` y `UserMenu`; lo que añade es poder
 * poner cualquier cosa de trigger y ofrecer ítems de elección exclusiva
 * (`radio`) y rótulos de sección (`label`).
 */
export declare function Menu({ trigger, items, value, onValueChange, renderLink, open, defaultOpen, onOpenChange, side, align, sideOffset, minWidth, maxWidth, className, }: MenuProps): import("react/jsx-runtime").JSX.Element;
