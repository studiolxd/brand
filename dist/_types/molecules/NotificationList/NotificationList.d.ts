import type { ReactNode } from 'react';
import './NotificationList.css';
/** Una notificación tal y como la enseña la lista: ya resuelta, sin datos crudos. */
export interface NotificationListItem {
    id: string;
    /** Título de la notificación. Con `href`, es el enlace de la fila. */
    title: string;
    /** Cuerpo. En la página se lee entero: no se recorta, a diferencia del panel. */
    body?: string;
    /** Fecha relativa **ya formateada** por el consumidor («hace 5 min»): la lista no formatea fechas. */
    time: string;
    /**
     * La misma fecha en formato máquina (`2026-09-10T09:12:00Z`). Con ella la
     * hora se pinta en un `<time datetime>`; sin ella, en texto corriente.
     */
    timeDateTime?: string;
    /**
     * Sin leer: punto y peso en el título. Se dice igual que en el
     * `NotificationPanel`, con el mismo booleano y en el mismo sentido.
     */
    unread: boolean;
    /** Destino de la notificación. Sin él, el título no es un enlace. */
    href?: string;
    /**
     * Texto solo para lectores de pantalla de **esta** fila sin leer, cuando el
     * de la lista (`unreadLabel`) no vale. Casi nunca hace falta.
     */
    unreadLabel?: string;
}
/** Lo que la lista pasa al `Link` del router de la aplicación. */
export interface NotificationListLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}
export type RenderNotificationListLink = (props: NotificationListLinkProps) => ReactNode;
export interface NotificationListProps {
    /**
     * Las notificaciones de la página, ya ordenadas y paginadas por el
     * consumidor: la lista no ordena, no pagina y no filtra.
     */
    items: NotificationListItem[];
    /**
     * El `Link` del router de la aplicación (patrón de `Link.mdx`: el router es
     * de la app). Debe propagar **todas** las props que recibe. Por defecto, un
     * `<a>` corriente.
     */
    renderLink?: RenderNotificationListLink;
    /**
     * Las acciones **propias del producto** de cada fila («Eliminar»…), en la
     * columna del final. Van como `Button variant="text" size="sm"`.
     */
    renderActions?: (item: NotificationListItem) => ReactNode;
    /** Se llama al pulsar el título de una fila con `href`, antes de navegar. */
    onItemClick?: (item: NotificationListItem) => void;
    /**
     * Con ella, cada fila sin leer estrena un «Marcar como leída» delante de las
     * acciones del producto; sin ella no se pinta.
     */
    onMarkRead?: (id: string) => void;
    /** Nombre accesible de la lista. **No se pinta**: el título lo pone la página. Default «Notificaciones». */
    label?: string;
    /** Texto solo para lectores de pantalla que marca una fila sin leer. Default «Sin leer». */
    unreadLabel?: string;
    /** Rótulo del botón de marcar una fila. Default «Marcar como leída». */
    markReadLabel?: string;
    /** Se añade DESPUÉS de las clases propias de la lista (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * La bandeja: **todas** las notificaciones, a página completa. La misma fila
 * del `NotificationPanel` —punto de no leída, título y cuerpo— pero leída a la
 * talla de la página, con el texto entero y con las acciones de cada
 * notificación a la vista.
 *
 * Va a sangre en la columna de la página: sin tarjeta y sin borde alrededor.
 * Lo único que separa una notificación de la siguiente es la línea de fila del
 * sistema, la misma de la `Table`.
 *
 * No ordena, no pagina y no filtra: eso es de la página (`Pagination`,
 * `FilterBar`). Con la lista vacía no pinta nada — el hueco es de un
 * `EmptyState`.
 */
export declare function NotificationList({ items, renderLink, renderActions, onItemClick, onMarkRead, label, unreadLabel, markReadLabel, className, }: NotificationListProps): import("react/jsx-runtime").JSX.Element | null;
