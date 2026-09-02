import { type ReactNode } from 'react';
import './TreeView.css';
export interface TreeViewNode {
    /** Identificador único en todo el árbol. */
    id: string;
    /** Rótulo de la fila. */
    label: ReactNode;
    /** Marca opcional delante del rótulo (una carpeta, un tipo de contenido). */
    icon?: ReactNode;
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
 * La selección se marca con **tinta y peso**, y el paso del ratón con una línea:
 * ninguna fila se rellena, como en el resto del sistema.
 */
export declare function TreeView({ items, expanded: expandedProp, defaultExpanded, onExpandedChange, selected: selectedProp, defaultSelected, onSelectedChange, label, className, ...rest }: TreeViewProps): import("react/jsx-runtime").JSX.Element;
