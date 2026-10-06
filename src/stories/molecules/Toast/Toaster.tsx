'use client';

import { useEffect } from 'react';
import { Toast } from '@base-ui/react/toast';
import { useCssProperties } from '../../constants/css-properties';
import { usePortalContainer } from '../../constants/portal-container';
import { Button } from '../../atoms/Button/Button';
import { CloseButton } from '../../atoms/CloseButton/CloseButton';
import {
  TOAST_DURATION,
  setToastDefaultDuration,
  syncLiveToasts,
  toastManager,
  type ToastIntent,
} from './toast';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './Toast.css';

/**
 * El cromo de la cola de avisos. Los dos textos son del punto de montaje, no
 * de ningún aviso concreto: el rótulo de la región donde aterrizan y el aspa
 * que los cierra. Lo que DICE cada aviso —su título, su descripción, el
 * rótulo de su acción— lo pasa quien llama a `toast(...)`, y ya no tiene
 * default castellano.
 */
export interface ToasterMessages {
  /** Nombre accesible de la región donde se apilan los avisos. */
  container: string;
  /** Nombre accesible del aspa que cierra un aviso. */
  close: string;
}

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
   * Nombre accesible de la región de notificaciones. **Sin default**: sin él,
   * sale de `toaster.container` del `BrandMessagesProvider`.
   */
  containerAriaLabel?: string;
  /**
   * Nombre accesible del aspa de cierre. **Sin default**: sin él, sale de
   * `toaster.close` del `BrandMessagesProvider`. Solo se lee cuando el aspa se
   * pinta: un `Toaster` con `closeButton={false}` no lo exige.
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
 * La superficie del relleno, como en el `Alert`. `success` y `error` son
 * rellenos saturados con la misma cara en las dos superficies: la raíz declara
 * `.surface-dark` y el aspa y el botón de acción leen con tinta clara. El
 * neutro NO puede declararla en la raíz —sus tokens sí voltean con el tema, y
 * el selector sobre la propia raíz le daría el relleno de la otra cara: blanco
 * incluso sobre página clara—, así que su cara va en el contenido y en el aspa:
 * `.surface-invert`, la contraria a la ambiente (prusia sobre página clara,
 * blanco sobre oscura). `warning` es el amarillo con tinta prusia en las dos:
 * `.surface-light`.
 */
function toastClasses(type: string | undefined, dismissible: boolean) {
  return [
    'alert',
    VARIANT_CLASS[type ?? ''] ?? '',
    type === 'success' || type === 'error' ? 'surface-dark' : '',
    dismissible ? 'alert--dismissible' : '',
    'toast',
  ].filter(Boolean).join(' ');
}

/** Superficie interior (contenido y aspa) que le toca a cada tipo de aviso. */
function interiorSurface(type: string | undefined) {
  if (type === 'success' || type === 'error') return '';
  return type === 'warning' ? ' surface-light' : ' surface-invert';
}

interface ToastListProps extends Required<Pick<ToasterProps, 'position' | 'closeButton' | 'gap'>> {
  containerAriaLabel?: string;
  closeLabel?: string;
  expand?: boolean;
}

function ToastList({ position, containerAriaLabel, closeLabel, closeButton, gap, expand }: ToastListProps) {
  const t = useBrandMessages('toaster');
  const { toasts } = Toast.useToastManager();
  const [side, align] = position.split('-') as ['top' | 'bottom', 'right' | 'left' | 'center'];

  const ids = toasts.map((item) => item.id).join(',');
  useEffect(() => {
    syncLiveToasts(ids ? ids.split(',') : []);
  }, [ids]);

  // El viewport vive en un portal y solo existe en cliente: la separación se
  // escribe por el CSSOM, nunca en un atributo `style` (que una app con
  // `style-src 'self'` descartaría sin avisar).
  const viewportRef = useCssProperties({ '--toast-gap': `${gap}px` });
  const portalContainer = usePortalContainer(undefined);

  const classes = [
    'toaster',
    side === 'top' ? 'toaster--top' : '',
    align !== 'right' ? `toaster--${align}` : '',
    expand ? 'toaster--expanded' : '',
  ].filter(Boolean).join(' ');

  return (
    <Toast.Portal container={portalContainer}>
      <Toast.Viewport
        ref={viewportRef}
        className={classes}
        aria-label={t('container', containerAriaLabel)}
      >
        {toasts.map((item) => (
          <Toast.Root
            key={item.id}
            toast={item}
            className={toastClasses(item.type, closeButton)}
          >
            <div className={`alert__content${interiorSurface(item.type)}`}>
              <Toast.Title className="alert__title" />
              <Toast.Description className="alert__description" />
              <Toast.Action className="toast__action" render={<Button variant="ghost" size="sm" />} />
            </div>
            {closeButton && (
              <Toast.Close
                className={`alert__close${interiorSurface(item.type)}`}
                render={<CloseButton label={t('close', closeLabel)} />}
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
 * **Solo puede haber un `Toaster` montado a la vez.** La cola (`toastManager`)
 * es un único objeto de módulo y el `Toaster` no la aísla: dos montados pintan
 * cada aviso dos veces, el último que monta impone su `duration` a todos
 * (`setToastDefaultDuration` escribe una variable global, la que usa un aviso
 * actualizado por `id`) y los dos sincronizan la misma lista de avisos vivos de
 * `toast.dismiss()`. Para otra posición u otra duración se cambian las props de
 * ese único `Toaster` o se pasa `duration` al aviso.
 *
 * La cara del aviso es la del `Alert` —mismo relleno, mismo borde, misma
 * tipografía y las mismas cuatro intenciones, sobre el juego de tokens
 * `alert.*`—; lo propio del toast es la capa, la posición, el apilado y el
 * auto-cierre (`toast.*`).
 */
export function Toaster({
  position = 'bottom-right',
  containerAriaLabel,
  closeLabel,
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
