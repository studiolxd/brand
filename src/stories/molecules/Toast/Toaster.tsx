'use client';

import { useEffect } from 'react';
import { Toast } from '@base-ui/react/toast';
import { Button } from '../../atoms/Button/Button';
import { CloseButton } from '../../atoms/CloseButton/CloseButton';
import {
  TOAST_DURATION,
  setToastDefaultDuration,
  syncLiveToasts,
  toastManager,
  type ToastIntent,
} from './toast';
import './Toast.css';

/**
 * Aire entre avisos desplegados, en píxeles — `toast.gap` (8px). El apilado lo
 * calcula el CSS a partir de las alturas que mide el motor, así que el número
 * viaja como custom property.
 */
const GAP = 8;

export type ToastPosition =
  | 'bottom-right' | 'bottom-left' | 'bottom-center'
  | 'top-right' | 'top-left' | 'top-center';

export interface ToasterProps {
  /** Esquina de la ventana donde se monta la pila. Default: `bottom-right`. */
  position?: ToastPosition;
  /**
   * Nombre accesible de la región de notificaciones. Default: «Notificaciones»
   * (castellano). Una app multiidioma debe pasarlo traducido.
   */
  containerAriaLabel?: string;
  /**
   * Etiqueta accesible del aspa de cierre. Default: «Cerrar» (castellano).
   * Una app multiidioma debe pasarla traducida.
   */
  closeLabel?: string;
  /** Muestra el aspa de cierre en cada aviso. Default: `true`. */
  closeButton?: boolean;
  /**
   * Milisegundos que vive un aviso antes de cerrarse solo. Default: 5000.
   * El reloj se detiene mientras el puntero o el foco están dentro de la pila.
   * `Infinity` (o `duration: Infinity` en la llamada) lo deja fijo.
   */
  duration?: number;
  /** Aire entre avisos desplegados, en píxeles. Default: 8 (`toast.gap`). */
  gap?: number;
  /** Número de avisos visibles a la vez; el resto espera turno. Default: 3. */
  visibleToasts?: number;
  /** Despliega la pila en vez de dejarla recogida bajo el aviso más nuevo. */
  expand?: boolean;
}

/** Clase de intención del `Alert` que le toca a cada tipo de aviso. */
const VARIANT_CLASS: Record<string, string> = {
  success: 'alert--success',
  error: 'alert--error',
  warning: 'alert--warning',
};

/**
 * El relleno del aviso es oscuro salvo en `warning` (amarillo): la raíz se
 * declara superficie oscura para que lo que se componga dentro —el aspa, el
 * botón de acción— tome su cara clara. Es el mismo criterio del `Alert`.
 */
function toastClasses(type: string | undefined, dismissible: boolean) {
  return [
    'alert',
    VARIANT_CLASS[type ?? ''] ?? '',
    type !== 'warning' ? 'surface-dark' : '',
    dismissible ? 'alert--dismissible' : '',
    'toast',
  ].filter(Boolean).join(' ');
}

interface ToastListProps extends Required<Pick<ToasterProps, 'position' | 'containerAriaLabel' | 'closeLabel' | 'closeButton' | 'gap'>> {
  expand?: boolean;
}

function ToastList({ position, containerAriaLabel, closeLabel, closeButton, gap, expand }: ToastListProps) {
  const { toasts } = Toast.useToastManager();
  const [side, align] = position.split('-') as ['top' | 'bottom', 'right' | 'left' | 'center'];

  const ids = toasts.map((item) => item.id).join(',');
  useEffect(() => {
    syncLiveToasts(ids ? ids.split(',') : []);
  }, [ids]);

  const classes = [
    'toaster',
    side === 'top' ? 'toaster--top' : '',
    align !== 'right' ? `toaster--${align}` : '',
    expand ? 'toaster--expanded' : '',
  ].filter(Boolean).join(' ');

  return (
    <Toast.Portal>
      <Toast.Viewport
        className={classes}
        aria-label={containerAriaLabel}
        style={{ '--toast-gap': `${gap}px` } as React.CSSProperties}
      >
        {toasts.map((item) => (
          <Toast.Root
            key={item.id}
            toast={item}
            className={toastClasses(item.type, closeButton)}
          >
            <div className="alert__content">
              <Toast.Title className="alert__title" />
              <Toast.Description className="alert__description" />
              <Toast.Action className="toast__action" render={<Button variant="ghost" size="sm" />} />
            </div>
            {closeButton && (
              <Toast.Close
                className="alert__close"
                render={<CloseButton label={closeLabel} />}
              />
            )}
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

/**
 * Punto de montaje de los avisos efímeros. Se monta **una vez** en la raíz de la
 * aplicación; los avisos se lanzan desde cualquier sitio con `toast(...)`.
 *
 * La cara del aviso es la del `Alert` —mismo relleno, mismo borde, misma
 * tipografía y las mismas cuatro intenciones, sobre el juego de tokens
 * `alert.*`—; lo propio del toast es la capa, la posición, el apilado y el
 * auto-cierre (`toast.*`).
 */
export function Toaster({
  position = 'bottom-right',
  containerAriaLabel = 'Notificaciones',
  closeLabel = 'Cerrar',
  closeButton = true,
  duration = TOAST_DURATION,
  gap = GAP,
  visibleToasts = 3,
  expand = false,
}: ToasterProps) {
  const timeout = Number.isFinite(duration) ? duration : 0;

  // El manager vive fuera de React y no ve las props del punto de montaje: le
  // pasamos la vida por defecto para que un aviso actualizado por `id` dure lo
  // mismo que uno recién lanzado.
  useEffect(() => setToastDefaultDuration(timeout), [timeout]);

  return (
    <Toast.Provider
      toastManager={toastManager}
      timeout={timeout}
      limit={visibleToasts}
    >
      <ToastList
        position={position}
        containerAriaLabel={containerAriaLabel}
        closeLabel={closeLabel}
        closeButton={closeButton}
        gap={gap}
        expand={expand}
      />
    </Toast.Provider>
  );
}

export type { ToastIntent };
