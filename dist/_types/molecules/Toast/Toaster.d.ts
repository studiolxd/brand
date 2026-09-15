import { type ToastIntent } from './toast';
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
export type ToastPosition = 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' | 'top-center';
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
/**
 * Punto de montaje de los avisos efímeros. Se monta **una vez** en la raíz de la
 * aplicación; los avisos se lanzan desde cualquier sitio con `toast(...)`.
 *
 * La cara del aviso es la del `Alert` —mismo relleno, mismo borde, misma
 * tipografía y las mismas cuatro intenciones, sobre el juego de tokens
 * `alert.*`—; lo propio del toast es la capa, la posición, el apilado y el
 * auto-cierre (`toast.*`).
 */
export declare function Toaster({ position, containerAriaLabel, closeLabel, closeButton, duration, gap, visibleToasts, expand, }: ToasterProps): import("react/jsx-runtime").JSX.Element;
export type { ToastIntent };
