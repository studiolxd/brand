'use client';

import type { ReactNode } from 'react';
import { Toast } from '@base-ui-components/react/toast';

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
export type ToastMessage = string | (ToastOptions & { title: string });

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
export const toastManager = Toast.createToastManager();

/**
 * Vida por defecto de un aviso, en milisegundos. No es un token: la mide el
 * motor de la cola en JS y un token CSS no movería nada. Cinco segundos son los
 * que tarda en leerse un rótulo corto sin llegar a molestar; el reloj se para al
 * pasar el ratón o al entrar el foco.
 */
export const TOAST_DURATION = 5000;

/** Avisos vivos, para `dismiss()` sin argumento y para saber si un `id` se reutiliza. */
const live = new Set<string>();
/** Relojes propios de los avisos actualizados por `id` (ver `scheduleClose`). */
const timers = new Map<string, ReturnType<typeof setTimeout>>();

let defaultDuration = TOAST_DURATION;

/**
 * El `Toaster` publica aquí su `duration` para que un aviso actualizado por `id`
 * herede la misma vida que uno recién lanzado.
 * @internal
 */
export function setToastDefaultDuration(duration: number) {
  defaultDuration = duration;
}

/**
 * El `Toaster` sincroniza aquí la lista real de avisos en pantalla: es lo que
 * mantiene `dismiss()` sin argumento pegado a la realidad, incluidos los avisos
 * que abre `toast.promise`.
 * @internal
 */
export function syncLiveToasts(ids: readonly string[]) {
  live.forEach((id) => {
    if (!ids.includes(id)) {
      live.delete(id);
      clearScheduledClose(id);
    }
  });
  ids.forEach((id) => live.add(id));
}

/** `Infinity` (o cualquier no-finito) es «no te cierres solo» — en Base UI, `timeout: 0`. */
function toTimeout(duration: number | undefined): number | undefined {
  if (duration === undefined) return undefined;
  return Number.isFinite(duration) ? duration : 0;
}

/**
 * `error` y `warning` interrumpen (`priority: 'high'` → `role="alertdialog"` y
 * anuncio asertivo); el resto informa sin interrumpir. Es el mismo criterio que
 * el `role` por variante del `Alert`.
 */
function toPriority(intent: ToastIntent): 'low' | 'high' {
  return intent === 'error' || intent === 'warning' ? 'high' : 'low';
}

function clearScheduledClose(id: string) {
  const timer = timers.get(id);
  if (timer !== undefined) {
    clearTimeout(timer);
    timers.delete(id);
  }
}

/**
 * Reloj de cierre para el único caso que el motor no cubre: un aviso
 * **actualizado por `id`** (el patrón `loading` → `success`). El motor solo
 * programa el suyo al dar de alta el aviso, así que al reemplazar su contenido
 * hay que volver a contar. Es un reloj de fuera de la cola: no se pausa al pasar
 * el ratón.
 */
function scheduleClose(id: string, intent: ToastIntent, duration: number | undefined) {
  clearScheduledClose(id);
  if (intent === 'loading') return;
  const timeout = toTimeout(duration) ?? defaultDuration;
  if (timeout <= 0) return;
  timers.set(id, setTimeout(() => {
    timers.delete(id);
    toastManager.close(id);
  }, timeout));
}

function payload(title: ReactNode, intent: ToastIntent, options?: ToastOptions) {
  return {
    title,
    type: intent,
    description: options?.description,
    timeout: toTimeout(options?.duration),
    priority: toPriority(intent),
    actionProps: options?.action
      ? { children: options.action.label, onClick: options.action.onClick }
      : undefined,
    onClose: options?.onClose,
  };
}

function emit(title: ReactNode, intent: ToastIntent, options?: ToastOptions): string {
  const id = options?.id;

  if (id !== undefined && live.has(id)) {
    toastManager.update(id, payload(title, intent, options));
    scheduleClose(id, intent, options?.duration);
    return id;
  }

  const created = toastManager.add({ ...payload(title, intent, options), id });
  live.add(created);
  return created;
}

function resolveMessage(message: ToastMessage): ToastOptions & { title: string } {
  return typeof message === 'string' ? { title: message } : message;
}

/**
 * Lanza un aviso efímero. Devuelve su `id`, que sirve para actualizarlo
 * (`{ id }`) o para cerrarlo (`toast.dismiss(id)`).
 *
 * Requiere un `<Toaster />` montado en la raíz de la aplicación: la cola vive
 * fuera de React, pero sin punto de montaje no hay dónde pintar.
 */
function base(title: ReactNode, options?: ToastOptions): string {
  return emit(title, 'default', options);
}

export const toast = Object.assign(base, {
  /** Aviso neutro, sin intención. Igual que `toast(…)`. */
  message: (title: ReactNode, options?: ToastOptions) => emit(title, 'default', options),
  /** Algo ha salido bien. */
  success: (title: ReactNode, options?: ToastOptions) => emit(title, 'success', options),
  /** Algo ha fallado. Interrumpe al lector de pantalla. */
  error: (title: ReactNode, options?: ToastOptions) => emit(title, 'error', options),
  /** Algo pide atención antes de seguir. Interrumpe al lector de pantalla. */
  warning: (title: ReactNode, options?: ToastOptions) => emit(title, 'warning', options),
  /** Un dato de contexto. Sin relleno propio: cae en el neutro, como en el `Alert`. */
  info: (title: ReactNode, options?: ToastOptions) => emit(title, 'info', options),
  /**
   * Aviso de espera: **no se cierra solo**. Se resuelve actualizándolo con su
   * `id` (`toast.success('Hecho', { id })`) o con `toast.dismiss(id)`.
   */
  loading: (title: ReactNode, options?: ToastOptions) => emit(title, 'loading', options),

  /** Cierra un aviso por `id`, o todos los que haya en pantalla si no se pasa ninguno. */
  dismiss: (id?: string) => {
    if (id !== undefined) {
      clearScheduledClose(id);
      toastManager.close(id);
      return;
    }
    live.forEach((liveId) => {
      clearScheduledClose(liveId);
      toastManager.close(liveId);
    });
  },

  /**
   * Sigue una promesa con un solo aviso: espera mientras corre y se convierte en
   * éxito o error al resolverse. Devuelve la misma promesa, así que se puede
   * seguir encadenando (y hay que capturar el rechazo igual que en el original).
   */
  promise: <Value,>(promise: Promise<Value>, messages: ToastPromiseMessages<Value>): Promise<Value> => {
    const resolve = (
      message: ToastMessage | ((value: never) => ToastMessage),
      value: unknown,
      intent: ToastIntent,
    ) => {
      const resolved = resolveMessage(
        typeof message === 'function' ? (message as (v: unknown) => ToastMessage)(value) : message,
      );
      return payload(resolved.title, intent, resolved);
    };

    return toastManager.promise(promise, {
      loading: payload(resolveMessage(messages.loading).title, 'loading', resolveMessage(messages.loading)),
      success: (value: Value) => resolve(messages.success, value, 'success'),
      error: (error: unknown) => resolve(messages.error, error, 'error'),
    });
  },
});
