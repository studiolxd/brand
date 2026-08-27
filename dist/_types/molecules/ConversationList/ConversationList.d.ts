import './ConversationList.css';
export interface ConversationItem {
    id: string;
    label: string;
}
export interface ConversationListProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSelect'> {
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
export declare const ConversationList: import("react").ForwardRefExoticComponent<ConversationListProps & import("react").RefAttributes<HTMLDivElement>>;
