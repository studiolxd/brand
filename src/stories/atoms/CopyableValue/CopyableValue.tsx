'use client';

import { forwardRef, isValidElement, type ReactNode } from 'react';
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

// Chrome (y el resto de motores) abre oportunidad de salto de línea antes de
// un inline atómico (inline-block, inline-flex, un SVG) aunque el carácter
// anterior sea un WORD JOINER: el joiner solo sella cortes ENTRE caracteres,
// no el hueco que un elemento atómico abre por su cuenta. Iba a la cola —los
// últimos caracteres del valor— para que si el botón no cabe en lo que queda
// de línea, arrastre consigo un trozo de texto y no caiga solo, separado del
// valor por el margen en blanco.
const TAIL_MIN_LENGTH = 6;
const TAIL_SEARCH_WINDOW = 12;
const TAIL_SEPARATORS = new Set(['/', '-', '_', '.']);

/**
 * Parte un valor de texto en `head` + `tail`: `tail` es el tramo final que
 * viaja pegado al botón (ver `.copyable-value__tail`, `white-space: nowrap`).
 * Prefiere cortar en el último separador de ruta/identificador (`/`, `-`,
 * `_`, `.`) si cae a menos de `TAIL_SEARCH_WINDOW` caracteres del final —así
 * la cola es un segmento con sentido («/token» en vez de una porción cortada
 * a ciegas—; si no hay separador ahí, cae a los últimos `TAIL_MIN_LENGTH`
 * caracteres. El separador nunca es el último carácter del propio valor
 * (dejaría una cola de un solo carácter): se busca desde `length - 2`.
 */
function splitTail(text: string): { head: string; tail: string } {
  if (text.length <= TAIL_MIN_LENGTH) {
    return { head: '', tail: text };
  }
  const searchFrom = Math.max(0, text.length - TAIL_SEARCH_WINDOW);
  for (let i = text.length - 2; i >= searchFrom; i--) {
    if (TAIL_SEPARATORS.has(text[i])) {
      return { head: text.slice(0, i), tail: text.slice(i) };
    }
  }
  return {
    head: text.slice(0, text.length - TAIL_MIN_LENGTH),
    tail: text.slice(text.length - TAIL_MIN_LENGTH),
  };
}

/**
 * Extrae el texto de un `ReactNode` cuando se puede determinar sin montarlo
 * (cadenas, números, listas de ambos, o un elemento cuyo contenido se reduce
 * a lo mismo). Devuelve `null` en cuanto encuentra algo que no es texto
 * (un icono, un componente sin `children` de texto): ahí la heurística de
 * "nodo corto" no puede aplicarse y se deja el comportamiento por defecto.
 */
function extractStaticText(node: ReactNode): string | null {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) {
    let result = '';
    for (const child of node) {
      const text = extractStaticText(child);
      if (text === null) return null;
      result += text;
    }
    return result;
  }
  if (isValidElement(node)) {
    return extractStaticText((node.props as { children?: ReactNode }).children);
  }
  return null;
}

// Heurística del nodo corto (`children` no textual): sin espacios y hasta
// esta longitud, el nodo entero viaja en el mismo tramo `nowrap` que el
// botón. Un nodo más largo, o con espacios (una frase, no un dato suelto),
// deja el comportamiento por defecto (solo el joiner entre valor y botón) —
// límite documentado en `CopyableValue.mdx`.
const SHORT_NODE_MAX_LENGTH = 24;

export const CopyableValue = forwardRef<HTMLSpanElement, CopyableValueProps>(
  function CopyableValue({
    children,
    copyText,
    copyLabel = 'Copiar',
    copiedLabel = 'Copiado',
    className,
  }, ref) {
    const { status, copy } = useCopyToClipboard();
    const copied = status === 'copied';

    const classes = ['copyable-value', className].filter(Boolean).join(' ');

    // Resuelto ANTES de construir el botón (nunca reasignado): su `onClick`
    // cierra sobre este valor, y modificarlo después de que un JSX lo
    // capture rompe la regla `react-hooks/immutability`.
    const isStringChild = typeof children === 'string';
    const splitResult = isStringChild ? splitTail(children as string) : null;
    const staticText = isStringChild ? null : extractStaticText(children);
    const defaultCopyText = isStringChild ? (children as string) : (staticText ?? '');
    const isShortNode =
      !isStringChild && staticText !== null && !/\s/.test(staticText) && staticText.length <= SHORT_NODE_MAX_LENGTH;

    const copyButton = (
      <Button
        iconOnly
        variant="ghost"
        size="sm"
        aria-label={copyLabel}
        onClick={() => copy(() => copyText ?? defaultCopyText)}
        className="copyable-value__copy"
      >
        <Icon name={copied ? 'check' : 'copy'} size="sm" />
      </Button>
    );

    let content: ReactNode;

    if (isStringChild) {
      const { head, tail } = splitResult!;
      content = (
        <span className="copyable-value__value">
          {head}
          <span className="copyable-value__tail">
            {tail}
            {'⁠'}
            {copyButton}
          </span>
        </span>
      );
    } else {
      content = isShortNode ? (
        <span className="copyable-value__tail">
          <span className="copyable-value__value">{children}</span>
          {'⁠'}
          {copyButton}
        </span>
      ) : (
        <>
          <span className="copyable-value__value">{children}</span>
          {/*
            Separador de unión (WORD JOINER, U+2060): un carácter sin ancho
            que prohíbe el salto de línea a ambos lados. Va como nodo de
            texto propio, pegado sin espacio al `span` y al botón. Solo
            sella el punto entre el valor y el botón — no basta cuando el
            botón es un inline atómico y necesita, además, arrastrar
            consigo un tramo `nowrap` (ver `splitTail` y la heurística del
            nodo corto arriba): por eso este camino es el que queda para
            cuando ninguna de las dos formas de "arrastrar un tramo" aplica
            (nodo no textual, largo o con espacios).
          */}
          {'⁠'}
          {copyButton}
        </>
      );
    }

    return (
      <span ref={ref} className={classes}>
        {content}
        {/* El icono cambia para quien ve; para quien escucha, este anuncio. */}
        <VisuallyHidden role="status">{copied ? copiedLabel : ''}</VisuallyHidden>
      </span>
    );
  },
);
