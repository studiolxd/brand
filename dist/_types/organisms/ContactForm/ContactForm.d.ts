import './ContactForm.css';
interface ContactFormProps {
    emailPlaceholder?: string;
    messagePlaceholder?: string;
    messageRows?: number;
    privacyLabel: React.ReactNode;
    buttonLabel?: string;
    submitting?: boolean;
    submittingLabel?: string;
    errors?: string[];
    success?: boolean;
    successMessage?: string;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
}
export declare function ContactForm({ emailPlaceholder, messagePlaceholder, messageRows, privacyLabel, buttonLabel, submitting, submittingLabel, errors, success, successMessage, onSubmit, }: ContactFormProps): import("react/jsx-runtime").JSX.Element;
export {};
