import { type EmailTokenName } from './emailTokens';
/** El valor de un token del correo, ya resuelto y en píxeles. */
export declare function emailToken(name: EmailTokenName): string;
/**
 * El negativo de un token del correo, para un margen que saca un elemento
 * fuera de su caja (el logotipo de la banda de marca, ver `EmailLayout`).
 *
 * No se escribe `calc(-1 * ...)`: `emailToken` ya devuelve píxeles resueltos
 * — un correo no tiene `var()` que negar — y el soporte de `calc()` en
 * estilos en línea es flojo en los clientes de correo (el motor de Word de
 * Outlook, notablemente). Con un número fijo no hace falta arriesgarlo.
 */
export declare function negatedEmailToken(name: EmailTokenName): string;
/**
 * La paleta del correo. Un solo juego: el correo es solo claro.
 *
 * No hay paleta oscura, y a propósito: el correo se pide SIEMPRE en claro
 * (`emailStyleSheet`, `EmailLayout`). Lo que hace el DS es pedirlo, en capas;
 * no puede impedir que Outlook Windows clásico o Gmail Android inviertan los
 * colores por su cuenta. Con fondo blanco y tinta oscura el resultado
 * invertido es legible, y el logotipo lleva su blanco horneado, así que aguanta.
 */
export declare const emailPalette: {
    /** Fondo general, fuera de la caja. */
    readonly canvas: string;
    /** Fondo de la caja del mensaje. */
    readonly background: string;
    readonly text: string;
    readonly muted: string;
    readonly border: string;
};
/** La sans del sistema con su pila de reserva, tal cual la define el token. */
export declare const emailFontFamily: string;
/**
 * El rango del eje de peso de la sans, para la `@font-face` del correo.
 *
 * Es una fuente variable y `fonts.css` la declara así, `1 1000`. Declararla con
 * un peso suelto —o con dos caras, una por peso, apuntando al mismo fichero—
 * deja al navegador sin eje que variar: acaba emparejando la prosa con la cara
 * del título y el correo sale entero en negrita.
 */
export declare const emailFontWeightRange: string;
/** Ancho del correo. Fuera de 600px, el panel de lectura obliga a scroll. */
export declare const emailMaxWidth: string;
export declare const emailLogo: {
    readonly width: number;
    readonly height: number;
    /** El nombre lleva versión: Gmail cachea las imágenes y no admite refresco. */
    readonly filename: "logo-v3.png";
    /**
     * El texto alternativo, fijo: la imagen es SIEMPRE el logotipo «Studio LXD»,
     * lo mande la app que lo mande, así que el `alt` dice lo que la imagen es y
     * no quién escribe. Muchos clientes bloquean las imágenes de serie y es lo
     * único que se lee entonces en la cabecera.
     */
    readonly alt: "Studio LXD";
};
/**
 * De dónde cuelgan los assets del correo (logotipo y fuente web).
 *
 * Es el valor POR DEFECTO, no una constante escondida: `EmailLayout` acepta
 * `assetsBaseUrl` para que un consumidor la cambie sin tocar el DS. `slxd.app`
 * es el dominio de la marca y el más estable a largo plazo.
 */
export declare const emailAssetsBaseUrl = "https://slxd.app/brand/email";
/** La cara latina de la sans, servida desde el mismo sitio que el logotipo. */
export declare const emailFontFilename = "google-sans-flex-normal-latin-v1.woff2";
/**
 * Un fondo liso que sobrevive a la inversión de colores.
 *
 * Los clientes que pintan el correo en oscuro por su cuenta reescriben
 * `background-color` y no tocan `background-image`: un degradado de un solo
 * color, igual al del fondo, lo mantiene. En un cliente sin modo oscuro es
 * indistinguible de `background-color` a secas, y donde no se entiende (el
 * motor de Word de Outlook) cae a él.
 */
export declare function emailSolidBackground(color: string): {
    backgroundColor: string;
    backgroundImage: string;
};
/**
 * Las clases estables del correo. Ninguna da estilo —todo va inline—: existen
 * para que `emailStyleSheet` pueda reafirmar los colores claros cuando un
 * cliente pinta el correo en oscuro, que desde un atributo `style` no se puede.
 */
