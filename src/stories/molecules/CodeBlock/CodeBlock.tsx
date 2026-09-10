'use client';

import { useEffect, useRef, useState } from 'react';
import './CodeBlock.css';
import { Tag } from '../../atoms/Tag/Tag';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';

export interface CodeBlockProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Código a mostrar. Texto plano o nodos ya resaltados por un highlighter externo. */
  children: React.ReactNode;
  /** Etiqueta de lenguaje opcional (ej. "tsx", "bash"), mostrada como Tag en la cabecera. */
  language?: string;
  /** Muestra un botón de copiar al portapapeles en la cabecera. Default: `false`. */
  copyable?: boolean;
  /**
   * Fuerza la variante de una línea (código a la izquierda con su propio
   * scroll horizontal, lenguaje y botón de copiar a la derecha, centrados en
   * vertical, sin cabecera aparte) o la multilínea (cabecera arriba, código
   * debajo). Sin la prop se detecta solo: `children` como cadena sin saltos
   * de línea es una línea; con saltos de línea, o con nodos ya resaltados por
   * un highlighter externo (no se pueden inspeccionar como cadena), es
   * multilínea.
   */
  singleLine?: boolean;
  /**
   * aria-label del botón de copiar. Default: "Copiar código" (castellano).
   * Una app multiidioma debe pasarla traducida.
   */
  copyLabel?: string;
  /**
   * Texto que se anuncia al lector de pantalla tras copiar. Default: "Copiado"
   * (castellano).
   */
  copiedLabel?: string;
  /**
   * Nombre accesible del área de código, que es focalizable por tener scroll
   * horizontal propio. Recibe el `language` cuando lo hay. Default en castellano.
   */
  codeLabel?: (language?: string) => string;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
}

const COPIED_FEEDBACK_MS = 1500;

const defaultCodeLabel = (language?: string) =>
  language ? `Bloque de código ${language}` : 'Bloque de código';

/**
 * Bloque de código sobre superficie gris clara, con etiqueta de lenguaje y
 * botón de copiar opcionales. Extiende los atributos nativos de `<div>` y
 * reenvía `{...rest}` al raíz.
 */
export function CodeBlock({
  children,
  language,
  copyable = false,
  singleLine,
  copyLabel = 'Copiar código',
  copiedLabel = 'Copiado',
  codeLabel = defaultCodeLabel,
  className,
  ...rest
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    const text = codeRef.current?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Portapapeles no disponible (contexto no seguro, permiso denegado): sin
      // feedback de copiado. El código sigue seleccionable a mano.
      setCopied(false);
    }
  };

  const detectedSingleLine = typeof children === 'string' && !children.includes('\n');
  const isSingleLine = singleLine ?? detectedSingleLine;
  const hasControls = Boolean(language) || copyable;
  const classes = [
    'code-block',
    isSingleLine ? 'code-block--single-line' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const languageTag = language && (
    <Tag variant="neutral" className="code-block__language">{language}</Tag>
  );

  const copyButton = copyable && (
    <>
      <Button
        iconOnly
        variant="ghost"
        size="sm"
        aria-label={copyLabel}
        onClick={handleCopy}
        className="code-block__copy"
      >
        <Icon name={copied ? 'check' : 'copy'} size="sm" />
      </Button>
      {/* El icono cambia para quien ve; para quien escucha, este anuncio. */}
      <VisuallyHidden role="status">{copied ? copiedLabel : ''}</VisuallyHidden>
    </>
  );

  const code = (
    <pre
      className="code-block__pre"
      tabIndex={0}
      role="region"
      aria-label={codeLabel(language)}
    >
      <code ref={codeRef} className="code-block__code">{children}</code>
    </pre>
  );

  if (isSingleLine) {
    return (
      <div className={classes} {...rest}>
        <div className="code-block__row">
          {code}
          {hasControls && (
            <div className="code-block__controls">
              {languageTag}
              {copyButton}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={classes} {...rest}>
      {hasControls && (
        <div className="code-block__header">
          {languageTag}
          {copyButton}
        </div>
      )}
      {code}
    </div>
  );
}

/**
 * Los tipos de token que el sistema sabe pintar. Es un vocabulario cerrado a
 * propósito: un resaltador emite decenas de ámbitos y aquí se mapean a estos
 * quince, que son los que tienen tinta propia. Ver la doc de `CodeBlock`
 * § «Resaltado de sintaxis» para la tabla de equivalencias con shiki.
 */
export type CodeTokenType =
  | 'keyword'
  | 'string'
  | 'number'
  | 'comment'
  | 'function'
  | 'variable'
  | 'property'
  | 'punctuation'
  | 'operator'
  | 'tag'
  | 'attribute'
  | 'constant'
  | 'regexp'
  | 'inserted'
  | 'deleted';

export interface CodeTokenProps extends React.ComponentPropsWithoutRef<'span'> {
  /** Qué es este trozo de código. Decide la tinta, que sale de un token. */
  type: CodeTokenType;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
}

/**
 * Un trozo de código con su tinta, para meter dentro de `CodeBlock`.
 *
 * `CodeBlock` **no resalta sintaxis**: el resaltador (shiki, prism, el que sea)
 * es del producto. Lo que pone el sistema es el vocabulario: el consumidor
 * recorre los tokens que le devuelve su resaltador, traduce el ámbito a un
 * `CodeTokenType` y envuelve el texto con este componente. Así el color sale de
 * un token del sistema —con su par en superficie oscura— y no de un
 * `style={{ color }}` inline, que se salta la cascada y el tema.
 *
 * ```tsx
 * <CodeBlock language="ts">
 *   {tokens.map((t, i) => <CodeToken key={i} type={tipo(t.scope)}>{t.content}</CodeToken>)}
 * </CodeBlock>
 * ```
 */
export function CodeToken({ type, className, children, ...rest }: CodeTokenProps) {
  const classes = [
    'code-block__token',
    `code-block__token--${type}`,
    className ?? '',
  ].filter(Boolean).join(' ');

  return <span className={classes} {...rest}>{children}</span>;
}
