'use client';

import { forwardRef, useEffect, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './CopyButton.css';

export interface CopyButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'value' | 'children' | 'onClick' | 'onCopy'> {
  /**
   * Lo que se copia. Como función, se evalúa en el momento del clic: para
   * copiar algo que puede haber cambiado desde el render (el contenido de un
   * campo, el texto de un bloque de código).
   */
  value: string | (() => string);
  /**
   * Rótulo visible junto al icono. Sin él, el botón es solo icono y `label`
   * se queda como nombre accesible.
   */
  children?: ReactNode;
  /**
   * Nombre accesible del botón. Default castellano.
   * @default 'Copiar'
   */
  label?: string;
  /**
   * Acuse tras copiar: se anuncia en una región viva y, si hay rótulo visible,
   * lo sustituye mientras dura. Default castellano.
   * @default 'Copiado'
   */
  copiedLabel?: string;
  /**
   * Aviso cuando el portapapeles no está disponible (contexto no seguro,
   * permiso denegado). Default castellano.
   * @default 'No se pudo copiar'
   */
  errorLabel?: string;
  /** Variante del botón. */
  variant?: 'ghost' | 'outline' | 'text';
  /** Talla del botón. */
  size?: 'sm' | 'md' | 'lg';
  /** Cuánto dura el acuse, en milisegundos. */
  feedbackDuration?: number;
  /** Se llama con el texto copiado cuando la copia sale bien. */
  onCopy?: (text: string) => void;
  /** Se llama cuando el portapapeles falla. */
  onCopyError?: (error: unknown) => void;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

type Status = 'idle' | 'copied' | 'error';

const FEEDBACK_MS = 1500;

/**
 * Copiar al portapapeles con acuse: una clave de API, un identificador, un
 * fragmento de código. Es el `Button` del sistema con el icono de copiar y la
 * conducta del acuse; no aporta cara propia.
 *
 * El acuse es doble: el icono pasa a un tic para quien ve, y una región viva
 * (`role="status"`) lo anuncia para quien escucha. Un cambio de icono solo no
 * es feedback accesible.
 *
 * Si el portapapeles no está disponible —contexto no seguro, permiso
 * denegado— el botón lo dice en vez de fingir que ha copiado.
 */
export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(function CopyButton({
  value,
  children,
  label = 'Copiar',
  copiedLabel = 'Copiado',
  errorLabel = 'No se pudo copiar',
  variant = 'ghost',
  size,
  feedbackDuration = FEEDBACK_MS,
  onCopy,
  onCopyError,
  className,
  ...rest
}: CopyButtonProps, ref) {
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const timeout = setTimeout(() => setStatus('idle'), feedbackDuration);
    return () => clearTimeout(timeout);
  }, [status, feedbackDuration]);

  const handleClick = async () => {
    const text = typeof value === 'function' ? value() : value;
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
      onCopy?.(text);
    } catch (error) {
      setStatus('error');
      onCopyError?.(error);
    }
  };

  const announcement = status === 'copied' ? copiedLabel : status === 'error' ? errorLabel : '';
  const visible = children != null
    ? (status === 'copied' ? copiedLabel : status === 'error' ? errorLabel : children)
    : null;

  return (
    <>
      {/* Dos formas del mismo botón: sin texto es cuadrado y se nombra con
          `aria-label`; con texto, el texto ya lo nombra. La distinción está en
          el tipo de `Button`, así que no puede ser un booleano calculado. */}
      {children == null ? (
        <Button
          {...rest}
          ref={ref}
          variant={variant}
          {...(size ? { size } : {})}
          iconOnly
          aria-label={label}
          onClick={handleClick}
          className={['copy-button', className].filter(Boolean).join(' ')}
        >
          <Icon name={status === 'copied' ? 'check' : 'copy'} size="sm" />
        </Button>
      ) : (
        <Button
          {...rest}
          ref={ref}
          variant={variant}
          {...(size ? { size } : {})}
          onClick={handleClick}
          className={['copy-button', className].filter(Boolean).join(' ')}
        >
          <Icon name={status === 'copied' ? 'check' : 'copy'} size="sm" />
          {visible}
        </Button>
      )}
      {/* El icono cambia para quien ve; para quien escucha, este anuncio. La
          región se monta siempre: si apareciera con el texto, algunos lectores
          de pantalla no la leerían. */}
      <VisuallyHidden role="status">{announcement}</VisuallyHidden>
    </>
  );
});
