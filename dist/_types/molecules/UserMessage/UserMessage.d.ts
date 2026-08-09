import './UserMessage.css';
export interface UserMessageProps {
    children: React.ReactNode;
    /** Marca de tiempo visible (ej. "14:32"). */
    timestamp?: string;
}
export declare function UserMessage({ children, timestamp }: UserMessageProps): import("react/jsx-runtime").JSX.Element;
