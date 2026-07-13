import './Toast.css';
export interface ToasterProps {
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center';
    /** Tema del toaster, para sincronizar con el tema de la app (p. ej. next-themes). */
    theme?: 'light' | 'dark' | 'system';
    /** aria-label del contenedor de notificaciones (i18n). */
    containerAriaLabel?: string;
}
export declare function Toaster({ position, theme, containerAriaLabel }: ToasterProps): import("react/jsx-runtime").JSX.Element;
