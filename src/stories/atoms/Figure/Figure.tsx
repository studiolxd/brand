import { forwardRef } from 'react';
import { useRender } from '@base-ui-components/react/use-render';
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

/** La proporción sale de un token, no de una cifra escrita en el CSS. */
const RATIO_CLASS: Record<Exclude<FigureRatio, 'auto'>, string> = {
  '1:1': 'figure__media--ratio-1-1',
  '4:3': 'figure__media--ratio-4-3',
  '3:2': 'figure__media--ratio-3-2',
  '16:9': 'figure__media--ratio-16-9',
  '21:9': 'figure__media--ratio-21-9',
};

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
export const Figure = forwardRef<HTMLElement, FigureProps>(function Figure({
  src,
  alt = '',
  caption,
  ratio = 'auto',
  fit = 'cover',
  render,
  className,
  children,
  ...rest
}, ref) {
  const classes = ['figure', className ?? ''].filter(Boolean).join(' ');

  const mediaClasses = [
    'figure__media',
    ratio !== 'auto' ? RATIO_CLASS[ratio] : '',
    ratio !== 'auto' && fit === 'contain' ? 'figure__media--contain' : '',
  ].filter(Boolean).join(' ');

  // La imagen del consumidor (next/image y compañía) recibe la clase de la
  // imagen propia: el encaje y el tamaño los sigue poniendo el sistema.
  const rendered = useRender({
    render,
    enabled: render !== undefined,
    props: { className: 'figure__img' },
  });

  return (
    <figure ref={ref} className={classes} {...rest}>
      <div className={mediaClasses}>
        {rendered ?? (src !== undefined ? <img className="figure__img" src={src} alt={alt} /> : children)}
      </div>
      {caption !== undefined && <figcaption className="figure__caption">{caption}</figcaption>}
    </figure>
  );
});
