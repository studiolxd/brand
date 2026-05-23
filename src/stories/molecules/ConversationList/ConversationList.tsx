import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './ConversationList.css';

export interface ConversationItem {
  id: string;
  label: string;
}

export interface ConversationListProps {
  conversations: ConversationItem[];
  activeId?: string;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  newLabel?: string;
}

export function ConversationList({
  conversations,
  activeId,
  onNew,
  onSelect,
  onDelete,
  newLabel = 'Nueva conversación',
}: ConversationListProps) {
  return (
    <div className="conversation-list">
      <div className="conversation-list__header">
        <button type="button" className="conversation-list__new" onClick={onNew}>
          {newLabel}
        </button>
      </div>

      <nav aria-label="Conversaciones" className="conversation-list__nav">
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
                  tabIndex={-1}
                >
                  <Icon name="close" size="xs" />
                  <VisuallyHidden>Eliminar conversación "{conv.label}"</VisuallyHidden>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
