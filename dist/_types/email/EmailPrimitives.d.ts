import type { CSSProperties, ReactNode } from 'react';
export interface EmailHeadingProps {
    children: ReactNode;
    style?: CSSProperties;
}
/** El título del mensaje. Un correo es un documento suelto: va como `<h1>`. */
export declare function EmailHeading({ children, style }: EmailHeadingProps): import("react/jsx-runtime").JSX.Element;
export interface EmailTextProps {
    children: ReactNode;
    style?: CSSProperties;
}
/** Un párrafo del cuerpo del correo. */
export declare function EmailText({ children, style }: EmailTextProps): import("react/jsx-runtime").JSX.Element;
export interface EmailNoteProps {
    children: ReactNode;
    /**
     * `muted` (por defecto) para una nota dentro del recuadro, en tinta
     * secundaria. `plain` para una que va FUERA, sobre el fondo de la página:
     * ahí el gris se lee como deshabilitado y no como secundario.
     */
    tone?: 'muted' | 'plain';
    style?: CSSProperties;
}
/** Letra menor: descargos, avisos de caducidad, pie del mensaje. */
export declare function EmailNote({ children, tone, style }: EmailNoteProps): import("react/jsx-runtime").JSX.Element;
export interface EmailLinkProps {
    href: string;
    children: ReactNode;
    style?: CSSProperties;
}
/** Un enlace dentro del texto. */
export declare function EmailLink({ href, children, style }: EmailLinkProps): import("react/jsx-runtime").JSX.Element;
export interface EmailButtonProps {
    href: string;
    children: ReactNode;
    /**
     * La frase que presenta el enlace de respaldo, p. ej. «O copia y pega esta
     * dirección en el navegador:». La dirección se pinta debajo, en su propia
     * línea, así que la frase se escribe con su puntuación.
     *
     * **Obligatoria, y sin valor por defecto** — la única prop de texto del DS
     * que no lo tiene. Es deliberado por partida doble: el correo vive en seis
     * idiomas que conoce `mailer` y no el DS, y hacerla obligatoria es lo que
     * garantiza que ninguna plantilla se deje el respaldo. Un botón sin él es
     * un correo sin plan B.
     */
    fallbackLabel: string;
    style?: CSSProperties;
}
/**
 * La acción del correo: el par lavanda/prusia de `Button primary`, a ancho
 * completo, **con la misma dirección en texto justo debajo**.
 *
 * Las dos piezas son un solo componente a propósito. Hay clientes que
 * destrozan los botones, y la gente reenvía correos y los abre en otro
 * dispositivo: el enlace en texto es el plan B, y un plan B que cada plantilla
 * tuviera que acordarse de añadir no lo sería.
 *
 * La dirección va como texto plano, no dentro de un `<a>`: lo que se pide de
 * ella es leerla y copiarla, y así no hay enlace que un cliente pueda vaciar
 * de estilo o quitar. Los que autoenlazan lo harán solos.
 *
 * Y va en su **propia línea**, bajo la frase que la presenta: arrancando a
 * media línea, una dirección larga entraba partida desde el primer renglón y
 * costaba encontrarle el principio. El salto es un `<br />` dentro del mismo
 * párrafo —no un segundo `<Text>`— porque las dos piezas son una sola frase y
 * porque el margen inferior del bloque lo cierra el respaldo: partirlo en dos
 * párrafos metería el margen entre medias. `<br />` lo entiende cualquier
 * cliente, incluido el motor de Word.
 */
export declare function EmailButton({ href, children, fallbackLabel, style }: EmailButtonProps): import("react/jsx-runtime").JSX.Element;
