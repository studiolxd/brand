import { Dialog } from '@base-ui/react/dialog';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './Modal.css';

export interface ModalProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title' | 'className'> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /**
   * Nombre accesible del aspa de cierre. Default: «Cerrar» (castellano).
   * Una app multiidioma debe pasarlo traducido.
   */
  closeLabel?: string;
  /**
   * Nombre accesible del diálogo cuando no hay `title`. Default: «Diálogo»
   * (castellano). Una app multiidioma debe pasarlo traducido.
   */
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
  /**
   * Elemento que recibe el foco al abrir, reenviado a Base UI. Por defecto el
   * foco entra en el panel por su primer elemento focable (el aspa de cerrar).
   * Pásalo cuando el diálogo tenga un destino mejor —la salida segura de una
   * confirmación, el buscador de una paleta— en vez de mover el foco a mano
   * desde fuera: el gestor de foco de Base UI corre después y ganaría él.
   */
  initialFocus?: React.ComponentPropsWithoutRef<typeof Dialog.Popup>['initialFocus'];
}

/**
 * Diálogo centrado sobre un velo. El motor (portal, velo, trampa de foco,
 * cierre con Escape) es Base UI Dialog; el DS pone la superficie.
 *
 * `{...rest}` (`id`, `data-*`, `aria-*` y los **handlers de evento**) se
 * reenvía al popup. Los handlers son lo que permite montar la barrera de
 * eventos cuando el modal se abre desde dentro de una tarjeta clicable —
 * `onClick`/`onPointerDown` con `stopPropagation` en el propio popup— sin
 * envolverlo en `div`s de producto.
 *
 * `className` **no** se reenvía a propósito: la cara del diálogo la pone el
 * sistema, y se personaliza por tokens.
 */

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
  initialFocus,
  ...rest
}: ModalProps) {
  // Base UI solo enlaza `aria-describedby` cuando hay un `Dialog.Description`
  // montado, así que basta con pasar la prop cuando el consumidor la trae.
  const describedByProps =
    ariaDescribedBy !== undefined ? { 'aria-describedby': ariaDescribedBy } : {};

  // `undefined` no es lo mismo que ningún valor para Base UI: solo si la prop
  // llega sin definir aplica su comportamiento por defecto (que además tiene en
  // cuenta la apertura táctil), así que no se pasa cuando no la hay.
  const initialFocusProps = initialFocus !== undefined ? { initialFocus } : {};

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <Dialog.Portal container={container}>
        <Dialog.Backdrop className="modal__overlay" />
        <Dialog.Popup className="modal__content" {...describedByProps} {...initialFocusProps} {...rest}>
          {title ? (
            <header className="modal__header">
              <Dialog.Title className="modal__title">{title}</Dialog.Title>
              <Dialog.Close className="modal__close" aria-label={closeLabel}>
                <Icon name="close" size="md" />
              </Dialog.Close>
            </header>
          ) : (
            <>
              <Dialog.Title render={<VisuallyHidden>{fallbackTitle}</VisuallyHidden>} />
              <header className="modal__header modal__header--no-title">
                <Dialog.Close className="modal__close" aria-label={closeLabel}>
                  <Icon name="close" size="md" />
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
