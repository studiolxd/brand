import type { ReactNode } from 'react';
interface EmailOptOutBase {
    /** Baja directa, de un clic, de la categoría de aviso de este correo. */
    unsubscribeUrl: string;
    /** Texto del enlace de baja. */
    unsubscribeLabel?: string;
}
/**
 * El pie de quien **tiene cuenta** en la suite: puede darse de baja y, si el
 * producto tiene la pantalla, elegir categoría a categoría.
 */
export interface EmailOptOutAccount extends EmailOptOutBase {
    /**
     * Pantalla donde elegir categoría a categoría, para quien quiera conservar
     * algunas.
     *
     * Opcional a propósito: las apps que mandaban correo antes de que existiera
     * el paquete solo construyen un enlace de baja, sin pantalla de preferencias
     * detrás. Omitirlo deja el pie de un solo enlace en vez de obligar a cada
     * llamada a inventarse una URL que no tiene.
     */
    preferencesUrl?: string;
    /** Frase que precede al enlace en el pie de un solo enlace. Por defecto, en castellano. */
    manageLabel?: string;
    /** Texto entre los dos enlaces del pie completo. Por defecto, en castellano. */
    manageBeforeLabel?: string;
    /** Texto del enlace a preferencias. Por defecto, en castellano. */
    managePreferencesLabel?: string;
    /** Texto tras el enlace a preferencias. Por defecto, en castellano. */
    manageAfterLabel?: string;
    reasonLabel?: never;
}
/**
 * El pie de quien **no tiene cuenta**: el invitado a una revisión, el que
 * recibe el correo por una dirección suelta. Solo la baja.
 *
 * No es el mismo pie con una URL de menos. Al destinatario sin cuenta hay que
 * decirle **por qué** le llega el correo —no se registró en nada— y no se le
 * puede ofrecer «gestionar preferencias»: esa pantalla vive tras la sesión del
 * hub y no puede abrirla. Por eso el tipo prohíbe `preferencesUrl` en vez de
 * confiar en que nadie la pase.
 */
export interface EmailOptOutGuest extends EmailOptOutBase {
    /**
     * La frase que explica por qué recibe este correo. **Obligatoria y sin
     * default castellano**: el motivo lo sabe el producto que manda el correo,
     * no el DS, y sin él la baja llega sin contexto a quien nunca se dio de alta.
     */
    reasonLabel: string;
    /**
     * Texto del enlace de baja. **Obligatorio aquí, y sin default**: en este pie
     * el enlace es una frase entera que cierra la anterior, así que ningún
     * default del DS podría encajar con el motivo que escribe el consumidor.
     */
    unsubscribeLabel: string;
    preferencesUrl?: never;
    manageLabel?: never;
    manageBeforeLabel?: never;
    managePreferencesLabel?: never;
    manageAfterLabel?: never;
}
/**
 * El pie de baja, en sus dos formas: la de quien tiene cuenta
 * (`EmailOptOutAccount`) y la de quien no (`EmailOptOutGuest`). Se distinguen
 * por `reasonLabel`, que solo lleva la segunda.
 */
export type EmailOptOut = EmailOptOutAccount | EmailOptOutGuest;
export interface EmailLayoutProps {
    /** La línea que el cliente enseña junto al asunto en la bandeja. */
    preview: string;
    /** Quién manda. Es el texto alternativo del logotipo si no se da otro. */
    appName: string;
    /** Idioma del documento. Por defecto, castellano. */
    locale?: string;
    /**
     * De dónde cuelgan el logotipo y la fuente web.
     *
     * El valor por defecto es `https://slxd.app/brand/email`, no una constante
     * escondida: un consumidor que sirva los assets en otro sitio lo cambia aquí
     * sin tocar el DS. Las dos URL se construyen sobre esta base — ver la nota de
     * `emailLogo.filename` y `emailFontFilename` para saber qué hay que subir.
     */
    assetsBaseUrl?: string;
    /**
     * Texto alternativo del logotipo. Por defecto, `appName`.
     *
     * Muchos clientes bloquean las imágenes de serie: sin esto, la cabecera del
     * correo sale en blanco y no se sabe quién escribe.
     */
    logoAlt?: string;
    /** Omitir en el correo transaccional que no pertenece a ninguna categoría. */
    optOut?: EmailOptOut;
    children: ReactNode;
}
export declare function EmailLayout({ preview, appName, locale, assetsBaseUrl, logoAlt, optOut, children, }: EmailLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
