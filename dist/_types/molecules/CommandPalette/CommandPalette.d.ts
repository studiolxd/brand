import { type ReactNode } from 'react';
import './CommandPalette.css';
/**
 * El cromo de la paleta, y **solo el cromo**: las cuatro cosas que la paleta
 * dice por su cuenta, sin que se las pase nadie.
 *
 * Ninguna nombra un comando: la paleta se llama igual en todas las pantallas
 * («Buscar un comando»), el buscador pide lo mismo, el vacío dice que no hay
 * nada y la lista solo necesita un nombre para el lector. Lo que sí cambia
 * —los grupos y sus ítems— viaja en `groups` y lo escribe la aplicación.
 *
 * El aspa **no está aquí**: es un reenvío puro al `Modal`, y sin `closeLabel`
 * lee `modal.close` como cualquier otro diálogo.
 */
export interface CommandPaletteMessages {
    /** Título accesible y visible del diálogo. */
    title: string;
    /** Marcador del buscador. */
    placeholder: string;
    /** Texto del estado «sin resultados». */
    empty: string;
    /** Nombre accesible de la lista de resultados (`role="listbox"`). */
    list: string;
}
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
    /**
     * Título accesible y visible del diálogo. **Sin default**: sin él, sale de
     * `commandPalette.title` del `BrandMessagesProvider`.
     */
    title?: string;
    /**
     * Marcador del buscador. **Sin default**: sin él, sale de
     * `commandPalette.placeholder` del proveedor.
     */
    placeholder?: string;
    /**
     * Texto del estado «sin resultados». **Sin default**: sin él, sale de
     * `commandPalette.empty` del proveedor.
     */
    emptyLabel?: string;
    /**
     * Nombre accesible de la lista de resultados (`role="listbox"`). **Sin
     * default**: sin ella, sale de `commandPalette.list` del proveedor.
     */
    listLabel?: string;
    /**
     * Nombre accesible del aspa del diálogo. **Reenvío puro** al `Modal`: sin
     * él, el aspa lee `modal.close` del proveedor.
     */
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
