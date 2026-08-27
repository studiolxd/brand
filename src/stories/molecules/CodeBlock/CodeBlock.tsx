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

  const hasHeader = Boolean(language) || copyable;
  const classes = ['code-block', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {hasHeader && (
        <div className="code-block__header">
          {language && <Tag variant="neutral" className="code-block__language">{language}</Tag>}
          {copyable && (
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
          )}
        </div>
      )}
      <pre
        className="code-block__pre"
        tabIndex={0}
        role="region"
        aria-label={codeLabel(language)}
      >
        <code ref={codeRef} className="code-block__code">{children}</code>
      </pre>
    </div>
  );
}
