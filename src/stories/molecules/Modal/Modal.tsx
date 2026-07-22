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
}

export function Modal({
  open,
  onClose,
  title,
  children,
  closeLabel = 'Cerrar',
  fallbackTitle = 'Diálogo',
  container,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className="modal__content" aria-describedby={undefined} onOpenAutoFocus={(e) => e.preventDefault()}>
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
          <div className="modal__body">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
