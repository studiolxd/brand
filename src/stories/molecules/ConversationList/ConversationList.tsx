import { forwardRef } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './ConversationList.css';

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
  /** Texto del botón que abre una conversación nueva. Default castellano. */
  newLabel?: string;
  /** `aria-label` del `<nav>` que envuelve la lista. Default castellano. */
  navLabel?: string;
  /** Nombre accesible del aspa de cada fila. Recibe el título de la conversación. */
  deleteLabel?: (label: string) => string;
  /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye). */
  className?: string;
}

/**
 * La lista de conversaciones de un chat: el botón para abrir una nueva y la
 * navegación con las que ya existen, cada una con su aspa para borrarla.
 *
 * Reenvía el resto de props del `<div>` (`data-*`, `id`…) y el `ref`.
 */
export const ConversationList = forwardRef<HTMLDivElement, ConversationListProps>(function ConversationList({
  conversations,
  activeId,
  onNew,
  onSelect,
  onDelete,
  newLabel = 'Nueva conversación',
  navLabel = 'Conversaciones',
  deleteLabel = (label) => `Eliminar conversación "${label}"`,
  className,
  ...rest
}, ref) {
  return (
    <div ref={ref} className={`conversation-list${className ? ` ${className}` : ''}`} {...rest}>
      <div className="conversation-list__header">
        <Button variant="outline" block onClick={onNew}>
          {newLabel}
        </Button>
      </div>

      <nav aria-label={navLabel} className="conversation-list__nav">
        <ul className="conversation-list__items" role="list">
          {conversations.map((conv) => {
            const isActive = conv.id === activeId;
            return (
              <li key={conv.id} className="conversation-list__item">
                <button
                  type="button"
                  className={`conversation-list__label${isActive ? ' conversation-list__label--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => onSelect(conv.id)}
                >
                  {conv.label}
                </button>
                <button
                  type="button"
                  className="conversation-list__delete"
                  onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
                >
                  <Icon name="close" size="xs" />
                  <VisuallyHidden>{deleteLabel(conv.label)}</VisuallyHidden>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
});
