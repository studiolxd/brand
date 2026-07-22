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
}
export declare function Modal({ open, onClose, title, children, closeLabel, fallbackTitle, container, }: ModalProps): import("react/jsx-runtime").JSX.Element;
