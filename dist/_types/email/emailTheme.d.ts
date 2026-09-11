import { type EmailTokenName } from './emailTokens';
/** El valor de un token del correo, ya resuelto y en píxeles. */
export declare function emailToken(name: EmailTokenName): string;
/**
 * La paleta del correo. Un solo juego: el correo es solo claro.
 *
 * El modo oscuro se retiró a propósito, no por no haberlo probado. Eso NO
 * impide que Outlook Windows o Gmail Android inviertan los colores por su
 * cuenta: lo que se deja de hacer es gestionarlo. Con fondo blanco y tinta
 * oscura el resultado invertido es legible, y el logotipo lleva su blanco
 * horneado, así que aguanta.
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
/**
 * El logotipo, tal como lo sirve el PNG generado por `scripts/build-email-assets.mjs`:
 * el isotipo a `logo-mark-size` con `logo-padding` de blanco horneado alrededor.
 * `width`/`height` van explícitos en el `<img>` — el archivo es el doble.
 */
export declare const emailLogo: {
    readonly size: number;
    /** El nombre lleva versión: Gmail cachea las imágenes y no admite refresco. */
    readonly filename: "logo-v1.png";
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
 * Estilos inline compartidos por las plantillas.
 *
 * Se exportan además de las primitivas porque una plantilla siempre acaba
 * necesitando un caso que las primitivas no cubren (una celda de tabla, un
 * bloque compuesto), y ahí la alternativa a esto es volver a escribir píxeles
 * a mano.
 */
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
    /** Letra menor y tinta secundaria, dentro del recuadro. */
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
        readonly backgroundColor: string;
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
    };
    readonly buttonFallback: {
        readonly color: string;
        readonly fontFamily: string;
        readonly fontSize: string;
        readonly fontWeight: number;
        readonly lineHeight: string;
        readonly margin: `${string} 0 ${string}`;
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
    readonly sectionTitle: {
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
    readonly callout: {
        readonly fontFamily: string;
        readonly fontSize: string;
        readonly fontWeight: number;
        readonly lineHeight: string;
        readonly margin: `0 0 ${string}`;
        readonly padding: `${string} ${string}`;
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
    readonly keyValue: {
        readonly color: string;
        readonly fontFamily: string;
        readonly fontSize: string;
        readonly fontWeight: number;
        readonly lineHeight: string;
        readonly margin: `0 0 ${string}`;
    };
    readonly keyValueLabel: {
        readonly color: string;
        readonly fontSize: string;
        readonly fontWeight: number;
    };
    readonly code: {
        readonly backgroundColor: string;
        readonly color: string;
        readonly fontFamily: string;
        readonly fontSize: string;
        readonly lineHeight: string;
        readonly margin: `0 0 ${string}`;
        readonly padding: `${string} ${string}`;
        readonly wordBreak: "break-all";
        readonly wordWrap: "break-word";
    };
    /** La fila de columnas. El ancho de cada una lo decide quien la escribe. */
    readonly columns: {
        readonly marginBottom: string;
        readonly width: "100%";
    };
    readonly column: {
        readonly color: string;
        readonly fontFamily: string;
        readonly fontSize: string;
        readonly fontWeight: number;
        readonly lineHeight: string;
        readonly verticalAlign: "top";
    };
};
/**
 * Los cuatro tonos del correo, cada uno un par relleno/tinta autocontenido.
 *
 * Los usan `EmailCallout` y `EmailTag`, que son la misma idea a dos tamaños: un
 * bloque que avisa y una pastilla que etiqueta. Comparten tabla para que un
 * «error» no sea de un rojo en el recuadro y de otro en la etiqueta.
 *
 * `info` no sale de `tokens/color/feedback.json` y no es un descuido: informar
 * no es dar feedback de una acción, así que su color es el prusia de la marca
 * —el mismo par que `Tag info` y `Alert default` en la web— y no un color de
 * sistema.
 */
export declare const emailTones: {
    readonly info: {
        readonly backgroundColor: string;
        readonly color: string;
    };
    readonly success: {
        readonly backgroundColor: string;
        readonly color: string;
    };
    readonly warning: {
        readonly backgroundColor: string;
        readonly color: string;
    };
    readonly error: {
        readonly backgroundColor: string;
        readonly color: string;
    };
};
/** El tono de un aviso o de una etiqueta de estado. */
export type EmailTone = keyof typeof emailTones;
/**
 * La única clase del correo. Existe porque el hover del botón no cabe inline y
 * su regla necesita un gancho que no atrape a los demás enlaces.
 */
export declare const emailButtonClassName = "email-button";
/**
 * Lo único que el correo no puede llevar inline: las pseudoclases.
 *
 * Es toda la hoja de estilos del correo. Antes había un bloque mucho mayor con
 * las reglas de modo oscuro y las clases (`.email-body`, `.email-surface`,
 * `.email-text`…) que existían solo para que esas reglas pudieran engancharse;
 * al retirarse el modo oscuro se fueron con él.
 *
 * Dos reglas:
 *
 * 1. El enlace se desubraya bajo el puntero, como en la web.
 * 2. El botón hace el salto de `Button primary`: del lavanda al amarillo, con
 *    la tinta prusia quieta. Va con `!important` porque compite con el estilo
 *    inline del propio botón, que le gana por especificidad. Y engancha por la
 *    clase `email-button`, no por `a`: el enlace de respaldo y los de baja son
 *    enlaces del correo y no deben ponerse amarillos.
 *
 * Esto solo se ve donde el cliente respeta el `<style>` del head —Gmail web,
 * Apple Mail—; en Outlook de escritorio, que renderiza con el motor de Word, no,
 * y en el móvil no hay puntero. Donde no llegue, el botón se queda en su reposo,
 * que es la lectura correcta: es pulido, no una señal de la que dependa nada.
 */
export declare const emailStyleSheet: string;
