import { type MouseEvent } from 'react';
import './TableOfContents.css';
export interface TableOfContentsItem {
    /** `id` del encabezado al que apunta la entrada. El enlace será `#id`. */
    id: string;
    /** Texto de la entrada: el del encabezado. */
    label: string;
    /** Nivel del encabezado (`2` para un `h2`, `3` para un `h3`…). La sangría es relativa al nivel más alto de la lista. */
    level: number;
}
export interface TableOfContentsProps {
    /** Entradas, en el orden en que aparecen en el documento. */
    items: TableOfContentsItem[];
    /**
     * `id` de la sección en la que está el lector. El scroll lo observa el
     * consumidor: el índice solo pinta lo que le digan.
     */
    activeId?: string;
    /**
     * Nombre accesible del `nav`. Por defecto, en castellano.
     * @default 'En esta página'
     */
    ariaLabel?: string;
    /** Rótulo visible sobre la lista. Sin él, no se pinta ninguno. */
    title?: string;
    /**
     * Fija el índice al hacer scroll (`position: sticky`). La distancia al borde
     * y el alto máximo son tokens (`--table-of-contents-sticky-*`).
     */
    sticky?: boolean;
    /** Se llama al pulsar una entrada, además de seguir el ancla. Para desplazamiento suave o para cerrar un panel. */
    onItemClick?: (item: TableOfContentsItem, event: MouseEvent<HTMLAnchorElement>) => void;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Índice de anclas de la página: la lista de encabezados del documento, con
 * sangría por nivel y una marca en la sección en la que está el lector.
 *
 * Es un componente **controlado y sin scroll propio**: no observa la página ni
 * decide qué está a la vista. El consumidor calcula `activeId` (con un
 * `IntersectionObserver` o con el hash de la URL) y el índice lo pinta. Así el
 * mismo componente sirve para un índice con scroll-spy, para uno que solo
 * sigue al hash y para uno estático.
 */
export declare const TableOfContents: import("react").ForwardRefExoticComponent<TableOfContentsProps & import("react").RefAttributes<HTMLElement>>;
