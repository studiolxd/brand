import { Dialog } from '@base-ui-components/react/dialog';
import { Button } from '../../atoms/Button/Button';
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
   * Nodo DOM donde montar el portal del modal (reenviado a Base UI
   * `Portal.container`). Por defecto se monta en `document.body`, que
   * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
   * sin configuración adicional. Solo hace falta pasarlo cuando el Modal
   * vive dentro de un `.surface-dark` **anidado** (no en la raíz), ya que
   * ese contexto no llega a `document.body` por la cascada.
   */
  container?: React.ComponentPropsWithoutRef<typeof Dialog.Portal>['container'];
  /**
   * Descripción accesible del modal, renderizada bajo el título como
   * `Dialog.Description` — Base UI se encarga de enlazarla al diálogo. Úsala
   * cuando el texto descriptivo lo aporte el propio Modal.
   */
  description?: React.ReactNode;
  /**
   * Id del elemento que describe el modal, reenviado a `Dialog.Popup`. Para
   * adaptadores que renderizan su propio nodo de descripción dentro de
   * `children`. Tiene prioridad sobre `description` si se pasan ambas.
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
  // Base UI solo enlaza `aria-describedby` cuando hay un `Dialog.Description`
  // montado, así que basta con pasar la prop cuando el consumidor la trae.
  const describedByProps =
    ariaDescribedBy !== undefined ? { 'aria-describedby': ariaDescribedBy } : {};

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <Dialog.Portal container={container}>
        <Dialog.Backdrop className="modal__overlay" />
        <Dialog.Popup className="modal__content" {...describedByProps} initialFocus={false}>
          {title ? (
            <header className="modal__header">
              <Dialog.Title className="modal__title">{title}</Dialog.Title>
              <Dialog.Close
                className="modal__close"
                aria-label={closeLabel}
                render={<Button variant="ghost" size="sm" iconOnly />}
              >
                <Icon name="close" size="sm" />
              </Dialog.Close>
            </header>
          ) : (
            <>
              <Dialog.Title render={<VisuallyHidden>{fallbackTitle}</VisuallyHidden>} />
              <header className="modal__header modal__header--no-title">
                <Dialog.Close
                  className="modal__close"
                  aria-label={closeLabel}
                  render={<Button variant="ghost" size="sm" iconOnly />}
                >
                  <Icon name="close" size="sm" />
                </Dialog.Close>
              </header>
            </>
          )}
          {description != null && (
            <Dialog.Description className="modal__description">{description}</Dialog.Description>
          )}
          <div className="modal__body">{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
