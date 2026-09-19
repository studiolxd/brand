'use client';

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Button } from '../../atoms/Button/Button';
import type { HeadingLevel } from '../../atoms/Heading/Heading';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { Alert } from '../../molecules/Alert/Alert';
import { EmptyState } from '../../molecules/EmptyState/EmptyState';
import { SearchForm } from '../../molecules/SearchForm/SearchForm';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './SiteSearch.css';

/**
 * En qué punto está la búsqueda. **Lo decide quien busca**, no el componente:
 * aquí no hay `fetch`, ni rebote, ni filtrado, así que nada de esto se puede
 * deducir de las props.
 *
 * - `idle` — todavía no se ha preguntado nada. Es el estado de partida.
 * - `typing` — hay algo escrito pero aún no se ha buscado: la consulta no
 *   llega a `minLength`, o el rebote está en marcha.
 * - `loading` — la consulta está en vuelo.
 * - `ready` — la respuesta llegó. Con `results` vacío, esto es el «sin
 *   resultados»: un buscador que respondió y no encontró nada.
 * - `error` — la consulta falló. **No es lo mismo que no encontrar nada**, y
 *   por eso son dos estados: el vacío invita a reformular, el error a
 *   reintentar.
 */
export type SiteSearchStatus = 'idle' | 'typing' | 'loading' | 'ready' | 'error';

/** Un resultado. Lo que trae el índice, ya formateado por quien busca. */
export interface SiteSearchResult {
  /** URL del documento. Es también la clave del resultado. */
  href: string;
  /** Título del documento, en texto plano. */
  title: string;
  /**
   * El trozo del documento donde está la coincidencia. Es `ReactNode` para
   * que quien busca pueda resaltarla con `<mark>`, que la hoja ya viste.
   */
  excerpt?: ReactNode;
  /** Dónde vive el documento («Documentación › Creator»). */
  section?: string;
  /** La dirección tal y como se le enseña a quien lee, sin protocolo. */
  displayUrl?: string;
}

export type SiteSearchRenderLinkProps = ComponentPropsWithoutRef<'a'> & {
  href: string;
  className: string;
};

/**
 * Los textos que el buscador emite por su cuenta. Todos son **cromo**: cómo se
 * llama el campo, cómo se dice que está buscando y cómo se avisa de que no
 * hay nada. Los resultados no están aquí — son datos que llegan por
 * `results`.
 *
 * El campo es el `SearchForm` del menú del sitio, así que el buscador no
 * emite ningún texto más: la flecha de envío se nombra con `submit`, y su
 * rótulo ya no se ve — es el nombre accesible del adorno dentro del campo.
 */
export interface SiteSearchMessages {
  /** Etiqueta del campo, que nombra también la región de búsqueda. */
  label: string;
  /** Pista dentro del campo. */
  placeholder: string;
  /** Nombre accesible de la flecha de envío, dentro del campo. */
  submit: string;
  /** Lo que se dice antes de la primera búsqueda. */
  idle: string;
  /** Cuántos caracteres hacen falta para buscar. Función del mínimo. */
  minLength: (min: number) => string;
  /** Lo que se dice con la consulta escrita y la búsqueda aún sin lanzar. */
  pending: string;
  /** Lo que se dice mientras se busca. */
  loading: string;
  /** El recuento: cuántos resultados hay para qué consulta. */
  results: (count: number, query: string) => string;
  /** Nombre accesible de la lista de resultados. */
  resultsLabel: string;
  /**
   * Rótulo del vacío. **No lleva la consulta**: la consulta ya la dice el
   * recuento de arriba («0 resultados para «x»»), y repetirla debajo es la
   * misma frase dos veces.
   */
  emptyTitle: string;
  /** Qué hacer cuando no hay nada. */
  emptyDescription: string;
  /** Rótulo de las sugerencias de búsqueda. */
  suggestionsLabel: string;
  /** Rótulo del error. */
  errorTitle: string;
  /** Qué ha pasado y qué se puede hacer. */
  errorDescription: string;
  /** Rótulo del botón que vuelve a intentarlo. */
  retry: string;
}

