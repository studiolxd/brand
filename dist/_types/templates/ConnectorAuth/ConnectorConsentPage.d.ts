import type { ReactNode } from 'react';
import { type ConnectorAuthChromeProps } from './ConnectorAuthShell';
import { ConnectorRequestSummary, type ConnectorScope } from './ConnectorRequestSummary';
export interface ConnectorConsentPageProps extends ConnectorAuthChromeProps {
    /** El nombre con el que la herramienta se registró. **Dato de fuera**: ver `ConnectorRequestSummary`. */
    clientName: string;
    /** El producto de la suite al que se pide acceso. */
    productName?: ReactNode;
    /** La cuenta con la que se está decidiendo. */
    accountEmail: string;
    /** Qué se concede. Default: `'read'`. */
    scope?: ConnectorScope;
    /** El host al que se enviará el acceso, sacado del `redirect_uri` ya validado. */
    redirectHost: string;
    /**
     * Destino del envío nativo. **Con `action` la pantalla funciona sin una
     * línea de JavaScript**: el bloque de decisión es un `<form method="post">`
     * de verdad y los dos botones son `submit`. Es el modo que necesita el
     * servidor de autorización, que la sirve con
     * `Content-Security-Policy: default-src 'none'` —ni un script, ni una hoja
     * de estilos externa— y por tanto no puede depender de un `onClick`.
     *
     * Sin `action`, los botones son botones y la decisión sale por `onApprove` /
     * `onDeny`: el modo de montarla dentro de una aplicación React.
     */
    action?: string;
    /**
     * Los parámetros de OAuth que tienen que viajar con la decisión —`client_id`,
     * `redirect_uri`, `code_challenge`, `state`, `scope`, `consent_nonce`—, como
     * `<input type="hidden">`. Son **datos en tránsito, no interfaz**: la
     * plantilla no los lee ni los valida, solo los devuelve intactos.
     */
    hiddenFields?: Record<string, string>;
    /** Nombre del campo que distingue la decisión en el envío nativo. Default: `'decision'`. */
    decisionName?: string;
    /** Valor que envía el botón de permitir. Default: `'approve'`. */
    approveValue?: string;
    /** Valor que envía el botón de denegar. Default: `'deny'`. */
    denyValue?: string;
    /** La decisión afirmativa, en modo React (sin `action`). */
    onApprove?: () => void;
    /** La negativa, en modo React (sin `action`). */
    onDeny?: () => void;
    /**
     * Denegar como enlace en vez de como envío: la vuelta a la herramienta con
     * `error=access_denied`, ya compuesta por el servidor. Manda sobre
     * `onDeny` y sobre el envío nativo.
     */
    denyHref?: string;
    /**
     * Dónde empieza el foco. Default `'none'`: **la pantalla no enfoca nada**, y
     * el primer tabulador cae en denegar porque es el primero del DOM. Con
     * `'deny'` se enfoca denegar al cargar. Permitir no es una opción, y no se
     * va a añadir: conceder acceso no puede estar a un Intro de distancia de
     * abrir la página.
     */
    initialFocus?: 'none' | 'deny';
    /** Título de la pantalla. Default castellano: «Conectar una herramienta». */
    title?: ReactNode;
    /**
     * La frase de la cabecera. Recibe las tres piezas ya compuestas —la
     * herramienta y la cuenta en negrita, el permiso en texto corriente— porque
     * el orden cambia con el idioma (en alemán la cuenta va antes del permiso).
     * Default castellano.
     */
    intro?: (parts: {
        client: ReactNode;
        what: ReactNode;
        email: ReactNode;
    }) => ReactNode;
    /**
     * El aviso de a dónde se enviará el acceso, bajo la ficha. Recibe el host ya
     * en negrita. Va a tamaño de cuerpo, no de nota al pie: es la señal que
     * convierte una suplantación en visible y no puede leerse como letra
     * pequeña. Default castellano.
     */
    redirectNotice?: (parts: {
        host: ReactNode;
    }) => ReactNode;
    /** Etiqueta del botón que concede. Default castellano: «Permitir acceso». */
    approveLabel?: string;
    /** Etiqueta del botón que deniega. Default castellano: «Denegar». */
    denyLabel?: string;
    /** Alcance en texto, para la frase y para la ficha. Default castellano. */
    scopeReadLabel?: string;
    /** Ídem, lectura y escritura. Default castellano. */
    scopeWriteLabel?: string;
    /** Rótulos de la ficha. Ver `ConnectorRequestSummary`. */
    summaryLabels?: Pick<React.ComponentProps<typeof ConnectorRequestSummary>, 'clientLabel' | 'productLabel' | 'accountLabel' | 'scopeLabel' | 'redirectLabel'>;
    /** Bajo las acciones: un enlace de ayuda, la política de la suite. Se pinta en `links` del `Form`. */
    links?: ReactNode;
}
/**
 * **La pantalla principal del flujo**: una herramienta pide acceso a un
 * producto de la suite y hay que concederlo o denegarlo.
 *
 * La cabecera cuenta la petición en una frase; la columna de la decisión la
 * repite como ficha verificable (`ConnectorRequestSummary`), avisa de a dónde
 * saldrá el acceso y ofrece las dos salidas. Nada más: no hay recordar la
 * decisión, ni elegir alcance a la carta, ni ver qué se llevó la última vez.
 * Una pantalla de una sola decisión.
 *
 * ### Las dos acciones
 *
 * Denegar va **primera en el DOM** y permitir después, como el `Cancelar` de
 * un diálogo del sistema: el recorrido del teclado abre por la salida segura.
 * Visualmente permitir es la principal —es la que ejecuta— y denegar va en
 * `outline`; apiladas (`blockActions`, como el resto de la familia de acceso)
 * permitir queda arriba, que es donde el pulgar espera la acción del
 * formulario. Lo que **no** pasa en ninguna talla es que conceder acceso se
 * lleve el foco al cargar: ver `initialFocus`.
 *
 * ### Sin JavaScript
 *
 * Con `action` la pantalla es un formulario nativo y funciona con los scripts
 * desactivados, que es como la sirve hoy el servidor de autorización. Sin
 * `action` es una pantalla de React con dos callbacks. Las dos formas pintan
 * exactamente lo mismo.
 */
export declare function ConnectorConsentPage({ clientName, productName, accountEmail, scope, redirectHost, action, hiddenFields, decisionName, approveValue, denyValue, onApprove, onDeny, denyHref, initialFocus, title, intro, redirectNotice, approveLabel, denyLabel, scopeReadLabel, scopeWriteLabel, summaryLabels, links, header, footer, preferences, preferencesLabel, id, shell, }: ConnectorConsentPageProps): import("react/jsx-runtime").JSX.Element;
