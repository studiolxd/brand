'use client';

import { type ReactElement, type ReactNode } from 'react';
import { Autocomplete } from '@base-ui-components/react/autocomplete';
import { InputField } from '../InputField/InputField';
import { Spinner } from '../../atoms/Spinner/Spinner';
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
   * Etiqueta del campo. Default castellano.
   * @default 'Buscar en la documentación'
   */
  label?: string;
  /** Oculta la etiqueta a la vista; el lector de pantalla la sigue leyendo. */
  labelHidden?: boolean;
  /**
   * Pista dentro del campo. Default castellano.
   * @default 'Buscar…'
   */
  placeholder?: string;
  /**
   * Ofrece un botón-aspa que vacía el campo y devuelve el foco. Es el gesto de
   * un autocompletar: se borra para volver a preguntar.
   * @default true
   */
  clearable?: boolean;
  /**
   * Nombre accesible del botón de borrado. Default castellano.
   * @default 'Borrar'
   */
  clearLabel?: string;
  /**
   * Nombre accesible de la lista de resultados. Default castellano.
   * @default 'Resultados'
   */
  resultsLabel?: string;
  /**
   * Aviso cuando la búsqueda no encuentra nada. Default castellano.
   * @default 'Sin resultados.'
   */
  emptyLabel?: string;
  /**
   * Aviso mientras se busca. Default castellano.
   * @default 'Buscando…'
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

/** Reenvía TODO lo que inyecta Base UI: un renderLink que solo copie href rompe el teclado. */
function defaultRenderLink(props: DocsSearchRenderLinkProps) {
  return <a {...props} />;
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
export function DocsSearch({
  id = 'docs-search',
  query,
  onQueryChange,
  results,
  loading = false,
  label = 'Buscar en la documentación',
  labelHidden = false,
  placeholder = 'Buscar…',
  clearable = true,
  clearLabel = 'Borrar',
  resultsLabel = 'Resultados',
  emptyLabel = 'Sin resultados.',
  loadingLabel = 'Buscando…',
  size,
  renderLink = defaultRenderLink,
  onSelect,
  className,
}: DocsSearchProps) {
  const searching = query.trim() !== '';
  // El aviso solo aparece cuando hay algo que decir: sin consulta no se avisa
  // de nada, y con resultados a la vista el «buscando» sería ruido.
  const status = searching && results.length === 0 ? (loading ? loadingLabel : emptyLabel) : null;

  return (
    <Autocomplete.Root
      // La lista va en el flujo de la página, no en un popup; `open` la
      // mantiene navegable para que Enter active el resultado resaltado.
      inline
      open
      items={results}
      // El filtrado ya lo hizo el buscador del consumidor: el motor solo
      // aporta teclado y semántica.
      filter={null}
      value={query}
      onValueChange={onQueryChange}
    >
      <div className={['docs-search', className].filter(Boolean).join(' ')}>
        <Autocomplete.Input
          id={id}
          render={
            <InputField
              id={id}
              label={label}
              labelHidden={labelHidden}
              kind="search"
              clearable={clearable}
              clearLabel={clearLabel}
              placeholder={placeholder}
              {...(size ? { size } : {})}
            />
          }
        />

        <Autocomplete.List className="docs-search__results" aria-label={resultsLabel}>
          {(result: DocsSearchResult) => (
            <Autocomplete.Item
              key={result.href}
              value={result}
              className="docs-search__result"
              onClick={() => onSelect?.(result)}
              render={(props) =>
                renderLink({
                  ...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>),
                  href: result.href,
                  className: (props as { className?: string }).className ?? 'docs-search__result',
                  children: (
                    <>
                      {result.product && (
                        <span className="docs-search__result-product">{result.product}</span>
                      )}
                      <span className="docs-search__result-title">{result.title}</span>
                      {result.excerpt && (
                        <span className="docs-search__result-excerpt">{result.excerpt}</span>
                      )}
                    </>
                  ),
                }) as ReactElement
              }
            />
          )}
        </Autocomplete.List>

        {status && (
          <p className="docs-search__status" role="status">
            {loading && <Spinner size="sm" aria-hidden />}
            {status}
          </p>
        )}
      </div>
    </Autocomplete.Root>
  );
}