export interface SiteSearchProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onSubmit' | 'onSelect' | 'results'> {
  /** Lo escrito en el campo. El componente es controlado: no guarda estado. */
  query: string;
  /** Se llama en cada tecla. Quien lo recibe decide cuándo y cómo buscar. */
  onQueryChange: (query: string) => void;
  /**
   * Se llama al enviar el formulario, con la consulta **recortada**. Con el
   * campo vacío no se llama: un buscador sin consulta no tiene a dónde ir.
   */
  onSubmit?: (query: string) => void;
  /**
   * Destino del envío sin JavaScript. Una búsqueda es una lectura, así que
   * viaja por `get`. Solo se usa cuando no hay `onSubmit`.
   */
  action?: string;
  /**
   * Nombre del parámetro con el que viaja la consulta en el envío sin JS.
   * @default 'q'
   */
  name?: string;
  /** En qué punto está la búsqueda. @default 'idle' */
  status?: SiteSearchStatus;
  /** Los resultados de la página que se está viendo. */
  results?: SiteSearchResult[];
  /**
   * Cuántos resultados hay **en total**, para el recuento. Sin él se cuenta
   * lo que llega en `results`, que con paginación es solo la página actual.
   */
  total?: number;
  /**
   * Cuántos caracteres hacen falta para buscar. Solo se usa para redactar la
   * pista de `typing`: el componente no busca, así que tampoco corta nada.
   * @default 2
   */
  minLength?: number;
  /** Búsquedas propuestas en reposo. Se pintan como botones. */
  suggestions?: string[];
  /** Se llama al pulsar una sugerencia. Sin él, la sugerencia no se pinta como acción. */
  onSuggestionSelect?: (suggestion: string) => void;
  /** Se llama al pulsar «Reintentar». Sin él, el error no ofrece el botón. */
  onRetry?: () => void;
  /** Lo que va entre el campo y los resultados: los filtros de la búsqueda. */
  toolbar?: ReactNode;
  /** Lo que va al pie de los resultados: la paginación. */
  footer?: ReactNode;
  /** Nivel del título de cada resultado. @default 2 */
  headingLevel?: HeadingLevel;
  /** Talla del campo y de su flecha. */
  size?: 'sm' | 'md' | 'lg';
  /** Cuántos resultados fantasma se pintan durante la carga. @default 3 */
  loadingRows?: number;
  /** Se llama al activar un resultado, además de seguir el enlace. */
  onSelect?: (result: SiteSearchResult) => void;
  /**
   * Elemento sobre el que renderizar cada resultado: el `Link` del router del
   * producto. Debe **propagar todas** las props que recibe.
   */
  renderLink?: (props: SiteSearchRenderLinkProps) => ReactNode;
  /** Etiqueta del campo. Sin ella, sale de `siteSearch.label`. */
  label?: string;
  /** Oculta la etiqueta a la vista; el lector la sigue leyendo. @default true */
  labelHidden?: boolean;
  /** Pista dentro del campo. Sin ella, sale de `siteSearch.placeholder`. */
  placeholder?: string;
  /** Nombre accesible de la flecha de envío. Sin él, sale de `siteSearch.submit`. */
  submitLabel?: string;
  /** Nombre accesible de la lista. Sin él, sale de `siteSearch.resultsLabel`. */
  resultsLabel?: string;
}

/** Reenvía TODO lo que recibe: un renderLink que solo copie href rompe el teclado. */
function defaultRenderLink(props: SiteSearchRenderLinkProps) {
  return <a {...props} />;
}

/**
 * El buscador del sitio: el campo, lo que está pasando y los resultados.
 *
 * **No busca nada.** No hace `fetch`, no filtra, no rebota y no pagina:
 * recibe `query`, `status` y `results`, y los pinta. El índice —Pagefind,
 * Algolia, una ruta propia— es del producto, y con él la cancelación de
 * respuestas tardías y el reparto en páginas (que se monta con `footer`).
 *
 * Los cinco estados son explícitos porque ninguno se puede deducir desde
 * aquí, y **el vacío y el error son dos**: «no hay nada para esto» invita a
 * reformular, «no se ha podido buscar» invita a reintentar, y un buscador que
 * los confunde le dice a quien busca que su pregunta no tiene respuesta
 * cuando lo que pasa es que el índice está caído.
 *
 * El `ref` va al `<input>`.
 */
