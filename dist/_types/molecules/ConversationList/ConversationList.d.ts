import { type ReactNode } from 'react';
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
    /** Título del `EmptyState` cuando no hay conversaciones. Default castellano. */
    emptyMessage?: string;
    /** `title` del `Alert` de error. Default castellano. */
    errorTitle?: string;
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
