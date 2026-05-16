import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './Modal.css';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  dark?: boolean;
}

export function Modal({ open, onClose, title, children, dark = false }: ModalProps) {
  const contentClass = ['modal__content', dark && 'modal__content--dark'].filter(Boolean).join(' ');

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className={contentClass} aria-describedby={undefined}>
          {title ? (
            <header className="modal__header">
              <Dialog.Title className="modal__title">{title}</Dialog.Title>
              <Dialog.Close className="modal__close" aria-label="Cerrar">✕</Dialog.Close>
            </header>
          ) : (
            <>
              <Dialog.Title asChild>
                <VisuallyHidden>Diálogo</VisuallyHidden>
              </Dialog.Title>
              <header className="modal__header modal__header--no-title">
                <Dialog.Close className="modal__close" aria-label="Cerrar">✕</Dialog.Close>
              </header>
            </>
          )}
          <div className="modal__body">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
