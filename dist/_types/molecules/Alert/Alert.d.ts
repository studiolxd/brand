import './Alert.css';
export interface AlertProps extends React.ComponentPropsWithoutRef<'div'> {
    variant?: 'default' | 'success' | 'error' | 'warning';
    /** Título del alert. **Opcional**: en modo composición usa `children` (p. ej. `<Alert.Title>`). */
    title?: string;
    description?: React.ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
}
export type AlertTitleProps = React.ComponentPropsWithoutRef<'p'>;
export type AlertDescriptionProps = React.ComponentPropsWithoutRef<'div'>;
export declare const Alert: import("react").ForwardRefExoticComponent<AlertProps & import("react").RefAttributes<HTMLDivElement>> & {
    Title: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & import("react").RefAttributes<HTMLParagraphElement>>;
    Description: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
};