export const SiteSearch = forwardRef<HTMLInputElement, SiteSearchProps>(function SiteSearch({
  query,
  onQueryChange,
  onSubmit,
  action,
  name = 'q',
  status = 'idle',
  results = [],
  total,
  minLength = 2,
  suggestions,
  onSuggestionSelect,
  onRetry,
  toolbar,
  footer,
  headingLevel = 2,
  size,
  loadingRows = 3,
  onSelect,
  renderLink = defaultRenderLink,
  label,
  labelHidden = true,
  placeholder,
  submitLabel,
  resultsLabel,
  className,
  id,
  ...rest
}, ref) {
  const t = useBrandMessages('siteSearch');
  const generatedId = useId();
  const raíz = id ?? generatedId;
  const campoId = `${raíz}-input`;
  const estadoId = `${raíz}-status`;
  const listaId = `${raíz}-results`;

  // El título de un resultado es un encabezado de verdad —así se recorre la
  // lista saltando de título en título— y por defecto un `h2`, que es el
  // peldaño que le toca bajo el `h1` de la página. No pasa por `Heading`: un
  // resultado no es una sección de la página sino una entrada de una lista,
  // así que su cuerpo sale del texto que lo rodea y no de la escala de
  // títulos — un peldaño por encima del cuerpo de la superficie.
  const Título = `h${headingLevel}` as const;

  const consulta = query.trim();
  const recuento = total ?? results.length;
  const hayResultados = status === 'ready' && results.length > 0;

  /**
   * El aviso vivo. La región se pinta siempre, también en reposo y en el
   * error: una región viva que nace con el cambio no se anuncia — el lector
   * solo lee lo que cambia DENTRO de una región que ya estaba.
   */
  const aviso =
    status === 'idle' ? t('idle')
    : status === 'typing'
      ? (consulta.length < minLength ? t('minLength')(minLength) : t('pending'))
    : status === 'loading' ? t('loading')
    // El error no pasa por aquí: el propio aviso es un `role="alert"`, que se
    // anuncia solo y con prioridad. Repetirlo aquí lo diría dos veces al
    // lector y lo escribiría dos veces en la pantalla.
    : status === 'error' ? null
    : t('results')(recuento, consulta);

  return (
    <div className={['site-search', className].filter(Boolean).join(' ')} {...rest}>
      {/* El campo es el del menú del sitio, tal cual: la flecha de envío vive
          dentro del borde del campo y no en una caja aparte. Se reutiliza el
          componente y no solo su dibujo, así que el buscador de la página de
          resultados y el del menú no pueden separarse. */}
      <SearchForm
        ref={ref}
        className="site-search__form"
        id={campoId}
        name={name}
        label={t('label', label)}
        labelHidden={labelHidden}
        placeholder={t('placeholder', placeholder)}
        submitLabel={t('submit', submitLabel)}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        {...(onSubmit ? { onSubmit } : {})}
        action={action}
        describedBy={estadoId}
        {...(hayResultados ? { controls: listaId } : {})}
        {...(size ? { size } : {})}
      />

      {toolbar ? <div className="site-search__toolbar">{toolbar}</div> : null}

      {/* El recuento es a la vez lo que se lee y lo que se anuncia: un aviso
          vivo escondido diría a unos lo que a otros se les niega. */}
      <p className="site-search__status" id={estadoId} role="status" aria-live="polite">
        {status === 'loading' ? <Spinner size="sm" aria-hidden /> : null}
        <span className="site-search__status-text">{aviso}</span>
      </p>

      {status === 'idle' && suggestions && suggestions.length > 0 && onSuggestionSelect ? (
        <div className="site-search__suggestions">
          <span className="site-search__suggestions-label" id={`${raíz}-suggestions`}>
            {t('suggestionsLabel')}
          </span>
          <ul className="site-search__suggestions-list" aria-labelledby={`${raíz}-suggestions`}>
            {suggestions.map((sugerencia) => (
              <li key={sugerencia}>
                <Button variant="outline" size="sm" onClick={() => onSuggestionSelect(sugerencia)}>
                  {sugerencia}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === 'loading' ? (
        // Fantasmas, no un spinner solo: la carga de una lista se enseña con
        // la forma de la lista. `aria-hidden` porque lo que se anuncia es el
        // «Buscando…» de arriba, no doce barras sin texto.
        <div className="site-search__loading" aria-hidden>
          {Array.from({ length: loadingRows }, (_, índice) => (
            <div className="site-search__ghost" key={índice}>
              <Skeleton className="site-search__ghost-section" />
              <Skeleton className="site-search__ghost-title" />
              <Skeleton />
              <Skeleton className="site-search__ghost-url" />
            </div>
          ))}
        </div>
      ) : null}

      {hayResultados ? (
        <ol className="site-search__results" id={listaId} aria-label={t('resultsLabel', resultsLabel)}>
          {results.map((resultado) => (
            <li className="site-search__result" key={resultado.href}>
              {resultado.section ? (
                <p className="site-search__result-section">{resultado.section}</p>
              ) : null}
              <Título className="site-search__result-title">
                {renderLink({
                  href: resultado.href,
                  className: 'site-search__result-link',
                  children: resultado.title,
                  onClick: () => onSelect?.(resultado),
                })}
              </Título>
              {resultado.excerpt ? (
                <p className="site-search__result-excerpt">{resultado.excerpt}</p>
              ) : null}
              {resultado.displayUrl ? (
                <p className="site-search__result-url">{resultado.displayUrl}</p>
              ) : null}
            </li>
          ))}
        </ol>
      ) : null}

      {status === 'ready' && results.length === 0 ? (
        <EmptyState
          className="site-search__empty"
          title={t('emptyTitle')}
          description={t('emptyDescription')}
        />
      ) : null}

      {status === 'error' ? (
        <Alert
          className="site-search__error"
          variant="error"
          title={t('errorTitle')}
          description={t('errorDescription')}
          actions={
            onRetry ? (
              <Button variant="outline" onClick={onRetry}>
                {t('retry')}
              </Button>
            ) : undefined
          }
        />
      ) : null}

      {footer && hayResultados ? <div className="site-search__footer">{footer}</div> : null}
    </div>
  );
});
