'use client';

import { forwardRef, useCallback, useEffect, useState, type ReactNode } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { Sheet } from '../../molecules/Sheet/Sheet';
import './ChatShell.css';

/**
 * Mismo punto de ruptura que `--breakpoint-lg` (token `chat-shell.breakpoint`):
 * donde la columna de conversaciones pasa a cajón. Va en JS y no en una media
 * query porque la lista **cambia de sitio en el árbol** —de `<aside>` a
 * diálogo—, no solo de forma. Mismo mecanismo que `AppShell`.
 */
const DESKTOP_MQ = '(min-width: 1024px)';

export interface ChatShellProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * La columna de conversaciones, normalmente un `ConversationList`. Sin ella,
   * el armazón es solo hilo y composer — que es como se monta dentro de un
   * `AppShell`, donde la columna vive en el `Sidebar`.
   *
   * Por debajo del punto de ruptura no desaparece ni se encoge: se pliega a un
   * cajón (`Sheet`) que abre un botón en la cabecera.
   */
  list?: ReactNode;
  /** La cabecera del hilo: el título de la conversación y sus controles. */
  header?: ReactNode;
  /** El hilo: un `ConversationThread`. */
  children: ReactNode;
  /** La caja de escribir: un `MessageComposer`. */
  composer?: ReactNode;
  /**
   * `aria-label` de la columna de conversaciones y título del cajón en
   * pantallas estrechas. Default: "Conversaciones" (castellano). Solo se usa
   * si hay `list`.
   */
  listLabel?: string;
  /**
   * Nombre accesible del botón que abre el cajón de conversaciones. Default:
   * "Abrir conversaciones" (castellano).
   */
  listTriggerLabel?: string;
  /**
   * Estado controlado del cajón de conversaciones. Sin él, el armazón lo lleva
   * por dentro; con él, el producto puede cerrarlo al abrir una conversación.
   * En escritorio no se usa: ahí la lista es columna y siempre está a la vista.
   */
  listOpen?: boolean;
  /** Avisa de cada apertura y cierre del cajón de conversaciones. */
  onListOpenChange?: (open: boolean) => void;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * El armazón de una pantalla de chat: tres zonas —la columna de
 * conversaciones, el hilo y la caja de escribir— colocadas y con el scroll en
 * el sitio correcto.
 *
 * Es **solo maqueta**: no lleva estado de producto ni sabe nada de mensajes.
 * Quién habla, qué se manda y qué conversación está abierta lo lleva el
 * producto y entra por los slots. Lo único que sí lleva es el cajón de
 * conversaciones de las pantallas estrechas, que es maqueta también.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `id`…) y el `ref`.
 */
export const ChatShell = forwardRef<HTMLDivElement, ChatShellProps>(function ChatShell({
  list,
  header,
  children,
  composer,
  listLabel = 'Conversaciones',
  listTriggerLabel = 'Abrir conversaciones',
  listOpen,
  onListOpenChange,
  className,
  ...rest
}, ref) {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(DESKTOP_MQ).matches,
  );
  const [selfOpen, setSelfOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => {
      setIsDesktop(mq.matches);
      // Al cruzar a escritorio la lista vuelve a ser columna: el cajón deja de
      // existir y su bandera se limpia, para que al volver a estrechar no
      // reaparezca abierto.
      if (mq.matches) setSelfOpen(false);
    };
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const setDrawerOpen = useCallback(
    (next: boolean) => {
      if (listOpen === undefined) setSelfOpen(next);
      onListOpenChange?.(next);
    },
    [listOpen, onListOpenChange],
  );

  const drawerOpen = !isDesktop && (listOpen ?? selfOpen);

  const asColumn = list !== undefined && list !== null && isDesktop;
  const asDrawer = list !== undefined && list !== null && !isDesktop;

  const classes = [
    'chat-shell',
    asColumn ? 'chat-shell--with-list' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {asColumn && (
        <aside className="chat-shell__list" aria-label={listLabel}>
          {list}
        </aside>
      )}

      <div className="chat-shell__main">
        {(header || asDrawer) && (
          <header className="chat-shell__header">
            {asDrawer && (
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label={listTriggerLabel}
                aria-haspopup="dialog"
                aria-expanded={drawerOpen}
                className="chat-shell__list-trigger"
                onClick={() => setDrawerOpen(true)}
              >
                <Icon name="menu" size="sm" />
              </Button>
            )}
            {header && <div className="chat-shell__header-content">{header}</div>}
          </header>
        )}
        <div className="chat-shell__thread">{children}</div>
        {composer && <div className="chat-shell__composer">{composer}</div>}
      </div>

      {asDrawer && (
        <Sheet
          side="left"
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          title={listLabel}
          className="chat-shell__drawer"
        >
          {list}
        </Sheet>
      )}
    </div>
  );
});
