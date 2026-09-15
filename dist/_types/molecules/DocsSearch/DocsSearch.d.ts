import { type ReactNode } from 'react';
import './DocsSearch.css';
export interface DocsSearchResult {
    /** URL del documento. Es también la clave del resultado. */
    href: string;
    /** Título del documento. */
    title: string;
    /**
     * Fragmento del documento con la coincidencia. Es `ReactNode` para que el
     * buscador pueda resaltar con `<mark>` lo que ha encontrado.
     */
    excerpt?: ReactNode;
    /** Producto o sección a la que pertenece el documento. */
    product?: string;
}
export type DocsSearchRenderLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    className: string;
};
/**
 * Los textos que el buscador emite por su cuenta. Los seis son cromo: en toda
 * la suite el buscador de la documentación se llama igual y avisa igual. Los
 * **resultados** no están aquí — son datos que llegan por `results`.
 *
 * El nombre del aspa tampoco: el aspa es la del `InputField` que hay debajo y
 * sale de `inputField.clear`. Es la misma palabra y el mismo botón; darle una
 * clave propia solo obligaría a traducir «Borrar» dos veces.
 */
export interface DocsSearchMessages {
    /** Etiqueta del campo, que nombra también el punto de referencia. */
    label: string;
    /** Pista dentro del campo. */
    placeholder: string;
    /** Nombre accesible de la lista de resultados. */
    results: string;
    /** Aviso cuando la búsqueda no encuentra nada. */
    empty: string;
    /** Aviso mientras se busca. */
    loading: string;
}
export interface DocsSearchProps {
    /** `id` del campo. Ata la etiqueta con el campo y el campo con la lista. */
    id?: string;
    /** Texto escrito. El componente es controlado: no guarda estado propio. */
    query: string;
    /** Se llama en cada tecla. Quien lo recibe decide cuándo y cómo buscar. */
    onQueryChange: (query: string) => void;
    /** Resultados ya filtrados por el buscador del consumidor. */
    results: DocsSearchResult[];
    /** Hay una búsqueda en curso: el aviso de estado lo dice. */
    loading?: boolean;
    /**
     * Etiqueta del campo. **Sin default**: sale de `docsSearch.label` del
     * `BrandMessagesProvider`.
     */
    label?: string;
    /** Oculta la etiqueta a la vista; el lector de pantalla la sigue leyendo. */
    labelHidden?: boolean;
    /**
     * Pista dentro del campo. **Sin default**: sale de `docsSearch.placeholder`.
     */
    placeholder?: string;
    /**
     * Ofrece un botón-aspa que vacía el campo y devuelve el foco. Es el gesto de
     * un autocompletar: se borra para volver a preguntar.
     * @default true
     */
    clearable?: boolean;
    /**
     * Nombre accesible del botón de borrado. Reenvío puro al `InputField`: sin
     * él, el texto sale de `inputField.clear` del `BrandMessagesProvider`.
     */
    clearLabel?: string;
    /**
     * Nombre accesible de la lista de resultados. **Sin default**: sale de
     * `docsSearch.results`.
     */
    resultsLabel?: string;
    /**
     * Aviso cuando la búsqueda no encuentra nada. **Sin default**: sale de
     * `docsSearch.empty`.
     */
    emptyLabel?: string;
    /**
     * Aviso mientras se busca. **Sin default**: sale de `docsSearch.loading`.
     */
    loadingLabel?: string;
    /** Talla del campo. */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Elemento sobre el que renderizar cada resultado: el `Link` del router del
     * producto. Debe **propagar todas** las props que recibe — el motor inyecta
     * el rol, el `id` del foco virtual y los handlers de teclado.
     */
    renderLink?: (props: DocsSearchRenderLinkProps) => ReactNode;
    /** Se llama al activar un resultado, además de seguir el enlace. */
    onSelect?: (result: DocsSearchResult) => void;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Buscador de documentación: un campo y sus resultados, con navegación por
 * teclado y avisos de estado.
 *
 * **No busca nada.** No hace `fetch`, no filtra y no guarda estado: recibe
 * `query`, `results` y `loading`, y los pinta. El índice —Pagefind, Algolia,
 * una ruta propia— es del producto, y con él el rebote, la cancelación de
 * respuestas tardías y la paginación.
 *
 * La conducta es el `Autocomplete` de Base UI con el filtrado desactivado
 * (`filter={null}`) y la lista en línea, sin popup: los resultados de una
 * búsqueda de documentación no son un menú flotante, son la página.
 */
export declare function DocsSearch({ id, query, onQueryChange, results, loading, label, labelHidden, placeholder, clearable, clearLabel, resultsLabel, emptyLabel, loadingLabel, size, renderLink, onSelect, className, }: DocsSearchProps): import("react/jsx-runtime").JSX.Element;
