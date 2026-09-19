import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import type { HeadingLevel } from '../../atoms/Heading/Heading';
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
export declare const SiteSearch: import("react").ForwardRefExoticComponent<SiteSearchProps & import("react").RefAttributes<HTMLInputElement>>;
