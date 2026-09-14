import type { ReactNode } from 'react';
import { type ConnectorAuthChromeProps } from './ConnectorAuthShell';
export interface ConnectorExternalSignInPageProps extends ConnectorAuthChromeProps {
    /**
     * Cómo se llama la instalación de la que es el conector, para la frase y
     * para el botón. Default castellano: «tu Moodle», que hoy es el único
     * conector de esta forma; cambiarlo sirve a cualquier otra instalación
     * ajena a la suite.
     */
    platformName?: ReactNode;
    /**
     * La organización a la que se va a entrar, **ya resuelta**: el conector vive
     * en un subdominio y el servidor la saca del `resource` de la petición. Con
     * ella, la pantalla solo la confirma. Sin ella pinta el campo para
     * escribirla, que es el caso de una conexión al dominio pelado.
     */
    organization?: ReactNode;
    /** Valor inicial del campo de organización, cuando hay que escribirla. */
    organizationDefaultValue?: string;
    /** `name` del campo de organización en el envío. Default: `'org'`. */
    organizationName?: string;
    /**
     * Destino del envío. Una URL, o la acción de servidor que arranca el salto a
     * la instalación: el `<form>` de React 19 acepta las dos, y el flujo de
     * lmsmcp necesita la segunda (2026-09-14).
     */
    action?: string | ((formData: FormData) => void | Promise<void>);
    /** El envío, en modo React (sin `action`). */
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    /** Los parámetros de OAuth que tienen que sobrevivir al salto, como `<input type="hidden">`. */
    hiddenFields?: Record<string, string>;
    /** Un fallo del intento anterior —«no hay ninguna conexión para esa organización»—, sobre el formulario. */
    error?: ReactNode;
    /** Título de la pantalla. Default castellano: «Autorizar la conexión». */
    title?: ReactNode;
    /** La frase de la cabecera. Recibe el nombre de la instalación. Default castellano. */
    intro?: (parts: {
        platform: ReactNode;
    }) => ReactNode;
    /** La frase que confirma a dónde se entra, con `organization`. Default castellano. */
    signingInTo?: (parts: {
        organization: ReactNode;
    }) => ReactNode;
    /**
     * Las comillas que enmarcan la organización en la frase de confirmación:
     * viene de la petición, así que es dato de fuera y se pinta como tal. Default
     * castellano: `['«', '»']`.
     */
    valueQuotes?: [string, string];
    /** Etiqueta del campo de organización. Default castellano: «Tu organización». */
    organizationLabel?: string;
    /** Etiqueta de la acción. Recibe el nombre de la instalación. Default castellano. */
    submitLabel?: (parts: {
        platform: ReactNode;
    }) => ReactNode;
    /**
     * Debajo del formulario: lo que no es del sistema de diseño. Es la ranura
     * donde el producto cuelga su andamio de desarrollo —pegar una clave de MCP,
     * detrás de un `Accordion`— sin que el DS tenga que conocerlo.
     */
    extra?: ReactNode;
    /** Bajo la acción: ayuda, un enlace de vuelta. Se pinta en `links` del `Form`. */
    links?: ReactNode;
}
/**
 * **El caso del conector de Moodle**, que no se parece a los otros tres y por
 * eso tiene pantalla propia.
 *
 * En los conectores de la suite, quien concede es la suite: hay sesión, hay
 * consentimiento y el acceso sale de aquí. En el de Moodle **el conector es de
 * la instalación del cliente**, así que no hay nada que consentir en la suite:
 * la pantalla solo confirma a qué organización se entra y manda a
 * identificarse a su Moodle, que es quien decide. De ahí que no lleve ni ficha
 * de permisos ni botón de denegar — denegar, aquí, es no seguir.
 *
 * Es la única de la familia que **pide un dato**: cuando la organización no
 * viene en la petición (una conexión al dominio pelado), hay que escribirla.
 * Con la organización resuelta, el campo desaparece y queda una frase de
 * confirmación: la pantalla no pregunta lo que ya sabe.
 *
 * Lleva el marco y la talla del resto de la familia —`PublicPageShell`, dos
 * columnas, controles `lg`—, que es lo que hace que las dos familias de
 * conector se lean como hermanas. En el producto esta pantalla vive hoy en una
 * `Card` dentro de una columna estrecha, sin cabecera pública ni pie: al
 * cablearla, ese molde propio se retira y lo pone la plantilla.
 */
export declare function ConnectorExternalSignInPage({ platformName, organization, organizationDefaultValue, organizationName, action, onSubmit, hiddenFields, error, title, intro, signingInTo, valueQuotes, organizationLabel, submitLabel, extra, links, header, footer, preferences, preferencesLabel, id, shell, }: ConnectorExternalSignInPageProps): import("react/jsx-runtime").JSX.Element;
