import { type ReactNode } from 'react';
import './TreeView.css';
export interface TreeViewNode {
    /** Identificador único en todo el árbol. */
    id: string;
    /** Rótulo de la fila. */
    label: ReactNode;
    /** Marca opcional delante del rótulo (una carpeta, un tipo de contenido). */
    icon?: ReactNode;
    /**
     * Marca de la rama abierta. Sin ella se usa `icon` en los dos estados: es
     * para el par carpeta cerrada / carpeta abierta.
     */
    iconExpanded?: ReactNode;
    /**
     * Ranura a la derecha de la fila: el menú de acciones de esa rama (un `Menu`
     * con su `Button variant="ghost" iconOnly`). Se ve al pasar el puntero por
     * la fila o cuando el foco está dentro de ella, pero **ocupa su sitio
     * siempre**, así que el rótulo no se mueve. Los clics y el teclado de la
     * ranura no llegan al árbol: abrir el menú no elige la fila.
     */
    actions?: ReactNode;
    /**
     * La fila es un destino válido de lo que se está arrastrando. El arrastre lo
     * lleva la aplicación (dnd-kit); el árbol solo lo viste.
     */
    dropTarget?: boolean;
    /**
     * La fila NO puede recibir lo que se está arrastrando. Se atenúa y cambia el
     * cursor, pero **sigue siendo navegable**: no es un nodo deshabilitado, así
     * que no se anuncia con `aria-disabled`; el estado va en `data-drop`.
     */
    dropDisabled?: boolean;
    /** Ramas hijas. Un nodo sin `children` es una hoja. */
    children?: TreeViewNode[];
    /**
     * No se puede elegir. Sigue siendo alcanzable con el teclado y se anuncia
     * como deshabilitado, como pide el patrón: no desaparece del árbol.
     */
    disabled?: boolean;
}
export interface TreeViewProps extends Omit<React.ComponentPropsWithoutRef<'ul'>, 'onSelect'> {
    /** El árbol. */
    items: TreeViewNode[];
    /** Ramas abiertas (controlado). */
    expanded?: string[];
    /** Ramas abiertas al montar (no controlado). */
    defaultExpanded?: string[];
    /** Se llama con la lista de ramas abiertas. */
    onExpandedChange?: (expanded: string[]) => void;
    /** Nodo elegido (controlado). */
    selected?: string;
    /** Nodo elegido al montar (no controlado). */
    defaultSelected?: string;
    /** Se llama con el id del nodo elegido. */
    onSelectedChange?: (id: string) => void;
    /**
     * Nombre accesible del árbol. Default: «Árbol» (castellano). Una app
     * multiidioma debe pasarlo traducido.
     */
    label?: string;
    /**
     * Nivel a partir del cual el rótulo se trunca con puntos suspensivos (el
     * nombre entero queda en `title`). Default: 4 — en una barra lateral la
     * sangría se come el ancho antes de eso.
     */
    truncateFromLevel?: number;
    /**
     * Referencia al elemento de cada fila, para colgarle un destino de arrastre
     * (`setNodeRef` de dnd-kit). Se llama con el id del nodo y con el elemento
     * de la fila —el que se pinta como destino—, y con `null` al desmontarla.
     * No cambia el marcado: la fila sigue siendo el `role="treeitem"`.
     */
    nodeRef?: (id: string, el: HTMLElement | null) => void;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Un árbol con sangría: la matriz de contenidos de un curso, la estructura de
 * carpetas de un espacio. Cada rama se abre y se cierra, y se elige un nodo.
 *
 * Implementa el patrón WAI-ARIA de **tree view** a mano —Base UI no trae árbol—:
 * `role="tree"` con `treeitem` anidados, un solo punto de tabulación y recorrido
 * completo con el teclado: flechas, Inicio/Fin, Intro/Espacio para elegir,
 * salto por letra y `*` para abrir de una vez las ramas hermanas del nivel.
 *
 * Cada fila se viste como un **ítem de la barra lateral** (tokens
 * `sidebar-nav.item-*`): la elegida se marca solo con el peso —sin color de
 * marca— y el hover no pinta nada, como en `SidebarNav`. El relleno se reserva
 * para el único estado que sí lo pide: la carpeta que puede recibir lo que se
 * está arrastrando (`dropTarget`).
 */
export declare function TreeView({ items, expanded: expandedProp, defaultExpanded, onExpandedChange, selected: selectedProp, defaultSelected, onSelectedChange, label, truncateFromLevel, nodeRef, className, ...rest }: TreeViewProps): import("react/jsx-runtime").JSX.Element;
