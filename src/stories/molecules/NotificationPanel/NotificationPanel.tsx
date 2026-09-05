'use client';

import { useCallback, useId, useRef, useState, type ReactNode } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Icon } from '../../atoms/Icon/Icon';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Popover, type PopoverChangeDetails } from '../../atoms/Popover/Popover';
import { Text } from '../../atoms/Text/Text';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { NotificationButton } from '../NotificationButton/NotificationButton';
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

// Reenvía TODO lo que recibe: el panel pone clase, `onClick` y el nombre
// accesible compuesto del enlace «Ver». Un renderLink que solo copie `href`
// rompe las tres cosas.
function defaultRenderLink({ children, ...props }: NotificationPanelLinkProps) {
  return <a {...props}>{children}</a>;
}

/** Lo primero que se puede enfocar dentro del panel: la primera fila, o el pie si no hay filas. */
const FOCUSABLE = 'button, a[href]';

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
export function NotificationPanel({
  items = [],
  count = 0,
  max,
  onRead,
  onMarkAllRead,
  allHref,
  preferencesHref,
  renderLink = defaultRenderLink,
  label,
  countLabel,
  panelLabel = 'Notificaciones',
  unreadLabel = 'Sin leer',
  viewLabel = 'Ver',
  emptyLabel = 'Estás al día',
  allLabel = 'Ver todas las notificaciones',
  preferencesLabel = 'Preferencias de notificaciones',
  markAllReadLabel = 'Marcar todas como leídas',
  open,
  defaultOpen,
  onOpenChange,
  className,
}: NotificationPanelProps) {
  const baseId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  /**
   * Lo que se ha marcado leído **con el panel abierto**. Vive aquí y no en
   * `items` para que la fila cambie en el sitio sin esperar al servidor, y se
   * vacía al cerrar: a partir de ahí manda otra vez el consumidor.
   */
  const [readHere, setReadHere] = useState<string[]>([]);

  const isUnread = (item: NotificationPanelItem) => item.unread && !readHere.includes(item.id);

  const markRead = (item: NotificationPanelItem) => {
    if (!isUnread(item)) return;
    setReadHere((previous) => [...previous, item.id]);
    onRead(item.id);
  };

  const markAll = () => {
    setReadHere(items.map((item) => item.id));
    onMarkAllRead?.();
  };

  // El foco entra en el panel por su primer control, no por el panel entero:
  // lo primero que se hace aquí es recorrer notificaciones.
  const initialFocus = useCallback(
    () => panelRef.current?.querySelector<HTMLElement>(FOCUSABLE) ?? null,
    [],
  );

  const handleOpenChange = (next: boolean, details: PopoverChangeDetails) => {
    if (!next) setReadHere([]);
    onOpenChange?.(next, details);
  };

  const headingId = `${baseId}-title`;

  return (
    <Popover
      trigger={<NotificationButton count={count} max={max} label={label} countLabel={countLabel} />}
      label={panelLabel}
      align="end"
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={handleOpenChange}
      initialFocus={initialFocus}
      className={['notification-panel', className].filter(Boolean).join(' ')}
    >
      <div className="notification-panel__body" ref={panelRef}>
        <div className="notification-panel__header">
          <Heading level={2} size={3} id={headingId} className="notification-panel__title">
            {panelLabel}
          </Heading>
        </div>

        {items.length === 0 ? (
          <div className="notification-panel__empty">
            <Paragraph size="small">{emptyLabel}</Paragraph>
          </div>
        ) : (
          <ul className="notification-panel__list" aria-labelledby={headingId}>
            {items.map((item, index) => {
              const unread = isUnread(item);
              const titleId = `${baseId}-t-${index}`;
              const viewId = `${baseId}-v-${index}`;
              return (
                <li key={item.id} className="notification-panel__item">
                  {/* Ya leída, la fila sigue enfocable pero no hace nada:
                      `aria-disabled` lo dice sin sacarla del recorrido de
                      teclado, que es lo que perdería el foco justo después
                      de pulsarla. */}
                  <button
                    type="button"
                    className="notification-panel__item-action"
                    aria-disabled={unread ? undefined : true}
                    onClick={() => markRead(item)}
                  >
                    <span className="notification-panel__indicator">
                      {unread && (
                        <>
                          <Icon name="dot" size="sm" className="notification-panel__dot" />
                          <VisuallyHidden>{unreadLabel}</VisuallyHidden>
                        </>
                      )}
                    </span>
                    <span className="notification-panel__item-text">
                      <Text
                        id={titleId}
                        tone={unread ? 'default' : 'muted'}
                        className={[
                          'notification-panel__item-title',
                          unread ? 'notification-panel__item-title--unread' : '',
                        ].filter(Boolean).join(' ')}
                      >
                        {item.title}
                      </Text>
                      {item.body && (
                        <Text tone="muted" className="notification-panel__item-body">
                          {item.body}
                        </Text>
                      )}
                      <Text tone="muted" className="notification-panel__item-time">
                        {item.time}
                      </Text>
                    </span>
                  </button>

                  {/* Lo único que navega. Su nombre accesible se compone de su
                      propio rótulo y del título de la notificación, con los
                      nodos que ya existen: así «Ver» no se repite suelto y el
                      orden lo pone el idioma, no una plantilla de texto. */}
                  {item.link !== undefined &&
                    renderLink({
                      href: item.link,
                      id: viewId,
                      className: 'notification-panel__view',
                      'aria-labelledby': `${viewId} ${titleId}`,
                      onClick: () => markRead(item),
                      children: viewLabel,
                    })}
                </li>
              );
            })}
          </ul>
        )}

        <div className="notification-panel__footer">
          {onMarkAllRead && (
            <Button
              variant="text"
              size="sm"
              className="notification-panel__mark-all"
              onClick={markAll}
            >
              {markAllReadLabel}
            </Button>
          )}
          <div className="notification-panel__footer-links">
            {renderLink({ href: allHref, className: 'notification-panel__footer-link', children: allLabel })}
            {renderLink({
              href: preferencesHref,
              className: 'notification-panel__footer-link',
              children: preferencesLabel,
            })}
          </div>
        </div>
      </div>
    </Popover>
  );
}
