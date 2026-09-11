import type { CSSProperties, ReactNode } from 'react';
import { type EmailTone } from './emailTheme';
export interface EmailHeadingProps {
    children: ReactNode;
    /**
     * `1` (por defecto) es el título del mensaje, uno por correo. `2` es el
     * título de un bloque dentro del cuerpo — «Riesgos», «Requisitos», «También
     * han encajado»— para un correo que tiene demasiado que decir de un tirón.
     *
     * Son dos escalones del mismo componente y no dos componentes, porque es lo
     * que son: un título más pequeño. El de bloque es **dos peldaños** más bajo y
     * lleva aire por encima, que es lo que hace de él un corte.
     */
    level?: 1 | 2;
    style?: CSSProperties;
}
/**
 * El título del mensaje y, en `level={2}`, el de cada bloque del cuerpo.
 *
 * Un correo es un documento suelto: su título va como `<h1>`, y los bloques que
 * lo dividen como `<h2>`. Lo que **no** es un título de bloque es una versalita
 * gris a 12px: eso es lo que se inventó `TenderBatchEmail` por su cuenta, y el
 * sistema no tiene rol de versalita ni se le añade uno para el correo.
 */
export declare function EmailHeading({ children, level, style }: EmailHeadingProps): import("react/jsx-runtime").JSX.Element;
export interface EmailTextProps {
    children: ReactNode;
    /**
     * La frase que resume el correo antes de entrar en el detalle: sube al peso
     * de énfasis del sistema, sin cambiar tamaño ni tinta. Para entonar un
     * párrafo, no para titular un bloque — eso es `EmailSectionTitle`.
     */
    emphasis?: boolean;
    style?: CSSProperties;
}
/** Un párrafo del cuerpo del correo. */
export declare function EmailText({ children, emphasis, style }: EmailTextProps): import("react/jsx-runtime").JSX.Element;
export interface EmailListProps {
    /** Los `EmailListItem`. */
    children: ReactNode;
    /** `true` para una lista numerada (`<ol>`): pasos, un orden que significa. */
    ordered?: boolean;
    style?: CSSProperties;
}
/**
 * Una lista del cuerpo: riesgos, requisitos, lo que cambió.
 *
 * Es un `<ul>`/`<ol>` de verdad y no párrafos con un bolo delante —que es como
 * la escribían las apps—: el bolo escrito a mano deja al lector de pantalla sin
 * saber cuántos elementos hay ni dónde acaban, y el sangrado de la segunda
 * línea lo tiene que fingir cada plantilla.
 */
export declare function EmailList({ children, ordered, style }: EmailListProps): import("react/jsx-runtime").JSX.Element;
export interface EmailListItemProps {
    children: ReactNode;
    style?: CSSProperties;
}
/** Un elemento de `EmailList`. */
export declare function EmailListItem({ children, style }: EmailListItemProps): import("react/jsx-runtime").JSX.Element;
export interface EmailQuoteProps {
    children: ReactNode;
    style?: CSSProperties;
}
/**
 * Palabras que no son nuestras, con una barra al lado: lo que escribió quien
 * denunció un contenido, el motivo con el que se rechazó algo.
 *
 * No lleva tono. Citar no es avisar: el color diría algo sobre lo citado que el
 * correo no está diciendo. Para avisar está `EmailCallout`.
 */
export declare function EmailQuote({ children, style }: EmailQuoteProps): import("react/jsx-runtime").JSX.Element;
export interface EmailTagProps {
    children: ReactNode;
    /**
     * El veredicto: `success`, `warning` o `error`. **Obligatorio y sin valor por
     * defecto**: una etiqueta de estado sin estado no significa nada, y no hay un
     * tono neutro al que caer porque ningún correo de la suite lo pide todavía.
     */
    tone: EmailTone;
    style?: CSSProperties;
}
/**
 * El veredicto como pastilla: «Validado con avisos», «Validado», «Rechazado».
 *
 * Es lo que hoy pinta a mano el correo de validación de `lmsmarketplace`, con
 * sus tres hexes copiados —que son exactamente los del sistema—.
 *
 * Acompaña a una frase, no la sustituye — el color va antes que la palabra para
 * quien mira por encima, pero el correo tiene que leerse igual sin él, porque
 * hay clientes que se comen los fondos.
 *
 * Va dentro de un `EmailText` o suelta sobre su propia línea; no tiene margen
 * propio, lo pone el párrafo que la contiene.
 */
export declare function EmailTag({ children, tone, style }: EmailTagProps): import("react/jsx-runtime").JSX.Element;
export interface EmailDividerProps {
    style?: CSSProperties;
}
/**
 * La línea que parte el correo en dos: lo que se cuenta con detalle y lo que
 * solo se lista, el mensaje y su pie.
 *
 * `border: 0` antes del `border-top` no es de más: el `<hr>` trae de serie un
 * borde en relieve por los cuatro lados que los clientes heredan tal cual.
 */
export declare function EmailDivider({ style }: EmailDividerProps): import("react/jsx-runtime").JSX.Element;
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
