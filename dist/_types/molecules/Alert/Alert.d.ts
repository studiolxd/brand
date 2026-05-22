import './Alert.css';
export interface AlertProps {
    variant?: 'default' | 'success' | 'error' | 'warning';
    title: string;
    description?: React.ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
}
export declare function Alert({ variant, title, description, dismissible, onDismiss, className, }: AlertProps): import("react/jsx-runtime").JSX.Element | null;
