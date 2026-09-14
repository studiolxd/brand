import type { ReactNode } from 'react';
import { type ConnectorAuthChromeProps } from './ConnectorAuthShell';
import { ConnectorRequestSummary, type ConnectorScope } from './ConnectorRequestSummary';
export interface ConnectorSignInPageProps extends ConnectorAuthChromeProps {
    /** El nombre con el que la herramienta se registró. **Dato de fuera**: ver `ConnectorRequestSummary`. */
    clientName: string;
    /** El producto de la suite al que se pide acceso. */
    productName?: ReactNode;
    /** Qué pide la herramienta. Se enseña ya aquí: quien se identifica tiene derecho a saber para qué. */
    scope?: ConnectorScope;
    /** El host al que se enviaría el acceso. */
    redirectHost?: string;
    /**
     * A dónde se va a identificar: el acceso de la suite, con la vuelta a esta
     * misma petición ya compuesta por el servidor. Con él, la acción es un
     * enlace y la pantalla **no necesita JavaScript**.
     */
    signInHref?: string;
    /** La acción, en modo React (sin `signInHref`). */
    onSignIn?: () => void;
    /** Destino del envío nativo, para reanudar la petición por POST en vez de por enlace. */
    action?: string;
    /** Los parámetros de OAuth que tienen que sobrevivir al acceso, como `<input type="hidden">`. */
    hiddenFields?: Record<string, string>;
    /** Título de la pantalla. Default castellano. */
    title?: ReactNode;
    /**
     * La frase de la cabecera. Recibe la herramienta y el producto ya
     * compuestos. Default castellano.
     */
    intro?: (parts: {
        client: ReactNode;
        product: ReactNode;
    }) => ReactNode;
    /** Nombre del producto cuando no se pasa `productName`, para la frase. Default castellano: «este producto». */
    fallbackProductName?: ReactNode;
    /** Etiqueta de la acción. Default castellano: «Iniciar sesión». */
    signInLabel?: string;
    /** Alcance en texto. Default castellano. */
    scopeReadLabel?: string;
    /** Ídem, lectura y escritura. Default castellano. */
    scopeWriteLabel?: string;
    /** Etiqueta del desplegador de un valor de fuera recortado. Default castellano: «Ver el valor completo». */
    expandLabel?: string;
    /** Etiqueta del desplegador abierto. Default castellano: «Ver menos». */
    collapseLabel?: string;
    /** Las comillas que enmarcan los datos de fuera. Default castellano: `['«', '»']`. */
    valueQuotes?: [string, string];
    /** Rótulos de la ficha. Ver `ConnectorRequestSummary`. */
    summaryLabels?: Pick<React.ComponentProps<typeof ConnectorRequestSummary>, 'clientLabel' | 'productLabel' | 'scopeLabel' | 'redirectLabel'>;
    /** Bajo la acción: «¿No tienes cuenta?», ayuda. Se pinta en `links` del `Form`. */
    links?: ReactNode;
}
/**
 * Se ha llegado al conector **sin sesión**: no hay con qué cuenta conceder
 * nada, así que primero hay que identificarse y luego se vuelve a la pantalla
 * de consentimiento.
 *
 * Enseña ya la ficha de la petición —menos la cuenta, que es justo lo que
 * falta—. Es deliberado: quien va a teclear una contraseña tiene derecho a
 * saber antes qué herramienta está detrás y a dónde va a salir el acceso, y no
 * enterarse dos pantallas más tarde. Y no concede nada: la única acción es
 * identificarse, así que aquí sí es la principal y puede llevarse el foco.
 *
 * Es la pantalla que hoy no existe —el servidor redirige directamente al
 * refresco de sesión del hub— y la que hace falta en cuanto la vuelta falla o
 * el usuario se planta en medio del camino.
 */
export declare function ConnectorSignInPage({ clientName, productName, scope, redirectHost, signInHref, onSignIn, action, hiddenFields, title, intro, fallbackProductName, signInLabel, scopeReadLabel, scopeWriteLabel, expandLabel, collapseLabel, valueQuotes, summaryLabels, links, header, footer, preferences, preferencesLabel, id, shell, }: ConnectorSignInPageProps): import("react/jsx-runtime").JSX.Element;
