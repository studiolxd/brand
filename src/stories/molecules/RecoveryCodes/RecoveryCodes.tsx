'use client';

import type { ReactNode } from 'react';
import './RecoveryCodes.css';
import { CopyButton } from '../CopyButton/CopyButton';
import { Inline } from '../../atoms/Inline/Inline';

export interface RecoveryCodesLabels {
  /** Nombre accesible de la lista numerada. */
  list: string;
  /** Rótulo visible del botón que copia todos los códigos. */
  copy: string;
  /** Acuse del botón de copiar, mientras dura. */
  copied: string;
}

export interface RecoveryCodesProps {
  /** Los códigos, en el orden en que se numeran. */
  codes: string[];
  /** Columnas de la rejilla en pantallas anchas. En móvil siempre es 1. */
  columns?: 1 | 2 | 3;
  /**
   * Textos del componente. Sin default: los códigos de recuperación son
   * credenciales de seguridad y el texto que las rodea no debe quedar a
   * medias traducir — quien lo use pasa los tres.
   */
  labels: RecoveryCodesLabels;
  /**
   * Acciones propias del producto (descargar, imprimir…), a continuación del
   * botón de copiar. `brand` no implementa descarga ni impresión: ese gesto
   * depende de cómo genera y sirve el archivo cada producto.
   */
  actions?: ReactNode;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
  id?: string;
}

/**
 * Códigos de recuperación de un solo uso (2FA): una lista numerada,
 * monoespaciada, que se enseña una vez. No es un `CodeBlock` — no hay
 * lenguaje que resaltar ni código que ejecutar, son credenciales — y no
 * ofrece "ver otra vez": quien la monta decide si el usuario ya los guardó.
 *
 * La numeración es real (`<ol>`), no decorativa: un lector de pantalla
 * anuncia "código 3 de 10" en vez de una lista plana. La rejilla es CSS
 * `columns`, así que el orden de lectura sigue siendo el del documento
 * (arriba a abajo dentro de una columna, luego la siguiente) — no un grid que
 * numeraría en zigzag.
 *
 * Solo trae el botón de copiar todos; descargar o imprimir el archivo es
 * decisión de producto (nombre de archivo, formato, disparo de
 * `window.print()`…) y entra por el slot `actions`.
 */
export function RecoveryCodes({
  codes,
  columns = 2,
  labels,
  actions,
  className,
  id,
}: RecoveryCodesProps) {
  const classes = ['recovery-codes', className].filter(Boolean).join(' ');

  return (
    <div className={classes} id={id}>
      <ol
        className="recovery-codes__list"
        aria-label={labels.list}
        data-columns={columns}
      >
        {codes.map((code, i) => (
          <li key={i} className="recovery-codes__item">
            <code className="recovery-codes__code">{code}</code>
          </li>
        ))}
      </ol>
      {/* Fila de acciones: se oculta al imprimir (regla `@media print` en el
          CSS) para que solo quede la rejilla numerada en la página impresa. */}
      <Inline gap="sm" className="recovery-codes__actions">
        <CopyButton
          value={() => codes.join('\n')}
          copiedLabel={labels.copied}
          variant="outline"
        >
          {labels.copy}
        </CopyButton>
        {actions}
      </Inline>
    </div>
  );
}
