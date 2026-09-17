import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import './Prose.css';
/** Elementos con los que puede montarse el contenedor de texto largo. */
export type ProseElement = 'div' | 'article' | 'section' | 'main' | 'aside';
interface ProseBaseProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'dangerouslySetInnerHTML'> {
    /**
     * Elemento del contenedor. `div` por defecto; `article` cuando el bloque es
     * el documento en sí (una página de documentación, un texto legal).
     */
    as?: ProseElement;
    /** Cuerpo del texto: `md` (el de la superficie) o `sm` (un peldaño por debajo). */
    size?: 'sm' | 'md';
    /**
     * Limita el ancho a la medida de lectura (`--prose-measure`). `false` deja
     * que el contenido ocupe todo el contenedor: para documentos con tablas
     * anchas o figuras a sangre.
     */
    measure?: boolean;
}
export type ProseProps = (ProseBaseProps & {
    /** Contenido en nodos de React. Excluyente con `html`. */
    children: ReactNode;
    html?: never;
}) | (ProseBaseProps & {
    /**
     * Cadena de **HTML ya saneado**, para el contenido que no viene de React: lo
     * que devuelve un parser de `.docx`/`.pdf`, un campo de un CMS, un markdown ya
     * compilado. Excluyente con `children`.
     *
     * Es la misma excepción que ya justifica a `Prose` —el contenido no trae
     * clases porque no lo escribió nadie del sistema— llevada a su forma real: sin
     * esta prop, cada aplicación acababa poniendo su propio
     * `dangerouslySetInnerHTML` en un `<div>` desnudo, fuera de la hoja del
     * sistema, y ese texto salía sin escala, sin ritmo y sin medida de lectura.
     *
     * **El sistema no sanea.** No lleva sanitizador ni va a llevarlo: la política
     * de lo que se permite depende de la aplicación y de dónde venga el HTML. Lo
     * que llega aquí tiene que venir ya limpio del consumidor (`sanitize-html`,
     * DOMPurify, lo que use), y por eso la prop se declara `string` y no un
     * `ReactNode`: es una frontera, y se cruza a conciencia.
     */
    html: string;
    children?: never;
});
/**
 * Contenedor de contenido largo: viste la semántica cruda que sale de un
 * markdown o de un CMS (`h2`–`h6`, `p`, `ul`/`ol`, `blockquote`, `pre`/`code`,
 * `table`, `hr`, `img`) con la escala del sistema, y limita el ancho a la
 * medida de lectura.
 *
 * Es la **excepción documentada** del sistema al estilado de etiquetas nativas:
 * el contenido no viene de React, viene de un `.mdx` o de una cadena de HTML,
 * así que no hay dónde poner una clase. Fuera de `Prose`, la maquetación sigue
 * siendo de componentes (el único otro caso, mucho menor, es el `<mark>` del
 * extracto de `DocsSearch`).
 *
 * El contenido entra de una de dos formas, **nunca de las dos**: `children`
 * (nodos de React) o `html` (una cadena ya saneada). Ver la prop `html`.
 *
 * Reenvía el resto de props del elemento (`data-*`, `aria-*`, `id`…) y
 * concatena `className` tras las clases propias.
 */
export declare const Prose: import("react").ForwardRefExoticComponent<ProseProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
