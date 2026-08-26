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
     * Grupos de comandos, en orden. Los grupos sin ítems no se renderizan —
     * el call-site no necesita condicionarlos.
     */
    groups: CommandPaletteGroup[];
    /** Título accesible y visible del diálogo. */
    title: string;
    placeholder: string;
    /** Texto del estado "sin resultados". */
    emptyLabel: string;
    /**
     * Etiqueta accesible de la lista. cmdk rotula el listbox "Suggestions" en
     * inglés si no se pasa, así que en apps multiidioma es obligatoria de facto.
     */
    listLabel?: string;
    /** Etiqueta del botón de cierre del diálogo. */
    closeLabel?: string;
    /**
     * Tecla del atajo global (con ⌘ o Ctrl) que abre y cierra la paleta.
     * `false` desactiva el atajo — la apertura queda en manos del call-site.
     */
    shortcut?: string | false;
    className?: string;
}
/**
 * Paleta de comandos ⌘K: diálogo con buscador difuso, resultados agrupados y
 * estado vacío. Se monta una sola vez en el shell de la aplicación y se
 * alimenta de forma declarativa con `groups`.
 *
 * `cmdk` aporta el comportamiento (filtrado, navegación con ↑↓, Enter) igual
 * que Base UI en el resto del DS; la superficie es la del `Modal`.
 */
export declare function CommandPalette({ open, onOpenChange, groups, title, placeholder, emptyLabel, listLabel, closeLabel, shortcut, className, }: CommandPaletteProps): import("react/jsx-runtime").JSX.Element;
