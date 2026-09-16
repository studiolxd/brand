'use client';

import { forwardRef, useState, type ReactNode } from 'react';
import { Alert } from '../Alert/Alert';
import { Button } from '../../atoms/Button/Button';
import { EmptyState } from '../EmptyState/EmptyState';
import { Icon } from '../../atoms/Icon/Icon';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import { Tooltip } from '../../atoms/Tooltip/Tooltip';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './ConversationList.css';

/**
 * El cromo de la lista de conversaciones: el botón de abrir una nueva, el
 * nombre de la navegación, el aspa de cada fila y los dos estados que la lista
 * pinta ella misma —vacía y rota—.
 *
 * Los cinco son **genéricos**: dicen lo mismo en cualquier chat de la suite y
 * ninguno afirma nada del producto. Los títulos de las conversaciones son
 * datos y viajan en `conversations`; el detalle del fallo lo pone `error`, que
 * nunca tuvo default.
 */
export interface ConversationListMessages {
  /** Rótulo del botón que abre una conversación nueva. */
  new: string;
  /** Nombre accesible del `<nav>` que envuelve la lista. */
  nav: string;
  /** Nombre accesible del aspa de una fila. Recibe el título de la conversación. */
  delete: (label: string) => string;
  /** Título del estado vacío que la lista pinta ella misma. */
  empty: string;
  /** Título del aviso de que la lista no se pudo cargar. */
  error: string;
}

export interface ConversationItem {
  id: string;
  label: string;
}

export interface ConversationListProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  conversations: ConversationItem[];
  activeId?: string;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  /**
   * Texto del botón que abre una conversación nueva. **Sin default**: sin él,
   * sale de `conversationList.new` del `BrandMessagesProvider`.
   */
  newLabel?: string;
  /**
   * `aria-label` del `<nav>` que envuelve la lista. **Sin default**: sin él,
   * sale de `conversationList.nav`.
   */
  navLabel?: string;
  /**
   * Nombre accesible del aspa de cada fila. Recibe el título de la
   * conversación. **Sin default**: sin él, sale de `conversationList.delete`.
   */
  deleteLabel?: (label: string) => string;
  /**
   * La lista aún está cargando: en su sitio se pintan marcadores (`Skeleton`)
   * y el `<nav>` se anuncia ocupado (`aria-busy`). Mismo nombre que en
   * `DataTable`.
   */
  isLoading?: boolean;
  /** Cuántos marcadores pinta la carga. Default: `4`. */
  loadingCount?: number;
  /**
   * La lista no se pudo cargar: en su sitio se pinta un `Alert` de error con
   * este contenido. Manda sobre `isLoading` y sobre la lista vacía.
   */
  error?: ReactNode;
  /**
   * Título del `EmptyState` que la lista pinta **ella misma** cuando no hay
   * conversaciones. **Sin default**: sin él, sale de
   * `conversationList.empty`, así que el hueco vacío nunca se queda en blanco
   * y la pantalla no tiene que añadir un aviso propio encima —si lo añade, se
   * ven dos—. Solo se lee con la lista vacía.
   */
  emptyMessage?: string;
  /**
   * `title` del `Alert` de error. **Sin default**: sin él, sale de
   * `conversationList.error`, y solo se lee cuando hay `error`.
   */
  errorTitle?: string;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * ¿El título no cabe en su caja? `scrollWidth` es lo que mide el texto entero y
 * `clientWidth` lo que se ve; si el primero es mayor, el CSS lo ha cortado con
 * puntos suspensivos.
 *
 * Se llama **al apuntar o al enfocar una fila**, nunca al pintar la lista: es
 * una lectura de maqueta por interacción, no N por render. El píxel de margen
 * cubre el redondeo subpíxel de los navegadores, que da diferencias de 0,5px
 * en textos que sí caben.
 */
function estaCortado(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth + 1;
}

/**
 * La lista de conversaciones de un chat: el botón para abrir una nueva y la
 * navegación con las que ya existen, cada una con su aspa para borrarla.
 *
 * Un título que no cabe se corta con puntos suspensivos y, **solo entonces**,
 * se lee entero en un bocadillo al apuntar la fila o al enfocarla con el
 * teclado. Ver la doc, «El título cortado se lee en un bocadillo».
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `id`…) y el `ref`.
 */
export const ConversationList = forwardRef<HTMLDivElement, ConversationListProps>(function ConversationList({
  conversations,
  activeId,
  onNew,
  onSelect,
  onDelete,
  newLabel,
  navLabel,
  deleteLabel,
  isLoading = false,
  loadingCount = 4,
  error,
  emptyMessage,
  errorTitle,
  className,
  ...rest
}, ref) {
  // Qué fila tiene el bocadillo abierto. Uno solo a la vez y por `id`: no hace
  // falta medir ni guardar nada de las demás.
  const [bocadillo, setBocadillo] = useState<string | null>(null);
  const t = useBrandMessages('conversationList');

  // Prioridad: el error tapa todo, la carga tapa la lista, y la lista vacía
  // solo se anuncia cuando ya se sabe que está vacía.
  const estado = error !== undefined ? 'error' : isLoading ? 'loading' : conversations.length === 0 ? 'empty' : 'list';

  return (
    <div ref={ref} className={`conversation-list${className ? ` ${className}` : ''}`} {...rest}>
      <div className="conversation-list__header">
        <Button variant="outline" block onClick={onNew}>
          {t('new', newLabel)}
        </Button>
      </div>

      <nav aria-label={t('nav', navLabel)} className="conversation-list__nav" aria-busy={isLoading || undefined}>
        {estado === 'error' && (
          <Alert variant="error" title={t('error', errorTitle)} description={error} className="conversation-list__state" />
        )}

        {estado === 'loading' && (
          <div className="conversation-list__loading">
            {Array.from({ length: loadingCount }, (_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}

        {estado === 'empty' && (
          <EmptyState size="sm" title={t('empty', emptyMessage)} className="conversation-list__state" />
        )}

        {estado === 'list' && (
        <ul className="conversation-list__items" role="list">
          {conversations.map((conv) => {
            const isActive = conv.id === activeId;
            return (
              <li key={conv.id} className="conversation-list__item">
                {/* El bocadillo lo abrimos NOSOTROS, no el motor: solo cuando el
                    título está de verdad cortado. Por eso va controlado —
                    `open`— y la medida se hace en el propio evento que lo
                    abriría, con el elemento ya en la mano
                    (`event.currentTarget`). Base UI sigue encargándose de
                    cerrarlo (Escape, salir del disparador) y de colocarlo. */}
                <Tooltip
                  label={conv.label}
                  describe={false}
                  open={bocadillo === conv.id}
                  onOpenChange={(abierto) => { if (!abierto) setBocadillo(null); }}
                  onPointerEnter={(e) => { if (estaCortado(e.currentTarget)) setBocadillo(conv.id); }}
                  onPointerLeave={() => setBocadillo(null)}
                  onFocus={(e) => { if (estaCortado(e.currentTarget)) setBocadillo(conv.id); }}
                  onBlur={() => setBocadillo(null)}
                >
                  <button
                    type="button"
                    className={`conversation-list__label${isActive ? ' conversation-list__label--active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => onSelect(conv.id)}
                  >
                    {conv.label}
                  </button>
                </Tooltip>
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label={t('delete', deleteLabel)(conv.label)}
                  className="conversation-list__delete"
                  onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
                >
                  <Icon name="close" size="sm" />
                </Button>
              </li>
            );
          })}
        </ul>
        )}
      </nav>
    </div>
  );
});
