import type { ReactNode } from 'react';
import './UntrustedText.css';
/**
 * El cromo con el que se enmarca un dato de fuera: el desplegador de un valor
 * recortado y las comillas que dicen dónde empieza y dónde acaba el texto
 * ajeno.
 *
 * **Los tres son cromo y ninguno afirma nada**, así que van al catálogo: «Ver
 * el valor completo» describe lo único que hace ese desplegador, y las
 * comillas son puntuación del idioma (`['„', '“']` en alemán), no una decisión
 * del producto. Lo que sí es de fuera —el valor— entra por `value` y nunca
 * pasa por aquí.
 */
export interface UntrustedTextMessages {
    /** Etiqueta del desplegador cerrado. */
    expand: string;
    /** Etiqueta del desplegador abierto. */
    collapse: string;
    /** Las comillas que enmarcan el valor, apertura y cierre. */
    quotes: [string, string];
}
export interface UntrustedTextProps {
    /**
     * El valor. Si es una cadena recibe el tratamiento entero —marcado de
     * invisibles, aislamiento de dirección, comillas y recorte—; cualquier otro
     * `ReactNode` se pinta tal cual, porque ya no es texto de fuera sino algo que
     * compuso quien monta la pantalla.
     */
    value: ReactNode;
    /**
     * Con `true`, un valor largo se recorta y se ofrece un desplegador nativo
     * (`<details>`, sin una línea de JavaScript) para verlo entero. Default
     * `false`: dentro de una frase el desplegador no cabe —un `<details>` no
     * puede vivir dentro de un `<p>`—, así que ahí el valor se recorta y quien
     * quiera verlo entero lo despliega en la ficha.
     */
    expandable?: boolean;
    /**
     * Etiqueta del desplegador cerrado. **Sin default**: sin ella, sale de
     * `untrustedText.expand` del `BrandMessagesProvider`, y solo se lee cuando
     * el valor se recorta con `expandable`.
     */
    expandLabel?: string;
    /**
     * Etiqueta del desplegador abierto. **Sin default**: sin ella, sale de
     * `untrustedText.collapse`, en el mismo caso.
     */
    collapseLabel?: string;
    /**
     * Las comillas que enmarcan el valor. **Sin default**: sin ellas, salen de
     * `untrustedText.quotes`. Cambian con el idioma (`['„', '“']` en alemán), y
     * por eso están en el catálogo y no cableadas.
     */
    quotes?: [string, string];
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * **Cómo se pinta un dato que escribió un tercero**: el nombre con el que se
 * registró una herramienta, la cuenta, el host de retorno.
 *
 * Tres cosas, y las tres son de seguridad, no de estética:
 *
 * 1. **Los caracteres invisibles se hacen visibles** (`[U+202E]`). Un control
 *    de dirección deja que `moodle.ejemplo.org` se lea al revés, y en una
 *    pantalla donde se concede acceso eso es suplantación.
 * 2. **El valor va aislado** en un `<bdi>`, que es la herramienta del propio
 *    motor para esto: lo que haya dentro no puede reordenar el texto de
 *    alrededor, y un nombre legítimamente en árabe o hebreo se sigue pintando
 *    bien.
 * 3. **El valor va entrecomillado**, para que se lea como lo que es —una
 *    cadena que eligió quien registró la herramienta— y no como interfaz. Un
 *    nombre registrado como `<strong>Claude</strong>` se ve con sus signos:
 *    eso es la defensa funcionando, y las comillas dicen dónde empieza y dónde
 *    acaba el texto ajeno.
 *
 * Y un cuarto, de maqueta: un valor largo se recorta a
 * `--connector-auth-untrusted-max-lines` líneas. El texto **completo sigue en
 * el documento** —un lector de pantalla lo lee entero, el recorte es solo
 * visual— y con `expandable` hay además un desplegador para verlo.
 */
export declare function UntrustedText({ value, expandable, expandLabel, collapseLabel, quotes, className, }: UntrustedTextProps): import("react/jsx-runtime").JSX.Element;
