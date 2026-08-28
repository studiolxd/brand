import { Dialog } from '@base-ui-components/react/dialog';
import './Modal.css';
export interface ModalProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title' | 'className'> {
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
export declare function Modal({ open, onClose, title, children, closeLabel, fallbackTitle, container, description, 'aria-describedby': ariaDescribedBy, ...rest }: ModalProps): import("react/jsx-runtime").JSX.Element;
