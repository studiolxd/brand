import './Toast.css';
export interface ToasterProps {
    /** Esquina de la ventana donde se monta la pila. Default: `bottom-right`. */
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center';
    /** Tema del toaster, para sincronizar con el tema de la app (p. ej. next-themes). */
    theme?: 'light' | 'dark' | 'system';
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
    /** Aire entre avisos apilados, en píxeles. Default: 8 (`spacing.2`). */
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
export declare function Toaster({ position, theme, containerAriaLabel, closeLabel, closeButton, duration, gap, visibleToasts, expand, }: ToasterProps): import("react/jsx-runtime").JSX.Element;
