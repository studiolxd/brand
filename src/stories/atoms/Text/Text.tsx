import { forwardRef } from 'react';
import './Text.css';

export interface TextProps extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * Qué elemento se pinta, que es lo mismo que decir **qué significa**:
   * `span` no añade significado, `em` marca énfasis de lectura (cambia cómo se
   * dice la frase) y `strong` marca importancia. No es una prop de estilo.
   */
  as?: 'span' | 'em' | 'strong';
  /**
   * Intención del fragmento. `destructive` es la palabra que dice que algo se
   * pierde («esta acción **borra** el curso»); `success`, la que dice que salió
   * bien; `muted`, una aclaración secundaria.
   */
  tone?: 'default' | 'muted' | 'destructive' | 'success';
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
 * ella. Dos usos, y ningún otro:
 *
 * - **Otro idioma** (`lang`): el fragmento se anuncia con la voz correcta y se
 *   corta según sus reglas. Antes esto era un `<span lang>` a mano en cada
 *   producto.
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
  className,
  children,
  ...rest
}, ref) {
  const classes = [
    'text',
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
