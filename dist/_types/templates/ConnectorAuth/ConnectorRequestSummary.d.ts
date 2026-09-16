import type { ReactNode } from 'react';
import './ConnectorRequestSummary.css';
/**
 * Los cinco rótulos de la ficha. Son cromo: nombran **qué dato** va en cada
 * fila —herramienta, producto, cuenta, permiso, destino—, que es el vocabulario
 * cerrado de una petición de OAuth y dice lo mismo en los cinco productos de
 * la suite.
 *
 * Lo que **no** está aquí es qué se concede (`scopeReadLabel`,
 * `scopeWriteLabel`): eso afirma qué va a poder hacer la herramienta con los
 * datos de quien lo lea, y el sistema de diseño no puede decidirlo. Son props
 * obligatorias y sin default — ver `ConnectorRequestSummaryProps`.
 */
export interface ConnectorRequestSummaryMessages {
    /** Rótulo de la herramienta. */
    client: string;
    /** Rótulo del producto. */
    product: string;
    /** Rótulo de la cuenta. */
    account: string;
    /** Rótulo del permiso. */
    scope: string;
    /** Rótulo del destino. */
    redirect: string;
}
/** Qué se le concede al conector: leer, o leer y modificar. Son los dos únicos alcances que emite el servidor de autorización (`mcp:read` y `mcp:write`). */
export type ConnectorScope = 'read' | 'write';
export interface ConnectorRequestSummaryProps {
    /**
     * El nombre con el que la herramienta se registró.
     *
     * **Es dato de quien registró el cliente, no de la suite.** El registro es
     * abierto: cualquiera puede darse de alta con el nombre que quiera, así que
     * un «Claude» falso es indistinguible del real. Pásalo como **cadena**: así
     * lo pinta `UntrustedText` —texto plano entrecomillado, con los caracteres
     * invisibles a la vista, aislado de dirección y recortado si es larguísimo—.
     * Un `ReactNode` se pinta tal cual, sin ese tratamiento, porque ya no es
     * texto de fuera sino algo que compusiste tú. Nunca lo pases por
     * `dangerouslySetInnerHTML` ni lo uses para componer una URL.
     */
    clientName: ReactNode;
    /** El producto de la suite al que se pide acceso: bricks, lmsmcp, lrs, sharescorm, tender. */
    productName?: ReactNode;
    /** La cuenta con la que se está decidiendo. Sin sesión —la pantalla de identificarse— no se pasa. */
    accountEmail?: ReactNode;
    /** El alcance concedido. Sin él, la fila no se pinta. */
    scope?: ConnectorScope;
    /**
     * El host al que se enviará el acceso, sacado del `redirect_uri` ya validado
     * contra lo registrado.
     *
     * **Es la única parte de la ficha que quien ataca NO elige**, y por eso está
     * aquí y no en un párrafo suelto: el nombre lo puso quien registró, el host
     * lo impone el registro.
     */
    redirectHost?: ReactNode;
    /** Rótulo de la herramienta. **Sin default**: sin él, sale de `connectorRequestSummary.client`. */
    clientLabel?: string;
    /** Rótulo del producto. **Sin default**: `connectorRequestSummary.product`, y solo con `productName`. */
    productLabel?: string;
    /** Rótulo de la cuenta. **Sin default**: `connectorRequestSummary.account`, y solo con `accountEmail`. */
    accountLabel?: string;
    /** Rótulo del permiso. **Sin default**: `connectorRequestSummary.scope`, y solo con `scope`. */
    scopeLabel?: string;
    /** Rótulo del destino. **Sin default**: `connectorRequestSummary.redirect`, y solo con `redirectHost`. */
    redirectLabel?: string;
    /**
     * Qué se concede con `mcp:read`, en texto.
     *
     * **Obligatoria y sin default, y fuera del catálogo**: es una afirmación
     * sobre lo que la herramienta va a poder hacer con los datos de quien lee la
     * pantalla, y eso lo sabe el servidor de autorización —que es quien emite el
     * alcance— y no un catálogo de cromo. Un texto común aquí diría lo mismo en
     * los cinco productos sin que nada fallara, que es exactamente el riesgo.
     */
    scopeReadLabel: ReactNode;
    /** Ídem para `mcp:write`. **Obligatoria y sin default**, por lo mismo. */
    scopeWriteLabel: ReactNode;
    /** Reenvío puro a `UntrustedText`, que lee `untrustedText.expand` por su cuenta. */
    expandLabel?: string;
    /** Reenvío puro a `UntrustedText` (`untrustedText.collapse`). */
    collapseLabel?: string;
    /** Reenvío puro a `UntrustedText` (`untrustedText.quotes`). */
    valueQuotes?: [string, string];
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * La ficha de la petición: los cinco hechos que hay que mirar antes de
 * conceder nada —qué herramienta, a qué producto, con qué cuenta, con qué
 * permiso y a dónde va el acceso—, en una `DescriptionList`.
 *
 * Es una **lista de datos, no una frase**, a propósito. La frase de la
 * cabecera («X quiere leer los datos de este producto como tú@ejemplo.com»)
 * se lee de corrido y se cree entera; una ficha obliga a que cada dato tenga
 * su rótulo y se pueda comparar con lo que uno esperaba. Los dos textos dicen
 * lo mismo y conviven: la frase explica, la ficha verifica.
 *
 * Los tres valores que vienen de fuera —el nombre de la herramienta, la cuenta
 * y el host— pasan por `UntrustedText`: texto plano entrecomillado, con los
 * caracteres invisibles a la vista, aislados de dirección y recortados con
 * desplegador si son larguísimos. Ver ahí el porqué de cada una de las tres
 * cosas.
 */
export declare function ConnectorRequestSummary({ clientName, productName, accountEmail, scope, redirectHost, clientLabel, productLabel, accountLabel, scopeLabel, redirectLabel, scopeReadLabel, scopeWriteLabel, expandLabel, collapseLabel, valueQuotes, className, }: ConnectorRequestSummaryProps): import("react/jsx-runtime").JSX.Element;
