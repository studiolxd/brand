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
export declare function ConversationList({ conversations, activeId, onNew, onSelect, onDelete, newLabel, }: ConversationListProps): import("react/jsx-runtime").JSX.Element;
