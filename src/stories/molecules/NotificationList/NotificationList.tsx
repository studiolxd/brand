'use client';

import type { ReactNode } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { Text } from '../../atoms/Text/Text';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
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

// Reenvía TODO lo que recibe: la lista pone clase y, cuando toca, `onClick`.
function defaultRenderLink({ children, ...props }: NotificationListLinkProps) {
  return <a {...props}>{children}</a>;
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
export function NotificationList({
  items,
  renderLink = defaultRenderLink,
  renderActions,
  onItemClick,
  onMarkRead,
  label = 'Notificaciones',
  unreadLabel = 'Sin leer',
  markReadLabel = 'Marcar como leída',
  className,
}: NotificationListProps) {
  if (items.length === 0) return null;

  return (
    <ul
      className={['notification-list', className].filter(Boolean).join(' ')}
      aria-label={label}
    >
      {items.map((item) => {
        const unread = item.unread;
        const acciones = renderActions?.(item);
        const titleClass = [
          'notification-list__title',
          unread ? 'notification-list__title--unread' : '',
        ].filter(Boolean).join(' ');

        return (
          <li key={item.id} className="notification-list__item">
            {/* El hueco del punto se reserva siempre, con bolita o sin ella:
                los títulos de todas las filas empiezan en la misma vertical. */}
            <span className="notification-list__indicator">
              {unread && (
                <>
                  <Icon name="dot" size="sm" className="notification-list__dot" />
                  <VisuallyHidden>{item.unreadLabel ?? unreadLabel}</VisuallyHidden>
                </>
              )}
            </span>

            <div className="notification-list__text">
              {item.href
                ? renderLink({
                    href: item.href,
                    className: titleClass,
                    onClick: onItemClick ? () => onItemClick(item) : undefined,
                    children: item.title,
                  })
                : (
                  <Text className={titleClass}>
                    {item.title}
                  </Text>
                )}
              {item.body && (
                <Text tone="muted" className="notification-list__body">
                  {item.body}
                </Text>
              )}
            </div>

            {/* La columna del final: primero lo que se puede hacer con la
                notificación y, debajo, la hora — contexto del mensaje, no
                parte de él. Las dos cosas alineadas al extremo final. Por
                debajo de `md` esta columna cae bajo el texto, sin cambiar de
                orden ni de alineación. */}
            <div className="notification-list__aside">
              {(onMarkRead || acciones) && (
                <div className="notification-list__actions">
                  {onMarkRead && unread && (
                    <Button variant="text" size="sm" onClick={() => onMarkRead(item.id)}>
                      {markReadLabel}
                    </Button>
                  )}
                  {acciones}
                </div>
              )}
              {/* Con fecha máquina, la hora es un `<time datetime>`; sin
                  ella no puede serlo —«hace 5 min» no es una fecha válida— y
                  se queda en texto corriente. La tinta atenuada la pone la
                  hoja, igual en los dos casos. */}
              {item.timeDateTime ? (
                <time className="notification-list__time" dateTime={item.timeDateTime}>
                  {item.time}
                </time>
              ) : (
                <span className="notification-list__time">{item.time}</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
