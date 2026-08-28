import type { ReactNode } from 'react';
/**
 * Intención del aviso. Es la misma escala que la variante del `Alert`, más los
 * dos casos que solo tienen sentido en una cola: `info` (que cae en el neutro,
 * como en el `Alert`) y `loading` (un aviso que espera y no se cierra solo).
 */
export type ToastIntent = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';
/** Acción opcional del aviso: un botón con su rótulo y su manejador. */
export interface ToastActionDescriptor {
    /** Rótulo visible del botón. Lo pone el consumidor: no hay default castellano. */
    label: string;
    onClick: () => void;
}
export interface ToastOptions {
    /**
     * Identificador del aviso. Si ya hay uno vivo con ese `id`, la llamada **lo
     * actualiza en su sitio** en vez de apilar otro: es el patrón
     * `const id = toast.loading(…)` → `toast.success(…, { id })`.
     */
    id?: string;
    /** Segunda línea del aviso, bajo el título. */
    description?: ReactNode;
    /**
     * Milisegundos que vive el aviso. Por defecto, el `duration` del `Toaster`
     * (5000). `Infinity` lo deja fijo: solo se va con el aspa.
     */
    duration?: number;
    /** Botón de acción del aviso. */
    action?: ToastActionDescriptor;
    /** Se llama al cerrarse el aviso, sea por el aspa o por agotar su tiempo. */
    onClose?: () => void;
}
/** Mensaje de `toast.promise`: un rótulo suelto o el juego completo de opciones. */
export type ToastMessage = string | (ToastOptions & {
    title: string;
});
export interface ToastPromiseMessages<Value> {
    loading: ToastMessage;
    success: ToastMessage | ((value: Value) => ToastMessage);
    error: ToastMessage | ((error: unknown) => ToastMessage);
}
/**
 * La cola de Base UI. Vive fuera de React —es lo que permite lanzar un aviso
 * desde un manejador, un `catch` o un módulo sin componente— y el `Toaster` la
 * conecta con el árbol pasándosela a su `Toast.Provider`.
 */
export declare const toastManager: import("@base-ui/react").ToastManager<any>;
/**
 * Vida por defecto de un aviso, en milisegundos. No es un token: la mide el
 * motor de la cola en JS y un token CSS no movería nada. Cinco segundos son los
 * que tarda en leerse un rótulo corto sin llegar a molestar; el reloj se para al
 * pasar el ratón o al entrar el foco.
 */
export declare const TOAST_DURATION = 5000;
/**
 * El `Toaster` publica aquí su `duration` para que un aviso actualizado por `id`
 * herede la misma vida que uno recién lanzado.
 * @internal
 */
export declare function setToastDefaultDuration(duration: number): void;
/**
 * El `Toaster` sincroniza aquí la lista real de avisos en pantalla: es lo que
 * mantiene `dismiss()` sin argumento pegado a la realidad, incluidos los avisos
 * que abre `toast.promise`.
 * @internal
 */
export declare function syncLiveToasts(ids: readonly string[]): void;
/**
 * Lanza un aviso efímero. Devuelve su `id`, que sirve para actualizarlo
 * (`{ id }`) o para cerrarlo (`toast.dismiss(id)`).
 *
 * Requiere un `<Toaster />` montado en la raíz de la aplicación: la cola vive
 * fuera de React, pero sin punto de montaje no hay dónde pintar.
 */
declare function base(title: ReactNode, options?: ToastOptions): string;
export declare const toast: typeof base & {
    /** Aviso neutro, sin intención. Igual que `toast(…)`. */
    message: (title: ReactNode, options?: ToastOptions) => string;
    /** Algo ha salido bien. */
    success: (title: ReactNode, options?: ToastOptions) => string;
    /** Algo ha fallado. Interrumpe al lector de pantalla. */
    error: (title: ReactNode, options?: ToastOptions) => string;
    /** Algo pide atención antes de seguir. Interrumpe al lector de pantalla. */
    warning: (title: ReactNode, options?: ToastOptions) => string;
    /** Un dato de contexto. Sin relleno propio: cae en el neutro, como en el `Alert`. */
    info: (title: ReactNode, options?: ToastOptions) => string;
    /**
     * Aviso de espera: **no se cierra solo**. Se resuelve actualizándolo con su
     * `id` (`toast.success('Hecho', { id })`) o con `toast.dismiss(id)`.
     */
    loading: (title: ReactNode, options?: ToastOptions) => string;
    /** Cierra un aviso por `id`, o todos los que haya en pantalla si no se pasa ninguno. */
    dismiss: (id?: string) => void;
    /**
     * Sigue una promesa con un solo aviso: espera mientras corre y se convierte en
     * éxito o error al resolverse. Devuelve la misma promesa, así que se puede
     * seguir encadenando (y hay que capturar el rechazo igual que en el original).
     */
    promise: <Value>(promise: Promise<Value>, messages: ToastPromiseMessages<Value>) => Promise<Value>;
};
export {};
