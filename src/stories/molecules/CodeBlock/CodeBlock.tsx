import { useEffect, useRef, useState } from 'react';
import './CodeBlock.css';
import { Tag } from '../../atoms/Tag/Tag';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';

export interface CodeBlockProps {
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
  /** aria-label del botón tras copiar. Default: "Copiado" (castellano). */
  copiedLabel?: string;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
}

const COPIED_FEEDBACK_MS = 1500;

export function CodeBlock({
  children,
  language,
  copyable = false,
  copyLabel = 'Copiar código',
  copiedLabel = 'Copiado',
  className,
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
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const hasHeader = Boolean(language) || copyable;
  const classes = ['code-block', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {hasHeader && (
        <div className="code-block__header">
          {language && <Tag variant="neutral" className="code-block__language">{language}</Tag>}
          {copyable && (
            <Button
              iconOnly
              variant="ghost"
              size="sm"
              aria-label={copied ? copiedLabel : copyLabel}
              onClick={handleCopy}
              className="code-block__copy"
            >
              <Icon name={copied ? 'check' : 'copy'} size="sm" />
            </Button>
          )}
        </div>
      )}
      <pre className="code-block__pre">
        <code ref={codeRef} className="code-block__code">{children}</code>
      </pre>
    </div>
  );
}
