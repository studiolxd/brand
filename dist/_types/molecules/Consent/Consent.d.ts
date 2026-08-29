import { type ReactNode } from 'react';
import './Consent.css';
import { Modal } from '../Modal/Modal';
/** Una categoría de tecnologías sobre la que se pide (o no) consentimiento. */
export interface ConsentCategory {
    /** Identificador de la categoría. Es la clave dentro de `value`. */
    id: string;
    /** Nombre visible de la categoría. */
    name: string;
    /** Qué hace esa categoría. Se muestra como ayuda del interruptor. */
    description?: string;
    /**
     * Categoría necesaria: siempre activa y sin interruptor operable. No se
     * incluye en el objeto que devuelven `onSave`/`onChange` como algo que
     * decidir — se guarda siempre a `true`.
     */
    required?: boolean;
}
/** La decisión: qué categorías están aceptadas, por `id`. */
export type ConsentValue = Record<string, boolean>;
export interface ConsentBannerProps extends Omit<React.ComponentPropsWithoutRef<'aside'>, 'title' | 'children' | 'onChange'> {
    /**
     * Muestra la banda. Es la primera visita, o la decisión ha caducado: quién lo
     * sabe es el consumidor, que es también quien guarda la cookie. Default: `true`.
     */
    open?: boolean;
    /** Acepta todas las categorías. */
    onAcceptAll: () => void;
    /** Rechaza todas las opcionales. Tiene exactamente el mismo peso visual que aceptar. */
    onRejectAll: () => void;
    /** Abre el panel de preferencias. Sin ella no se pinta el botón. */
    onOpenPreferences?: () => void;
    /** Título de la banda. Default castellano: `'Cookies'`. */
    title?: ReactNode;
    /** Texto de la banda. Default castellano. */
    description?: ReactNode;
    /** URL de la política de cookies. Sin ella no se pinta el enlace. */
    policyHref?: string;
    /** Texto del enlace a la política. Default castellano: `'Política de cookies'`. */
    policyLabel?: string;
    /** Abre la política en otra pestaña (la política suele vivir en la web pública). */
    policyExternal?: boolean;
    /** Etiqueta del botón de aceptar. Default castellano: `'Aceptar todas'`. */
    acceptAllLabel?: string;
    /** Etiqueta del botón de rechazar. Default castellano: `'Rechazar'`. */
    rejectAllLabel?: string;
    /** Etiqueta del botón de preferencias. Default castellano: `'Preferencias'`. */
    preferencesLabel?: string;
    /**
     * Nombre accesible de la región. Default: el propio `title` cuando es texto;
     * si el título lleva JSX, pásalo. Default castellano: `'Consentimiento de cookies'`.
     */
    regionLabel?: string;
}
/**
 * La banda de consentimiento: qué se quiere guardar y tres salidas —aceptar,
 * rechazar, decidir por categorías—. **No es un diálogo**: no atrapa el foco, no
 * bloquea la página y no lleva velo. Rechazar cuesta exactamente lo mismo que
 * aceptar (un clic, el mismo peso visual), que es lo que pide la ePrivacy.
 *
 * El DS no toca cookies ni `localStorage`: la decisión, su persistencia y su
 * caducidad las lleva el consumidor. Aquí solo están la superficie y las
 * llamadas.
 */
export declare function ConsentBanner({ open, onAcceptAll, onRejectAll, onOpenPreferences, title, description, policyHref, policyLabel, policyExternal, acceptAllLabel, rejectAllLabel, preferencesLabel, regionLabel, className, ...rest }: ConsentBannerProps): import("react/jsx-runtime").JSX.Element | null;
export interface ConsentPreferencesProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Las categorías, en el orden en que se enseñan. Las `required` van primero por convención. */
    categories: ConsentCategory[];
    /** La decisión vigente. Es lo que se lee al abrir el panel. */
    value: ConsentValue;
    /**
     * Cambio de un interruptor. **Si se pasa, el panel es controlado**: `value`
     * manda en todo momento y el consumidor decide qué hacer con cada cambio. Sin
     * ella el panel lleva su propio borrador y solo devuelve la decisión al guardar.
     */
    onChange?: (value: ConsentValue) => void;
    /** Guardar. Recibe la decisión completa, categorías necesarias incluidas (siempre `true`). */
    onSave: (value: ConsentValue) => void;
    /** Aceptar todas desde el panel. Sin ella no se pinta el botón. */
    onAcceptAll?: () => void;
    /** Rechazar todas las opcionales desde el panel. Sin ella no se pinta el botón. */
    onRejectAll?: () => void;
    /** Superficie sobre la que se abre el panel. Default: `'sheet'`. */
    surface?: 'sheet' | 'modal';
    /** Borde por el que entra el panel (solo con `surface="sheet"`, la alternativa lateral que el sistema conserva para otros usos). Default: `'right'`. */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /** Título del panel. Default castellano: `'Preferencias de cookies'`. */
    title?: ReactNode;
    /** Etiqueta del botón de guardar. Default castellano: `'Guardar preferencias'`. */
    saveLabel?: string;
    /** Etiqueta del botón de aceptar todas. Default castellano: `'Aceptar todas'`. */
    acceptAllLabel?: string;
    /** Etiqueta del botón de rechazar. Default castellano: `'Rechazar todas'`. */
    rejectAllLabel?: string;
    /** Etiqueta del botón de cerrar. Default castellano: `'Cerrar'`. */
    closeLabel?: string;
    /** Marca de una categoría necesaria. Default castellano: `'Siempre activa'`. */
    alwaysOnLabel?: string;
    /**
     * Nodo DOM donde montar el portal del panel, reenviado a `Modal`/`Sheet`.
     * Necesario cuando el panel se abre dentro de `SiteShell`: por defecto el
     * portal monta en `document.body`, que no hereda los tokens de la
     * superficie pública (a diferencia del tema oscuro, que se activa en
     * `<html>`) — pásale el nodo de `SiteShell` (su `ref`).
     */
    container?: React.ComponentPropsWithoutRef<typeof Modal>['container'];
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * El panel de preferencias por categorías: título, la lista de categorías —un
 * interruptor por categoría opcional y una fila fija para las necesarias— y
 * el pie con las acciones. Sin párrafo de descripción bajo el título: la
 * propia lista explica qué se decide. Se abre sobre `Modal` (default) o sobre
 * `Sheet`; el foco, el cierre con Escape y el velo los pone Base UI.
 *
 * Sin `onChange` el panel lleva un **borrador**: los interruptores se mueven
 * dentro del panel y la decisión no sale hasta pulsar guardar. El borrador se
 * siembra de `value` cada vez que el panel se abre, así que cerrar sin guardar
 * descarta los cambios.
 */
export declare function ConsentPreferences({ open, onOpenChange, categories, value, onChange, onSave, onAcceptAll, onRejectAll, surface, side, title, saveLabel, acceptAllLabel, rejectAllLabel, closeLabel, alwaysOnLabel, container, className, }: ConsentPreferencesProps): import("react/jsx-runtime").JSX.Element;
