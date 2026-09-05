'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Modal, type ModalProps } from '../Modal/Modal';
import './ConfirmDialog.css';

export interface ConfirmDialogProps {
  open: boolean;
  /** Título del diálogo: la pregunta, no «Confirmar». */
  title: string;
  /** El cuerpo de la pregunta: qué va a pasar y qué no se puede deshacer. */
  description?: ReactNode;
  /** Contenido extra bajo la descripción (un aviso, la lista de lo que se borra). */
  children?: ReactNode;
  /**
   * Se llama al confirmar. Si devuelve una promesa, el diálogo se queda
   * abierto y ocupado hasta que resuelve; si rechaza, sigue abierto para que
   * el consumidor cuente qué ha fallado.
   */
  onConfirm: () => void | Promise<void>;
  /** Se llama al cancelar, al cerrar con el aspa y al pulsar `Esc`. */
  onCancel: () => void;
  /**
   * Se llama cuando la promesa de `onConfirm` rechaza. El diálogo se queda
   * abierto y no cuenta nada por su cuenta: el error lo explica el consumidor,
   * que es quien sabe qué ha pasado (un `Toast`, un `Alert` en `children`).
   */
  onConfirmError?: (error: unknown) => void;
  /**
   * La acción destructiva no se puede deshacer: el botón de confirmar cambia
   * al lenguaje destructivo del sistema.
   */
  destructive?: boolean;
  /**
   * Rótulo del botón que confirma. Default castellano.
   * @default 'Confirmar'
   */
  confirmLabel?: string;
  /**
   * Rótulo del botón que cancela. Default castellano.
   * @default 'Cancelar'
   */
  cancelLabel?: string;
  /**
   * Rótulo del botón de confirmar mientras la acción está en curso. Default castellano.
   * @default 'Confirmando…'
   */
  pendingLabel?: string;
  /**
   * Etiqueta del aspa de cierre. Default castellano.
   * @default 'Cerrar'
   */
  closeLabel?: string;
  /** Nodo donde montar el portal, como en `Modal`. */
  container?: ModalProps['container'];
  /** Se añade DESPUÉS de las clases propias del pie del diálogo. */
  className?: string;
}

/**
 * La pregunta antes de una acción que no se puede deshacer: borrar una
 * organización, revocar una clave, expulsar a alguien de un equipo.
 *
 * Es el `Modal` del sistema con dos botones y una decisión de diseño: **el
 * foco arranca en «Cancelar»**. Un diálogo destructivo que abre con el foco en
 * el botón que destruye convierte un `Enter` de más en una pérdida de datos.
 *
 * `onConfirm` puede devolver una promesa. Mientras está en curso el diálogo se
 * queda abierto y ocupado —no se cierra en falso ni deja pulsar dos veces— y
 * se cierra solo al resolver. Si rechaza, sigue abierto: el error lo cuenta el
 * consumidor, que es quien sabe qué ha pasado.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  children,
  onConfirm,
  onCancel,
  onConfirmError,
  destructive = false,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  pendingLabel = 'Confirmando…',
  closeLabel = 'Cerrar',
  container,
  className,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLElement>(null);
  const [pending, setPending] = useState(false);

  // Una acción que falla deja el diálogo abierto; al cerrarlo, el botón vuelve
  // a estar disponible para el siguiente intento.
  useEffect(() => {
    if (!open) setPending(false);
  }, [open]);

  const handleCancel = () => {
    if (pending) return;
    onCancel();
  };

  const handleConfirm = async () => {
    if (pending) return;
    const result = onConfirm();
    if (!(result instanceof Promise)) return;
    setPending(true);
    try {
      await result;
    } catch (error) {
      // La promesa ya la consume el diálogo, así que aquí muere: dejarla
      // rechazar sería un unhandled rejection en la aplicación del consumidor.
      onConfirmError?.(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      title={title}
      closeLabel={closeLabel}
      container={container}
      // El foco entra en la salida segura, no en la acción que destruye. Se lo
      // pide al gestor de foco de Base UI (por `Modal`) en vez de moverlo a
      // mano tras el montaje: él corre el último y ganaría él.
      initialFocus={cancelRef}
      {...(description != null ? { description } : {})}
      // El pie lo reparte `Modal`: fila a la derecha, y apilado a todo el
      // ancho con la acción principal arriba por debajo del punto de ruptura.
      footerClassName={['confirm-dialog__actions', className].filter(Boolean).join(' ')}
      footer={
        <>
          <Button ref={cancelRef} variant="outline" onClick={handleCancel} disabled={pending}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? 'outline' : 'primary'}
            destructive={destructive}
            onClick={handleConfirm}
            disabled={pending}
          >
            {pending ? pendingLabel : confirmLabel}
          </Button>
        </>
      }
    >
      {children}
    </Modal>
  );
}
