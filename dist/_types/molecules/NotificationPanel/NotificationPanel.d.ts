import { type ReactNode } from 'react';
import { type PopoverChangeDetails } from '../../atoms/Popover/Popover';
import './NotificationPanel.css';
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
    /** Destino de la notificación. Con él aparece el enlace «Ver»; sin él, la fila no navega a ninguna parte. */
    link?: string;
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
     * Se llama al pulsar una fila sin leer, y también al pulsar su enlace «Ver».
     * El panel la pinta como leída en el sitio sin esperar respuesta.
     */
    onRead: (id: string) => void;
    /** Con ella el pie pinta «Marcar todas como leídas»; sin ella, no. */
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
    /** Nombre accesible de la campana sin contador. Default castellano. */
    label?: string;
    /** Nombre accesible de la campana con contador. Recibe el número. Default castellano. */
    countLabel?: (count: number) => string;
    /** Nombre del panel (`role="dialog"`) y título visible de la cabecera. Default «Notificaciones». */
    panelLabel?: string;
    /** Texto solo para lectores de pantalla que marca una fila sin leer. Default «Sin leer». */
    unreadLabel?: string;
    /** Rótulo del enlace de una notificación con destino. Default «Ver». */
    viewLabel?: string;
    /** Mensaje cuando no hay notificaciones. Default «Estás al día». */
    emptyLabel?: string;
    /** Rótulo del enlace a la bandeja. Default «Ver todas las notificaciones». */
    allLabel?: string;
    /** Rótulo del enlace a las preferencias. Default «Preferencias de notificaciones». */
    preferencesLabel?: string;
    /** Rótulo del botón de marcar todas. Default «Marcar todas como leídas». */
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
 * que navega es el enlace de cada notificación. Pulsar una fila la marca
 * leída y la deja donde está —el panel no se reordena bajo el dedo—; al
 * cerrarlo, la lista vuelve a ser la que diga el consumidor.
 */
export declare function NotificationPanel({ items, count, max, onRead, onMarkAllRead, allHref, preferencesHref, renderLink, label, countLabel, panelLabel, unreadLabel, viewLabel, emptyLabel, allLabel, preferencesLabel, markAllReadLabel, open, defaultOpen, onOpenChange, className, }: NotificationPanelProps): import("react/jsx-runtime").JSX.Element;
