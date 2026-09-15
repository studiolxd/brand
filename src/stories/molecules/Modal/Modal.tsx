'use client';

import { Dialog } from '@base-ui/react/dialog';
import { CloseButton } from '../../atoms/CloseButton/CloseButton';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { DialogFooter, DialogHeader, DialogOverlay } from '../_shared/dialogSurface';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './Modal.css';
import { usePortalContainer } from '../../constants/portal-container';

/**
 * El cromo del diálogo, y solo el cromo: las dos cosas que el `Modal` dice por
 * su cuenta, sin que se las pase nadie.
 *
 * Aquí no hay nada que decidir por pantalla. El aspa cierra el diálogo —este y
 * todos—, y el nombre de respaldo es lo que se anuncia cuando el diálogo no
 * trae título: ninguno de los dos cambia de una pantalla a otra, así que los
 * dos son catálogo. El `title`, la `description` y lo que digan los botones del
 * pie son contenido y siguen viniendo de quien abre el diálogo.
 */
export interface ModalMessages {
  /** Nombre accesible del aspa que cierra el diálogo. */
  close: string;
  /** Nombre accesible del diálogo cuando no hay `title`. */
  fallbackTitle: string;
}

export interface ModalProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title' | 'className'> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /**
   * Nombre accesible del aspa de cierre. **Sin default**: sin él, sale de
   * `modal.close` del `BrandMessagesProvider`.
   */
  closeLabel?: string;
  /**
   * Nombre accesible del diálogo cuando no hay `title`. **Sin default**: sin
   * él, sale de `modal.fallbackTitle` del `BrandMessagesProvider`. Solo se
   * lee cuando de verdad no hay título: un diálogo con `title` no lo exige.
   */
  fallbackTitle?: string;
  /**
   * Nodo DOM donde montar el portal del modal (reenviado a Base UI `Portal.container`).
   * Por defecto, el nodo de la superficie que llegue por contexto:
   * `SiteShell` publica el suyo, de modo que la capa hereda la talla de la
   * superficie pública en vez de abrirse a la de aplicación. Si no hay
   * superficie, `document.body` — que ya hereda el tema activado en la raíz
   * (`html.dark`/`[data-theme="dark"]`) sin configuración adicional. Pásalo
   * solo para llevar la capa a otro sitio: un `.surface-dark` **anidado**, el
   * cajón de un shell propio. Gana siempre.
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
  /**
   * Fila de acciones al pie del diálogo. Es el sitio de los botones: el pie
   * los reparte a la derecha en una fila y, por debajo del punto de ruptura,
   * los apila a todo el ancho con la acción principal arriba — el mismo
   * criterio (y el mismo orden) que las acciones de `Form`. Pásalos en el
   * orden de la fila: la principal, la última.
   */
  footer?: React.ReactNode;
  /** Se añade DESPUÉS de las clases propias del pie. */
  footerClassName?: string;
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
  closeLabel,
  fallbackTitle,
  container,
  description,
  'aria-describedby': ariaDescribedBy,
  initialFocus,
  footer,
  footerClassName,
  ...rest
}: ModalProps) {
  const t = useBrandMessages('modal');
  const portalContainer = usePortalContainer(container);
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
      <Dialog.Portal container={portalContainer}>
        <DialogOverlay className="modal__overlay" />
        <Dialog.Popup className="modal__content" {...describedByProps} {...initialFocusProps} {...rest}>
          {title ? (
            <DialogHeader layout="inline" className="modal__header">
              <Dialog.Title className="modal__title">{title}</Dialog.Title>
              <Dialog.Close className="modal__close" render={<CloseButton label={t('close', closeLabel)} />} />
            </DialogHeader>
          ) : (
            <>
              <Dialog.Title render={<VisuallyHidden>{t('fallbackTitle', fallbackTitle)}</VisuallyHidden>} />
              <DialogHeader layout="inline" noTitle className="modal__header modal__header--no-title">
                <Dialog.Close className="modal__close" render={<CloseButton label={t('close', closeLabel)} />} />
              </DialogHeader>
            </>
          )}
          {description != null && (
            <Dialog.Description className="modal__description">{description}</Dialog.Description>
          )}
          <div className="modal__body">{children}</div>
          {footer != null && (
            <DialogFooter className={['modal__footer', footerClassName].filter(Boolean).join(' ')}>
              {footer}
            </DialogFooter>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
