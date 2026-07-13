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
/** Subparte de composición: título del alert. */
export declare const AlertTitle: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & import("react").RefAttributes<HTMLParagraphElement>>;
/** Subparte de composición: descripción del alert. */
export declare const AlertDescription: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/**
 * Namespace de composición. Las subpartes también están disponibles como **named
 * exports** (`AlertTitle`, `AlertDescription`): en **Server Components (RSC)** usa los
 * named exports — el namespace (`Alert.Title`) requiere contexto cliente.
 */
export declare const Alert: import("react").ForwardRefExoticComponent<AlertProps & import("react").RefAttributes<HTMLDivElement>> & {
    Title: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & import("react").RefAttributes<HTMLParagraphElement>>;
    Description: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
};
