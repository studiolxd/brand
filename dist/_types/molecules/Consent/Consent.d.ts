import { type ReactNode } from 'react';
import './Consent.css';
import { Modal } from '../Modal/Modal';
/**
 * El cromo del consentimiento, y **solo el cromo**: lo que la banda y el
 * panel dicen por su cuenta y vale igual en cualquier sitio que los monte.
 *
 * La línea cae aquí en medio de una pieza legal, así que conviene decirla
 * entera:
 *
 * - **Los botones son cromo.** «Aceptar todas», «Rechazar» y «Preferencias»
 *   nombran las tres salidas que la ePrivacy pide, y son las mismas en todos
 *   los sitios: no describen qué se guarda, describen qué hace el botón.
 * - **El título y el nombre de la región son cromo.** «Cookies» nombra el
 *   mecanismo, no la política de nadie.
 * - **`description` y `policyLabel` NO están aquí y son obligatorias.** El
 *   texto legal depende de la jurisdicción y de lo que cada producto guarde
 *   de verdad: un default de catálogo lo haría decir lo mismo en todas partes
 *   —que es exactamente lo que un texto legal no puede hacer— y, siendo
 *   opcional, nadie llegaría a escribir el bueno. Como el `confirmLabel` del
 *   `ConfirmDialog`.
 * - **Las categorías tampoco.** Su nombre y su descripción son contenido: qué
 *   guarda cada una lo sabe el producto.
 */
export interface ConsentMessages {
    /** Título de la banda. */
    title: string;
    /** Nombre accesible de la región de la banda (`role="region"`). */
    regionLabel: string;
    /** Rótulo del botón que acepta todas las categorías. */
    acceptAll: string;
    /** Rótulo del botón que rechaza las opcionales. */
    rejectAll: string;
    /** Rótulo del botón que abre el panel de preferencias. */
    preferences: string;
    /** Título del panel de preferencias. */
    preferencesTitle: string;
    /** Marca, solo para lectores de pantalla, de una categoría necesaria. */
    alwaysOn: string;
}
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
/**
 * El enlace a la política: o no está, o está **entero**. El texto del enlace
 * es contenido —lo escribe la app y depende de la jurisdicción—, así que no
 * sale del catálogo, y una `policyHref` sin `policyLabel` dejaría un enlace
 * sin nombre. El tipo lo impide en compilación.
 */
export type ConsentPolicyProps = {
    policyHref?: undefined;
    policyLabel?: undefined;
    policyExternal?: undefined;
} | {
    /** URL de la política de cookies. */
    policyHref: string;
    /** Texto del enlace a la política. **Obligatorio con `policyHref`**: es contenido, no sale del catálogo. */
    policyLabel: string;
    /** Abre la política en otra pestaña (la política suele vivir en la web pública). */
    policyExternal?: boolean;
};
export interface ConsentBannerBaseProps extends Omit<React.ComponentPropsWithoutRef<'aside'>, 'title' | 'children' | 'onChange'> {
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
    /**
     * Título de la banda. **Sin default**: sin él, sale de `consent.title` del
     * `BrandMessagesProvider`.
     */
    title?: ReactNode;
    /**
     * Texto de la banda: qué se guarda y por qué. **Obligatorio y sin default**
     * — es el texto legal, depende de la jurisdicción y de lo que el producto
     * guarde de verdad, así que no sale del catálogo. Ver `ConsentMessages`.
     */
    description: ReactNode;
    /**
     * Etiqueta del botón de aceptar. **Sin default**: sin ella, sale de
     * `consent.acceptAll` del proveedor.
     */
    acceptAllLabel?: string;
    /**
     * Etiqueta del botón de rechazar. **Sin default**: sin ella, sale de
     * `consent.rejectAll` del proveedor.
     */
    rejectAllLabel?: string;
    /**
     * Etiqueta del botón de preferencias. **Sin default**: sin ella, sale de
     * `consent.preferences` del proveedor. Solo se lee si hay
     * `onOpenPreferences`: sin botón no se exige su texto.
     */
    preferencesLabel?: string;
    /**
     * Nombre accesible de la región. **Sin default**: sin él, sale de
     * `consent.regionLabel` del proveedor. Pásalo cuando el título lleve JSX y
     * quieras que la región se nombre con otra cosa.
     */
    regionLabel?: string;
}
export type ConsentBannerProps = ConsentBannerBaseProps & ConsentPolicyProps;
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
     * Cambio de categorías: se llama con la decisión completa cada vez que se
     * conmuta un interruptor — el panel no lleva botón «Guardar», persiste al
     * instante. **Si se pasa, el panel es controlado**: `value` manda en todo
     * momento y el consumidor decide qué hacer con cada cambio (normalmente,
     * guardarlo). Sin ella el panel lleva su propio estado interno, sembrado de
     * `value` cada vez que se abre.
     */
    onChange?: (value: ConsentValue) => void;
    /**
     * @deprecated Alias de `onChange`, por compatibilidad con quien ya lo
     * pasaba. Desde que el panel dejó de tener botón «Guardar» (v25.32.0),
     * `onSave` se llama en el mismo momento y con la misma decisión que
     * `onChange` — en cada conmutación de interruptor, no al pulsar un guardado
     * explícito que ya no existe. Pasa a `onChange`.
     */
    onSave?: (value: ConsentValue) => void;
    /** Superficie sobre la que se abre el panel. Default: `'sheet'`. */
    surface?: 'sheet' | 'modal';
    /** Borde por el que entra el panel (solo con `surface="sheet"`, la alternativa lateral que el sistema conserva para otros usos). Default: `'right'`. */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * Título del panel. **Sin default**: sin él, sale de
     * `consent.preferencesTitle` del `BrandMessagesProvider`.
     */
    title?: ReactNode;
    /**
     * Nombre accesible del botón de cerrar. **Reenvío puro** al `Modal` o al
     * `Sheet` sobre el que se abre el panel: sin él, el aspa lee `modal.close`
     * o `sheet.close` del `BrandMessagesProvider`. El espacio `consent` no
     * repite la clave.
     */
    closeLabel?: string;
    /**
     * Marca de una categoría necesaria, solo para lectores de pantalla. **Sin
     * default**: sin ella, sale de `consent.alwaysOn` del proveedor.
     */
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
 * El panel de preferencias por categorías: título y la lista de categorías —un
 * interruptor por categoría opcional y una fila fija para las necesarias—. Sin
 * párrafo de descripción bajo el título: la propia lista explica qué se
 * decide. Se abre sobre `Modal` (default) o sobre `Sheet`; el foco, el cierre
 * con Escape y el velo los pone Base UI.
 *
 * **No hay pie de acciones**: ni «Guardar» ni «Aceptar todas»/«Rechazar
 * todas». Quien entra aquí viene a decidir categoría por categoría, así que
 * cada interruptor persiste al instante — se conmuta y `onChange` (u `onSave`,
 * su alias) se llama en el momento con la decisión completa. Las salidas de un
 * clic («Aceptar todas»/«Rechazar») viven en `ConsentBanner`, que es donde la
 * ePrivacy las pide. Sin `onChange` el panel lleva su propio estado interno,
 * sembrado de `value` cada vez que se abre, y sigue disparando `onSave` en
 * cada cambio.
 */
export declare function ConsentPreferences({ open, onOpenChange, categories, value, onChange, onSave, surface, side, title, closeLabel, alwaysOnLabel, container, className, }: ConsentPreferencesProps): import("react/jsx-runtime").JSX.Element;
