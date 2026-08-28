import { forwardRef } from 'react';
import './Code.css';

export interface CodeProps extends React.ComponentPropsWithoutRef<'code'> {
  children: React.ReactNode;
}

/**
 * Un fragmento de código **dentro de una línea de texto**: el nombre de una
 * prop, una ruta, un comando corto. El hermano de bloque es `CodeBlock`, que
 * es una caja con cabecera y botón de copiar; esto es una marca en el párrafo.
 *
 * Sus tokens cuelgan de los de `CodeBlock`, así que un fragmento en línea y un
 * bloque se ven como la misma familia. El aire vertical es cero a propósito:
 * un fondo alto rompería el interlineado del párrafo que lo contiene.
 *
 * Lleva clase BEM (`.code`) y no estila el elemento `<code>` a secas —a
 * diferencia de `Link`— porque `code` también vive dentro del `<pre>` de
 * `CodeBlock` y de `Prose`, donde no debe repetir fondo ni caja.
 *
 * `{...rest}` (`id`, `aria-*`, `data-*`…) se reenvía al `<code>` y `className`
 * se concatena tras las clases propias.
 */
export const Code = forwardRef<HTMLElement, CodeProps>(function Code(
  { className, children, ...rest },
  ref,
) {
  return (
    <code ref={ref} className={['code', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </code>
  );
});
