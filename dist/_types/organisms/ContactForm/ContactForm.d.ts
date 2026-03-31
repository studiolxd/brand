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
export declare function ContactForm({ emailLabel, emailPlaceholder, messageLabel, messagePlaceholder, messageRows, wantCallLabel, phoneLabel, phonePlaceholder, phoneHelper, privacyLabel, buttonLabel, submitting, submittingLabel, errors, success, successMessage, onSubmit, }: ContactFormProps): import("react/jsx-runtime").JSX.Element;
export {};
