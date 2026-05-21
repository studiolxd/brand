import './EmptyState.css';
export interface EmptyStateAction {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    href?: string;
}
export interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: EmptyStateAction;
    size?: 'sm' | 'md';
}
export declare function EmptyState({ title, description, icon, action, size }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
