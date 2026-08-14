import './LoginForm.css';
export interface LoginFormProps {
    onSubmit?: (data: {
        email: string;
        password: string;
    }) => void;
    errors?: string[];
    loading?: boolean;
    title?: string;
    /** Etiqueta del campo de email. Default: "Email" */
    emailLabel?: string;
    /**
     * Etiqueta del campo de contraseña. Default: "Contraseña" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    passwordLabel?: string;
    /** Texto del botón de envío. Default: "Iniciar sesión" (castellano). */
    submitLabel?: string;
    /** Texto del botón mientras `loading`. Default: "Iniciando sesión…" (castellano). */
    loadingLabel?: string;
}
export declare function LoginForm({ onSubmit, errors, loading, title, emailLabel, passwordLabel, submitLabel, loadingLabel, }: LoginFormProps): import("react/jsx-runtime").JSX.Element;
