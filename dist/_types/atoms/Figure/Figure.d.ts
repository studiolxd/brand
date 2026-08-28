import './Figure.css';
/**
 * Proporción de la caja de imagen. `auto` deja mandar a la propia foto —lo que
 * quiere una captura de pantalla—; el resto la recorta a una proporción fija,
 * que es lo que mantiene alineada una rejilla de imágenes.
 */
export type FigureRatio = 'auto' | '1:1' | '4:3' | '3:2' | '16:9' | '21:9';
export interface FigureProps extends React.ComponentPropsWithoutRef<'figure'> {
    /** URL de la imagen. Se ignora si se pasa `render`. */
    src?: string;
    /** Texto alternativo. Vacío si la imagen no aporta nada al pie. */
    alt?: string;
    /** Pie visible. Sin él no se pinta `<figcaption>`. */
    caption?: React.ReactNode;
    /** Proporción de la caja de imagen. Default: `'auto'`. */
    ratio?: FigureRatio;
    /**
     * Encaje de la imagen en la caja cuando hay proporción fija: `cover` la
     * recorta hasta llenarla, `contain` la mete entera y deja ver el fondo.
     * Default: `'cover'`.
     */
    fit?: 'cover' | 'contain';
    /**
     * Elemento sobre el que renderizar la imagen (p. ej. `<Image />` de
     * Next.js): recibe la clase de la imagen en lugar del `<img>` propio.
     * Sustituye al patrón `asChild` y manda sobre `src`.
     */
    render?: React.ReactElement<Record<string, unknown>>;
}
/**
 * Imagen con pie: el `<figure>`/`<figcaption>` del sistema, con la proporción
 * y el cuerpo del pie por tokens. Es lo que evita que cada producto maquete a
 * mano una foto con su leyenda.
 *
 * La imagen la pinta un `<img>` propio a partir de `src`/`alt`, o el elemento
 * que se pase por `render` cuando la aplicación tiene su propio componente de
 * imagen (el `next/image` de una web Next.js), que ahí sí optimiza. `render`
 * recibe un elemento de React, así que solo funciona desde un componente
 * **cliente**.
 *
 * `{...rest}` (`id`, `aria-*`, `data-*`…) se reenvía al `<figure>` y
 * `className` se concatena tras las clases propias.
 */
export declare const Figure: import("react").ForwardRefExoticComponent<FigureProps & import("react").RefAttributes<HTMLElement>>;
