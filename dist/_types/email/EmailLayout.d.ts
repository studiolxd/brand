import type { ReactNode } from 'react';
export interface EmailOptOut {
    /** Baja directa, de un clic, de la categoría de aviso de este correo. */
    unsubscribeUrl: string;
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
    /** Texto del enlace de baja. Por defecto, en castellano. */
    unsubscribeLabel?: string;
    /** Texto entre los dos enlaces del pie completo. Por defecto, en castellano. */
    manageBeforeLabel?: string;
    /** Texto del enlace a preferencias. Por defecto, en castellano. */
    managePreferencesLabel?: string;
    /** Texto tras el enlace a preferencias. Por defecto, en castellano. */
    manageAfterLabel?: string;
}
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
