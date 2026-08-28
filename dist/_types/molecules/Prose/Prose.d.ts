import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import './Prose.css';
/** Elementos con los que puede montarse el contenedor de texto largo. */
export type ProseElement = 'div' | 'article' | 'section' | 'main' | 'aside';
export interface ProseProps extends ComponentPropsWithoutRef<'div'> {
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
    children: ReactNode;
}
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
 * Reenvía el resto de props del elemento (`data-*`, `aria-*`, `id`…) y
 * concatena `className` tras las clases propias.
 */
export declare const Prose: import("react").ForwardRefExoticComponent<ProseProps & import("react").RefAttributes<HTMLDivElement>>;
