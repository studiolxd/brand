import { type ReactNode } from 'react';
import { type ContainerSpace, type ContainerWidth } from '../../atoms/Container/Container';
import './PublicPageShell.css';
export interface PublicPageShellProps {
    /** El contenido de la página: lo que va dentro del `main`. */
    children: ReactNode;
    /** Cabecera del sitio. Va dentro de un `ErrorBoundary`: si lanza al renderizar, desaparece ella y la página sigue. */
    header?: ReactNode;
    /** Pie del sitio. Ídem. */
    footer?: ReactNode;
    /**
     * Las preferencias de la pantalla —idioma y tema—, en una banda propia
     * **entre el contenido y el `footer`**. Se pasan los conmutadores sueltos
     * (`LanguageSwitcher`, `ThemeSwitcher`): la banda pone la `section` con
     * nombre, el ancho de página, el aire y la fila alineada al final.
     *
     * Va aparte del pie porque una preferencia global no es una legal ni una
     * acción del contenido, y el pie legal es un `footer` que no admite
     * invitados. Con `shell={false}` no se pinta: sin marco no hay ranura de
     * pie, igual que `header` y `footer`.
     */
    preferences?: ReactNode;
    /**
     * Nombre accesible de la banda de preferencias. **Sin default**: sin él,
     * sale de `publicPageShell.preferences` del `BrandMessagesProvider`. Solo se
     * lee cuando hay banda.
     */
    preferencesLabel?: string;
    /**
     * Medida del contenido de la banda de preferencias, tal cual la de
     * `Container`. Por defecto `'xl'`, la misma que el `main` de una página
     * pública corriente. Se baja a `'lg'` cuando la página entera lee a esa
     * medida: la banda tiene que alinear con el contenido, no al revés. Lleva el
     * prefijo de la ranura —como `mainWidth`— porque el marco tiene cuatro y un
     * `width` pelado no diría cuál gobierna.
     *
     * No se resuelve anidando un `Container` dentro de `preferences`: eso dobla
     * el relleno lateral y desalinea la banda con el `main`.
     */
    preferencesWidth?: ContainerWidth;
    /**
     * Medida del contenido del `main`, tal cual la de `Container`. Por defecto
     * `'xl'` (1280px), el ancho de las páginas públicas; `'full'` para que el
     * contenido llegue tan lejos como la banda, que es lo que necesita una
     * portada que abre con un `Hero` de lado a lado.
     */
    mainWidth?: ContainerWidth;
    /**
     * Aire vertical del `main`. Por defecto `'xl'`, el de una página pública
     * corriente; `'none'` cuando lo que va dentro son secciones que ya traen su
     * propio aire (ver `Container` § «Las secciones traen su aire»).
     */
    mainSpace?: ContainerSpace;
    /**
     * Quita el aire lateral del `main`, para contenido que debe tocar el borde
     * de la pantalla. Por defecto `false`. Va con `mainWidth="full"`: sin él, el
     * contenido seguiría acotado y solo se perdería el margen.
     */
    mainFlush?: boolean;
    /** `id` del `main` (`main-content` por defecto, destino del `SkipLink`). */
    id?: string;
    /**
     * Con `false` no monta `SiteShell` ni el `main`: devuelve solo los
     * `children`, para pintarlos dentro de un `AppShell` que ya tiene su `main`.
     * Por defecto `true`. Sin marco, `header`, `footer`, `preferences` e `id` no
     * aplican —y tampoco el `ref`, porque no hay marco al que engancharlo.
     */
    shell?: boolean;
}
/**
 * El marco de una página pública, en una sola pieza: `SiteShell` con cabecera
 * y pie opcionales y, dentro, el `main` acotado (`Container`) al que apunta el
 * `SkipLink`. Es el molde del que cuelgan las plantillas públicas
 * —`ErrorPage`, `NotFoundPage`, `OnboardingShell`, la maqueta de acceso—, para
 * que ninguna pueda divergir del marco real.
 *
 * Cabecera, preferencias y pie van cada uno en su `ErrorBoundary`: una página
 * de error no puede depender del chrome que pudo fallar, y el resto de páginas
 * heredan esa garantía gratis.
 *
 * Con `shell={false}` devuelve solo el contenido: es lo que necesita una
 * plantilla pintada dentro de una app que ya tiene su marco y su `main`.
 *
 * **Reenvía el `ref` al nodo raíz del `SiteShell`** (`.site-shell`), el mismo
 * que reenvía `SiteShell` por su cuenta. Ese nodo es el `container` de un panel
 * flotante abierto desde la página —`ConsentPreferences`, un `Modal`, un
 * `Sheet`—: su portal monta por defecto en `document.body`, que no es
 * descendiente de `.site-shell` y por tanto no hereda el remapeo de superficie
 * pública. Apuntarlo al `main` no serviría: el `main` es un `Container` —por
 * defecto acotado y con su aire—, así que el panel quedaría metido dentro de
 * la columna de contenido en vez de flotar sobre la página. Con `shell={false}`
 * no hay marco y el `ref` se queda sin asignar: ahí el contenedor es el
 * `AppShell` de la app.
 *
 * **El `main` lleva los mismos mandos que un `Container`** (`mainWidth`,
 * `mainSpace`, `mainFlush`), con los defaults de siempre. Es lo que permite que
 * una portada abra con un `Hero` de lado a lado sin salirse del marco. La
 * banda de preferencias tiene el suyo, `preferencesWidth`, para que pueda
 * alinear con un contenido más estrecho sin anidar otro `Container` dentro.
 */
/**
 * El único texto del marco, y es **cromo**: el nombre de la banda donde viven
 * el idioma y el tema. Lo que se ponga dentro es **contenido**.
 */
export interface PublicPageShellMessages {
    /** Nombre accesible de la banda de preferencias. */
    preferences: string;
}
export declare const PublicPageShell: import("react").ForwardRefExoticComponent<PublicPageShellProps & import("react").RefAttributes<HTMLDivElement>>;
