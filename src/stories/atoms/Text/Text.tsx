import { forwardRef } from 'react';
import './Text.css';

export interface TextProps extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * Qué elemento se pinta, que es lo mismo que decir **qué significa**:
   * `span` no añade significado, `em` marca énfasis de lectura (cambia cómo se
   * dice la frase) y `strong` marca importancia. No es una prop de estilo.
   */
  as?: 'span' | 'em' | 'strong' | 'del' | 's';
  /**
   * Intención del fragmento. `destructive` es la palabra que dice que algo se
   * pierde («esta acción **borra** el curso»); `success`, la que dice que salió
   * bien; `muted`, una aclaración secundaria.
   */
  tone?: 'default' | 'muted' | 'destructive' | 'success';
  /**
   * Tacha el fragmento con una línea y lo atenúa (tinta secundaria): lo que ya
   * está hecho, como un producto que ya está en el carrito. Es **solo
   * aspecto**: no dice nada al lector de pantalla. Si el tachado significa algo
   * («este precio ya no vale»), usa `as="del"` o `as="s"`, que además lo tachan.
   * Con un `tone` manda el color del tono.
   */
  strikethrough?: boolean;
  /**
   * Idioma de **este fragmento**, cuando no es el de la página: una cita, un
   * término sin traducir, un segmento de traducción. Marca el idioma para el
   * lector de pantalla, que cambia de voz, y para el corte de línea.
   */
  lang?: string;
  /** Dirección del fragmento. Con un idioma RTL dentro de texto LTR hace falta. */
  dir?: 'ltr' | 'rtl' | 'auto';
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * Texto **en línea**: un trozo de una frase que hay que marcar sin salirse de
 * ella. Tres usos, y ningún otro:
 *
 * - **Otro idioma** (`lang`): el fragmento se anuncia con la voz correcta y se
 *   corta según sus reglas. Antes esto era un `<span lang>` a mano en cada
 *   producto.
 * - **Tachado** (`strikethrough`, o `as="del"`/`as="s"`): lo hecho o lo que ya
 *   no vale, en tinta atenuada.
 * - **Intención** (`tone`): énfasis con carga —destructiva o de logro— en tinta
 *   de feedback. Es color de texto sobre la superficie, **nunca un relleno**:
 *   una palabra resaltada dentro de un párrafo no lleva fondo.
 *
 * No es un componente de maquetación: para poner cosas en fila está `Inline`;
 * para un párrafo, `Paragraph`.
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text({
  as = 'span',
  tone = 'default',
  strikethrough = false,
  className,
  children,
  ...rest
}, ref) {
  const classes = [
    'text',
    strikethrough || as === 'del' || as === 's' ? 'text--strikethrough' : '',
    tone !== 'default' ? `text--${tone}` : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  // Los tres elementos comparten el tipo de ref (`HTMLElement`); el
  // estrechamiento mantiene el tipo público en el `span` por defecto.
  const Element = as as 'span';

  return (
    <Element ref={ref as React.Ref<HTMLSpanElement>} className={classes} {...rest}>
      {children}
    </Element>
  );
});

export interface LineBreakProps extends React.ComponentPropsWithoutRef<'br'> {
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * Salto de línea **dentro de una frase**: un `<br>` con nombre, sin pintura
 * propia. Existe porque un texto traducido no puede traer marcado —una app
 * escribe `t.rich('…', { br: () => <LineBreak /> })` y no puede escribir
 * `<br>` en el catálogo de cadenas.
 *
 * Solo para cortar una línea dentro de una misma frase: un lema, una
 * dirección, un verso. **Entre párrafos no**: eso es separación, y la dan
 * `Paragraph` y `Stack`.
 */
export const LineBreak = forwardRef<HTMLBRElement, LineBreakProps>(function LineBreak({
  className,
  ...rest
}, ref) {
  const classes = ['text__break', className ?? ''].filter(Boolean).join(' ');

  return <br ref={ref} className={classes} {...rest} />;
});
