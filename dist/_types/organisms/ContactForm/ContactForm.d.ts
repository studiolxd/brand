import './ContactForm.css';
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
export declare const ContactForm: import("react").ForwardRefExoticComponent<ContactFormProps & import("react").RefAttributes<HTMLFormElement>>;
export {};
