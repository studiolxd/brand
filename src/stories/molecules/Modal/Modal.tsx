import * as Dialog from '@radix-ui/react-dialog';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './Modal.css';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  closeLabel?: string;
  fallbackTitle?: string;
  /**
   * Nodo DOM donde montar el portal del modal (reenviado a Radix
   * `Portal.container`). Por defecto se monta en `document.body`, que
   * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
   * sin configuración adicional. Solo hace falta pasarlo cuando el Modal
   * vive dentro de un `.surface-dark` **anidado** (no en la raíz), ya que
   * ese contexto no llega a `document.body` por la cascada.
   */
  container?: React.ComponentPropsWithoutRef<typeof Dialog.Portal>['container'];
  /**
   * Descripción accesible del modal, renderizada bajo el título como
   * `Dialog.Description` — Radix se encarga de enlazarla al diálogo. Úsala
   * cuando el texto descriptivo lo aporte el propio Modal.
   */
  description?: React.ReactNode;
  /**
   * Id del elemento que describe el modal, reenviado a `Dialog.Content`. Para
   * adaptadores que renderizan su propio nodo de descripción dentro de
   * `children`. Tiene prioridad sobre `description` si se pasan ambas.
   * Omitida (y sin `description`) se mantiene el comportamiento actual:
   * `aria-describedby={undefined}`, que silencia el aviso de Radix en modales
   * sin descripción.
   */
  'aria-describedby'?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  closeLabel = 'Cerrar',
  fallbackTitle = 'Diálogo',
  container,
  description,
  'aria-describedby': ariaDescribedBy,
}: ModalProps) {
  // Tres casos, y el segundo NO puede pasar la prop: Radix hace
  // `{...contentProps}` después de su propio `aria-describedby`, así que un
  // `undefined` explícito borraría el enlace automático a Dialog.Description.
  const describedByProps =
    ariaDescribedBy !== undefined
      ? { 'aria-describedby': ariaDescribedBy }
      : description != null
        ? {}
        : { 'aria-describedby': undefined };

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className="modal__content" {...describedByProps} onOpenAutoFocus={(e) => e.preventDefault()}>
          {title ? (
            <header className="modal__header">
              <Dialog.Title className="modal__title">{title}</Dialog.Title>
              <Dialog.Close className="modal__close" aria-label={closeLabel}><Icon name="close" size="sm" /></Dialog.Close>
            </header>
          ) : (
            <>
              <Dialog.Title asChild>
                <VisuallyHidden>{fallbackTitle}</VisuallyHidden>
              </Dialog.Title>
              <header className="modal__header modal__header--no-title">
                <Dialog.Close className="modal__close" aria-label={closeLabel}><Icon name="close" size="sm" /></Dialog.Close>
              </header>
            </>
          )}
          {description != null && (
            <Dialog.Description className="modal__description">{description}</Dialog.Description>
          )}
          <div className="modal__body">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
