'use client';

import { forwardRef, useRef, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { useCopyToClipboard } from '../../constants/copy-to-clipboard';
import './CopyableValue.css';

export interface CopyableValueProps {
  /** El valor a mostrar y, por defecto, a copiar. Texto o nodos. */
  children: ReactNode;
  /**
   * Qué se copia. Por defecto, el texto de `children`. Solo hace falta cuando
   * lo que se ve y lo que se copia no coinciden (un valor abreviado, una URL
   * con el protocolo escondido).
   */
  copyText?: string;
  /**
   * Nombre accesible del botón de copiar. Default castellano.
   * @default 'Copiar'
   */
  copyLabel?: string;
  /**
   * Acuse tras copiar, anunciado en una región viva. Default castellano.
   * @default 'Copiado'
   */
  copiedLabel?: string;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * Un valor con su botón de copiar pegado al final: nunca al margen ni en su
 * propia línea. Es el mecanismo de `DescriptionDetails copyable` suelto de la
 * lista de definición, para el dato que se copia y no vive en una `<dl>` —una
 * celda de tabla con una URL de endpoint, un identificador dentro de un
 * párrafo—. El valor sigue siendo **texto corriente**: un dato que se copia no
 * es código.
 */
export const CopyableValue = forwardRef<HTMLSpanElement, CopyableValueProps>(
  function CopyableValue({
    children,
    copyText,
    copyLabel = 'Copiar',
    copiedLabel = 'Copiado',
    className,
  }, ref) {
    const valueRef = useRef<HTMLSpanElement>(null);
    const { status, copy } = useCopyToClipboard();
    const copied = status === 'copied';

    const classes = ['copyable-value', className].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classes}>
        <span ref={valueRef} className="copyable-value__value">{children}</span>
        {/*
          Separador de unión (WORD JOINER, U+2060): un carácter sin ancho que
          prohíbe el salto de línea a ambos lados. Va como nodo de texto
          propio, pegado sin espacio al `span` y al `Button`, para que el
          botón nunca quede solo en su línea, separado del valor por un hueco
          en blanco. Se prefiere a un envoltorio `white-space: nowrap`
          alrededor del botón porque ese envoltorio solo protege su propio
          interior: no impide el corte justo en el borde entre el valor y el
          envoltorio, que es el punto que hay que sellar. El joiner sella
          exactamente ese punto y no depende de qué sean los `children` del
          valor (texto, un icono, lo que sea) — es un hermano, no algo que
          haya que tocar dentro del valor. Cuando ni con el hueco sellado cabe
          el botón en lo que resta de la última línea, el flujo normal lo
          manda a la siguiente — pegado a su principio, como cualquier
          palabra que no cabe, nunca suelto en el margen.
        */}
        {'⁠'}
        <Button
          iconOnly
          variant="ghost"
          size="sm"
          aria-label={copyLabel}
          onClick={() => copy(() => copyText ?? valueRef.current?.textContent ?? '')}
          className="copyable-value__copy"
        >
          <Icon name={copied ? 'check' : 'copy'} size="sm" />
        </Button>
        {/* El icono cambia para quien ve; para quien escucha, este anuncio. */}
        <VisuallyHidden role="status">{copied ? copiedLabel : ''}</VisuallyHidden>
      </span>
    );
  },
);
