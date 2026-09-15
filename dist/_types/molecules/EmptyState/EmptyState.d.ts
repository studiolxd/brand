import './EmptyState.css';
export interface EmptyStateAction {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    href?: string;
}
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** El rótulo del estado: sin punto (ver Foundations → Redacción). */
    title: string;
    /** La frase que lo explica, opcional: termina en punto (ver Foundations → Redacción). */
    description?: string;
    icon?: React.ReactNode;
    action?: EmptyStateAction;
    size?: 'sm' | 'md';
}
export declare function EmptyState({ title, description, icon, action, size, className, ...rest }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
