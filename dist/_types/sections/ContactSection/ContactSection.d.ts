import './ContactSection.css';
interface ContactFormProps {
    emailLabel?: string;
    emailPlaceholder?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    messageRows?: number;
    wantCallLabel?: string;
    phoneLabel?: string;
    phonePlaceholder?: string;
    phoneHelper?: string;
    privacyLabel: React.ReactNode;
    buttonLabel?: string;
    submitting?: boolean;
    submittingLabel?: string;
    errors?: string[];
    success?: boolean;
    successMessage?: string;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
}
interface ContactSectionProps {
    id?: string;
    /** Título del bloque de contacto. */
    title: string;
    /** Props del formulario de contacto. */
    form: ContactFormProps;
    /** Título del bloque de WhatsApp. */
    whatsappTitle: string;
    /** Texto del enlace de WhatsApp. */
    whatsappLabel: string;
    /** URL del enlace de WhatsApp. */
    whatsappHref: string;
}
export declare function ContactSection({ id, title, form, whatsappTitle, whatsappLabel, whatsappHref, }: ContactSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
