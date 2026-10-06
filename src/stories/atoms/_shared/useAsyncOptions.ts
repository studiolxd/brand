'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

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
export function useAsyncOptions<T>(onSearch: SearchOptions<T>, debounceMs: number): AsyncOptions<T> {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef(0);

  const search = useCallback((query: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const requestId = ++requestRef.current;
    setLoading(true);
    setHasSearched(false);
    Promise.resolve()
      .then(() => onSearch(query))
      .then(
        (options) => options,
        () => [] as T[],
      )
      .then((options) => {
        if (requestId !== requestRef.current) return;
        setResults(options);
        setLoading(false);
        setHasSearched(true);
      });
  }, [onSearch]);

  const schedule = useCallback((query: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (debounceMs > 0) {
      debounceRef.current = setTimeout(() => search(query), debounceMs);
    } else {
      search(query);
    }
  }, [debounceMs, search]);

  const cancel = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    requestRef.current += 1;
    setLoading(false);
  }, []);

  const clear = useCallback(() => {
    setResults([]);
    setHasSearched(false);
  }, []);

  // Al desmontar: se cancela el rebote pendiente y se invalida la búsqueda en
  // vuelo, para que su respuesta no intente pintar nada.
  useEffect(() => () => {
    requestRef.current += 1;
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  return { results, loading, hasSearched, search, schedule, cancel, clear };
}