export declare const emailClassNames: {
    /** El lienzo: `Body`, la sección que lo envuelve y el pie de baja. */
    readonly canvas: "email-canvas";
    /** La banda del logotipo y el recuadro del mensaje. */
    readonly surface: "email-surface";
    /** El recuadro del mensaje (además de `surface`): lleva el borde. */
    readonly box: "email-box";
    /** La tinta del cuerpo: título, párrafos, listas, la nota del pie y los enlaces de respaldo. */
    readonly text: "email-text";
    /** La tinta secundaria: `EmailNote`. */
    readonly muted: "email-muted";
    /** El título de un bloque (`EmailHeading level={2}`). */
    readonly heading2: "email-heading-2";
    /** Un enlace del texto o del pie de baja. */
    readonly link: "email-link";
    /** El botón. Es además el gancho de su `:hover`. */
    readonly button: "email-button";
    /** La cita (su barra). */
    readonly quote: "email-quote";
    /** El separador. */
    readonly divider: "email-divider";
    readonly tag: {
        readonly success: "email-tag-success";
        readonly warning: "email-tag-warning";
        readonly error: "email-tag-error";
    };
};
export declare const emailStyles: {
    readonly heading: {
        readonly color: string;
        readonly fontFamily: string;
        readonly fontSize: string;
        readonly fontWeight: number;
        readonly lineHeight: string;
        readonly margin: `0 0 ${string}`;
    };
    readonly text: {
        readonly color: string;
        readonly fontFamily: string;
        readonly fontWeight: number;
        readonly fontSize: string;
        readonly lineHeight: string;
        readonly margin: `0 0 ${string}`;
    };
    readonly textEmphasis: {
        readonly fontWeight: number;
    };
    readonly muted: {
        readonly color: string;
        readonly fontFamily: string;
        readonly fontWeight: number;
        readonly fontSize: string;
        readonly lineHeight: string;
        readonly margin: 0;
    };
    readonly footnote: {
        readonly color: string;
        readonly fontFamily: string;
        readonly fontWeight: number;
        readonly fontSize: string;
        readonly lineHeight: string;
        readonly margin: 0;
    };
    readonly button: {
        readonly color: string;
        readonly display: "block";
        readonly width: string;
        readonly textAlign: "center";
        readonly fontFamily: string;
        readonly fontSize: string;
        readonly fontWeight: number;
        readonly padding: `${string} 0`;
        readonly textDecoration: "none";
        readonly marginBottom: string;
        readonly backgroundColor: string;
        readonly backgroundImage: string;
    };
    readonly buttonFallback: {
        readonly margin: `${string} 0 ${string}`;
        readonly color: string;
        readonly fontFamily: string;
        readonly fontWeight: number;
        readonly fontSize: string;
        readonly lineHeight: string;
    };
    readonly buttonFallbackUrl: {
        readonly color: string;
        readonly wordBreak: "break-all";
        readonly wordWrap: "break-word";
    };
    readonly link: {
        readonly color: string;
        readonly fontFamily: string;
        readonly fontWeight: number;
        readonly textDecoration: "underline";
    };
    readonly heading2: {
        readonly color: string;
        readonly fontFamily: string;
        readonly fontSize: string;
        readonly fontWeight: number;
        readonly lineHeight: string;
        readonly margin: `${string} 0 ${string}`;
    };
    readonly list: {
        readonly color: string;
        readonly fontFamily: string;
        readonly fontSize: string;
        readonly fontWeight: number;
        readonly lineHeight: string;
        readonly margin: `0 0 ${string}`;
        readonly paddingLeft: string;
    };
    readonly listItem: {
        readonly margin: `0 0 ${string}`;
    };
    readonly quote: {
        readonly borderLeft: `${string} solid ${string}`;
        readonly margin: `0 0 ${string}`;
        readonly paddingLeft: string;
    };
    readonly tag: {
        readonly borderRadius: string;
        readonly display: "inline-block";
        readonly fontFamily: string;
        readonly fontSize: string;
        readonly fontWeight: number;
        readonly padding: `${string} ${string}`;
    };
    readonly divider: {
        readonly border: 0;
        readonly borderTop: `${string} solid ${string}`;
        readonly margin: `${string} 0`;
        readonly width: "100%";
    };
};
/**
 * Los tres tonos de `EmailTag`, cada uno un par relleno/tinta autocontenido.
 *
 * Son los tres veredictos que hoy pinta un correo de la suite —el de validación
 * de `lmsmarketplace`, que los tenía escritos a mano como `#006616`, `#ffcd00` y
 * `#b30000`: exactamente estos—. No hay un cuarto tono neutro ni uno
 * informativo porque ningún correo los pide todavía.
 *
 * Son RELLENOS, los tres, y lo decide el aviso: el amarillo de marca da 1,50:1
 * sobre blanco y no llega al 3:1 de WCAG como tinta, así que solo existe como
 * relleno con tinta prusia. Darles a los otros dos otra forma habría dejado
 * tres veredictos que no se parecen entre sí.
 */
export declare const emailTones: {
    readonly success: {
        readonly color: string;
        readonly backgroundColor: string;
        readonly backgroundImage: string;
    };
    readonly warning: {
        readonly color: string;
        readonly backgroundColor: string;
        readonly backgroundImage: string;
    };
    readonly error: {
        readonly color: string;
        readonly backgroundColor: string;
        readonly backgroundImage: string;
    };
};
/** El veredicto que pinta una `EmailTag`. */
export type EmailTone = keyof typeof emailTones;
/** La clase del botón, gancho de su `:hover` y de su color forzado en claro. */
export declare const emailButtonClassName: "email-button";
/**
 * La hoja del correo: lo que no cabe en un atributo `style`.
 *
 * Dos asuntos:
 *
 * **1. Las pseudoclases.**
 *
 * - El enlace se desubraya bajo el puntero, como en la web.
 * - El botón hace el salto de `Button primary`: del lavanda al amarillo, con la
 *   tinta prusia quieta. Va con `!important` porque compite con el estilo
 *   inline del propio botón, que le gana por especificidad. Y engancha por la
 *   clase `email-button`, no por `a`: el enlace de respaldo y los de baja son
 *   enlaces del correo y no deben ponerse amarillos.
 *
 * Esto solo se ve donde el cliente respeta el `<style>` del head —Gmail web,
 * Apple Mail—; en Outlook de escritorio, que renderiza con el motor de Word, no,
 * y en el móvil no hay puntero. Donde no llegue, el botón se queda en su reposo,
 * que es la lectura correcta: es pulido, no una señal de la que dependa nada.
 *
 * **2. El correo se pide siempre en claro.** No hay paleta oscura: lo que hay
 * son capas que piden al cliente no pintar el correo en oscuro, de la más
 * limpia a la más tosca —el `color-scheme` de `:root` (y las `meta` del
 * layout), la media query `prefers-color-scheme: dark` que reafirma con
 * `!important` los colores claros por clase, y los selectores `[data-ogsc]` /
 * `[data-ogsb]` con los que Outlook.com y el nuevo Outlook marcan lo que
 * recolorean—. Los valores son los mismos tokens que van inline; ningún color
 * nuevo. Las clases son las de `emailClassNames`.
 */
export declare const emailStyleSheet: string;
