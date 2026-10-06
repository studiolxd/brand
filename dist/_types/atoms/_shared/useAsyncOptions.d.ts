/**
 * Lo que recibe un control de búsqueda para pedir opciones: lo escrito, y
 * devuelve la lista, en el acto o en una promesa.
 */
export type SearchOptions<T> = (query: string) => T[] | Promise<T[]>;
export interface AsyncOptions<T> {
    /** Las opciones de la última búsqueda que terminó (y no se descartó). */
    results: T[];
    /** Hay una búsqueda en vuelo. */
    loading: boolean;
    /**
     * Ha terminado al menos una búsqueda desde la última limpieza: distingue
     * «aún no se ha buscado» de «se buscó y no hay nada» (el aviso de vacío).
     */
    hasSearched: boolean;
    /** Busca ya, sin rebote. */
    search: (query: string) => void;
    /** Busca tras el rebote (`debounceMs`); a 0, en el acto. */
    schedule: (query: string) => void;
    /** Cancela el rebote pendiente y descarta la búsqueda en vuelo. */
    cancel: () => void;
    /** Vacía los resultados y vuelve al estado de «aún no se ha buscado». */
    clear: () => void;
}
/**
 * La carga asíncrona que comparten `AsyncSelect`, `AsyncMultiSelect` y
 * `Autocomplete`: rebote entre teclas, un contador de petición para que solo
 * mande la última —dos búsquedas seguidas pueden resolverse fuera de orden y
 * pintar los resultados viejos— y limpieza al desmontar, para que una
 * respuesta tardía no intente pintar nada. Si `onSearch` lanza o rechaza, no
 * hay opciones: el control no tiene un estado de error propio.
 *
 * La conducta del combobox (teclado, foco, anuncios) es de Base UI; esto solo
 * decide qué opciones hay en cada momento.
 */
export declare function useAsyncOptions<T>(onSearch: SearchOptions<T>, debounceMs: number): AsyncOptions<T>;
