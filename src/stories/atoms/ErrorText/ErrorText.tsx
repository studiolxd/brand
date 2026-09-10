import { forwardRef } from 'react';
import './ErrorText.css';

export interface ErrorTextProps extends React.ComponentPropsWithoutRef<'p'> {
  /**
   * Qué elemento se pinta. `p` es lo normal —el error es una frase—; `div`
   * cuando el sitio del DOM no admite un párrafo (dentro de otro `<p>`, en una
   * celda que ya lo tiene) y `span` cuando el error va **en línea**, dentro de
   * una frase o de una fila con el control. No cambia la pinta ni el rol.
   */
  as?: 'p' | 'div' | 'span';
  /**
   * Id del mensaje, para apuntarlo desde el control con `aria-describedby`.
   * Sin él, el error se anuncia igual (es un `role="alert"`) pero no queda
   * atado a nada: quien lo lea tabulando al control no lo oirá.
   */
  id?: string;
  children: React.ReactNode;
}

/**
 * El **error de formulario suelto**: la misma cara que el `errorMessage` de un
 * `*Field`, pero sin campo del que colgar.
 *
 * Está para lo que no es un campo y falla igual — el importe que no se pudo
 * calcular junto a un selector, el resultado de una comprobación que acompaña a
 * un control compuesto—: sin él la única salida era un `Paragraph` con
 * `Text tone="destructive"`, que da otro cuerpo y otra tinta que el error de al
 * lado. Dentro de un `*Field` no se usa: ahí el error es `errorMessage`, y en un
 * formulario de react-hook-form, `FormMessage`.
 *
 * Se anuncia solo (`role="alert"`), así que aparecer ya es hablar: se monta
 * cuando hay error y se desmonta cuando deja de haberlo, nunca se deja vacío.
 * Para un error de página o de operación —«no se pudo guardar»— está `Alert`,
 * que es un bloque con su icono.
 */
export const ErrorText = forwardRef<HTMLParagraphElement, ErrorTextProps>(function ErrorText({
  as = 'p',
  className,
  children,
  ...rest
}, ref) {
  // Los tres elementos comparten el tipo de ref (`HTMLElement`); el
  // estrechamiento mantiene el tipo público en el `p` por defecto.
  const Element = as as 'p';

  return (
    <Element
      ref={ref}
      role="alert"
      className={['error-text', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Element>
  );
});
