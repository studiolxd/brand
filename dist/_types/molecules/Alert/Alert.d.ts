import './Alert.css';
export type AlertVariant = 'default' | 'success' | 'error' | 'warning';
export interface AlertProps extends React.ComponentPropsWithoutRef<'div'> {
    variant?: AlertVariant;
    /** Título del alert. **Opcional**: en modo composición usa `children` (p. ej. `<Alert.Title>`). */
    title?: string;
    description?: React.ReactNode;
    /**
     * Ranura de acciones del aviso —normalmente un `Button` del sistema—, al pie
     * del cuerpo. Los botones van **aquí y no dentro de la descripción**: la
     * ranura es la que aplica la norma del sistema (por debajo de `md` apilan y
     * cada uno ocupa la línea), y dentro del texto se quedan a medio ancho.
     */
    actions?: React.ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
    /**
     * Dónde dejar el foco al descartar. El botón de cierre desaparece con el
     * alert, así que el foco se movería al `<body>` y se perdería el sitio en la
     * página. Pásale la referencia del elemento que provocó el aviso (el botón
     * que lanzó la acción, el campo que falló). Sin ella, el componente enfoca
     * el `<body>` con `tabindex="-1"` temporal: el lector vuelve al principio
     * del documento, que es el último recurso, no lo deseable.
     */
    finalFocus?: React.RefObject<HTMLElement | null>;
    /**
     * Etiqueta accesible del botón de cierre. Default: «Cerrar» (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    closeLabel?: string;
}
export type AlertTitleProps = React.ComponentPropsWithoutRef<'p'>;
export type AlertDescriptionProps = React.ComponentPropsWithoutRef<'div'>;
export type AlertActionsProps = React.ComponentPropsWithoutRef<'div'>;
/** Subparte de composición: título del alert. */
export declare const AlertTitle: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & import("react").RefAttributes<HTMLParagraphElement>>;
/** Subparte de composición: descripción del alert. */
export declare const AlertDescription: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/**
 * Subparte de composición: las acciones del alert. Equivale a la prop
 * `actions` y es la pieza para el modo composición.
 */
export declare const AlertActions: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
/**
 * Namespace de composición. Las subpartes también están disponibles como **named
 * exports** (`AlertTitle`, `AlertDescription`): en **Server Components (RSC)** usa los
 * named exports — el namespace (`Alert.Title`) requiere contexto cliente.
 */
export declare const Alert: import("react").ForwardRefExoticComponent<AlertProps & import("react").RefAttributes<HTMLDivElement>> & {
    Title: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "ref"> & import("react").RefAttributes<HTMLParagraphElement>>;
    Description: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Actions: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
};
