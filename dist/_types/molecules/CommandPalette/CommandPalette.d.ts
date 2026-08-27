import { type ReactNode } from 'react';
import './CommandPalette.css';
export interface CommandPaletteItem {
    /** Clave estable del ítem. */
    id: string;
    /** Etiqueta visible; es también el texto sobre el que filtra el buscador. */
    label: string;
    icon?: ReactNode;
    onSelect: () => void;
    /** Términos extra por los que el ítem debe encontrarse. */
    keywords?: string[];
    disabled?: boolean;
}
export interface CommandPaletteGroup {
    id: string;
    heading: string;
    items: CommandPaletteItem[];
}
export interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /**
     * Grupos de comandos, en orden. Los grupos que se quedan sin ítems al
     * filtrar no se renderizan — el call-site no necesita condicionarlos.
     */
    groups: CommandPaletteGroup[];
    /** Título accesible y visible del diálogo. */
    title: string;
    placeholder: string;
    /** Texto del estado "sin resultados". */
    emptyLabel: string;
    /**
     * Etiqueta accesible de la lista de resultados (`role="listbox"`). Sin ella
     * el listbox se queda sin nombre: pásala siempre en apps multiidioma.
     */
    listLabel?: string;
    /** Etiqueta del botón de cierre del diálogo. */
    closeLabel?: string;
    /**
     * Tecla del atajo global (con ⌘ o Ctrl) que abre y cierra la paleta.
     * `false` desactiva el atajo — la apertura queda en manos del call-site.
     */
    shortcut?: string | false;
    /**
     * Idioma con el que se comparan las cadenas al filtrar (`Intl.Collator`).
     * Por defecto, el del entorno.
     */
    locale?: Intl.LocalesArgument;
    className?: string;
}
/**
 * Paleta de comandos ⌘K: diálogo con buscador, resultados agrupados y estado
 * vacío. Se monta una sola vez en el shell de la aplicación y se alimenta de
 * forma declarativa con `groups`.
 *
 * El comportamiento (filtrado, navegación con ↑↓, Enter) es el `Autocomplete`
 * de Base UI en modo `inline` — sin popup propio, porque la superficie ya la
 * pone el `Modal`, que también se queda con Escape y el foco atrapado.
 */
export declare function CommandPalette({ open, onOpenChange, groups, title, placeholder, emptyLabel, listLabel, closeLabel, shortcut, locale, className, }: CommandPaletteProps): import("react/jsx-runtime").JSX.Element;
