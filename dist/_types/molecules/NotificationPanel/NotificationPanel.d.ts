import { type ReactNode } from 'react';
import { type PopoverChangeDetails } from '../../atoms/Popover/Popover';
import './NotificationPanel.css';
/**
 * El cromo del panel, y **solo el cromo**: cómo se llama el panel, la marca de
 * una fila sin leer, el vacío, los dos destinos del pie y la acción sobre el
 * conjunto. Ninguno nombra una notificación: eso viaja en `items` y lo escribe
 * el producto —título, cuerpo y la hora, ya formateada por el consumidor—.
 *
 * Los textos de la campana **no están aquí**: `label` y `countLabel` son un
 * reenvío puro al `NotificationButton`, que tiene su propio espacio. El panel
 * no repite la clave.
 */
export interface NotificationPanelMessages {
    /** Nombre del panel (`role="dialog"`) y de la lista. No se pinta. */
    panel: string;
    /** Texto, solo para lectores de pantalla, que marca una fila sin leer. */
    unread: string;
    /** Mensaje cuando no hay notificaciones. */
    empty: string;
    /** Rótulo del enlace a la bandeja. */
    all: string;
    /** Rótulo del enlace a las preferencias. */
    preferences: string;
    /** Rótulo del botón de marcar todas como leídas. */
    markAllRead: string;
}
/** Una notificación tal y como la enseña el panel: ya resuelta, sin datos crudos. */
export interface NotificationPanelItem {
    id: string;
    /** Título de la notificación. Una línea. */
    title: string;
    /** Cuerpo. Se recorta con elipsis a las líneas del token `item-body-line-clamp`. */
    body?: string;
    /** Fecha relativa **ya formateada** por el consumidor («hace 5 min»): el panel no formatea fechas. */
    time: string;
    /** Sin leer: punto, peso en el título y tinta plena. */
    unread: boolean;
}
/** Lo que el panel pasa al `Link` del router de la aplicación. */
export interface NotificationPanelLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    id?: string;
    'aria-labelledby'?: string;
}
export type RenderNotificationPanelLink = (props: NotificationPanelLinkProps) => ReactNode;
export interface NotificationPanelProps {
    /**
     * Las notificaciones que se ven en el panel, ya recortadas por el consumidor
     * (el adelanto son cinco como mucho): el panel no pagina ni ordena.
     */
    items?: NotificationPanelItem[];
    /**
     * Sin leer **en total**, para el contador de la campana. No se deduce de
     * `items`: el panel enseña un adelanto y el total suele ser mayor.
     */
    count?: number;
    /** Tope del contador de la campana («99+»). */
    max?: number;
    /**
     * Se llama al pulsar una fila sin leer. El panel la pinta como leída en el
     * sitio sin esperar respuesta.
     */
    onRead: (id: string) => void;
    /**
     * Con ella se pinta «Marcar todas como leídas» bajo la lista, **y solo
     * mientras quede alguna sin leer**; sin ella, no se pinta nunca.
     */
    onMarkAllRead?: () => void;
    /** Destino de la bandeja completa. */
    allHref: string;
    /** Destino de las preferencias de notificación. */
    preferencesHref: string;
    /**
     * El `Link` del router de la aplicación (patrón de `Link.mdx`: el router es
     * de la app). Debe propagar **todas** las props que recibe. Por defecto, un
     * `<a>` corriente.
     */
    renderLink?: RenderNotificationPanelLink;
    /**
     * Nombre accesible de la campana sin contador. **Reenvío puro** al
     * `NotificationButton`: sin ella, sale de `notificationButton.label`.
     */
    label?: string;
    /**
     * Nombre accesible de la campana con contador. **Reenvío puro** al
     * `NotificationButton`: sin ella, sale de `notificationButton.countLabel`.
     */
    countLabel?: (count: number) => string;
    /**
     * Nombre del panel (`role="dialog"`) y de la lista. **No se pinta**: el
     * panel no lleva cabecera visible. **Sin default**: sin él, sale de
     * `notificationPanel.panel` del `BrandMessagesProvider`.
     */
    panelLabel?: string;
    /**
     * Texto solo para lectores de pantalla que marca una fila sin leer. **Sin
     * default**: sin él, sale de `notificationPanel.unread`.
     */
    unreadLabel?: string;
    /**
     * Mensaje cuando no hay notificaciones. **Sin default**: sin él, sale de
     * `notificationPanel.empty`.
     */
    emptyLabel?: string;
    /**
     * Rótulo del enlace a la bandeja. **Sin default**: sin él, sale de
     * `notificationPanel.all`.
     */
    allLabel?: string;
    /**
     * Rótulo del enlace a las preferencias. **Sin default**: sin él, sale de
     * `notificationPanel.preferences`.
     */
    preferencesLabel?: string;
    /**
     * Rótulo del botón de marcar todas. **Sin default**: sin él, sale de
     * `notificationPanel.markAllRead`. Solo se lee cuando el botón se pinta.
     */
    markAllReadLabel?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean, details: PopoverChangeDetails) => void;
    /** Se añade DESPUÉS de las clases propias del panel (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * La campana de la barra con su panel: al pulsarla se abre un `Popover`
 * anclado al botón con el adelanto de las últimas notificaciones, y debajo
 * los enlaces a la bandeja y a las preferencias.
 *
 * Es un **adelanto**, no la bandeja: aquí se lee y se marca leído, y lo único
 * que navega son los dos enlaces del pie. Pulsar una fila la marca leída y la
 * deja donde está —el panel no se reordena bajo el dedo—; al cerrarlo, la
 * lista vuelve a ser la que diga el consumidor.
 */
export declare function NotificationPanel({ items, count, max, onRead, onMarkAllRead, allHref, preferencesHref, renderLink, label, countLabel, panelLabel, unreadLabel, emptyLabel, allLabel, preferencesLabel, markAllReadLabel, open, defaultOpen, onOpenChange, className, }: NotificationPanelProps): import("react/jsx-runtime").JSX.Element;
