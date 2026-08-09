import * as Dialog from '@radix-ui/react-dialog';
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
export declare function Modal({ open, onClose, title, children, closeLabel, fallbackTitle, container, description, 'aria-describedby': ariaDescribedBy, }: ModalProps): import("react/jsx-runtime").JSX.Element;
