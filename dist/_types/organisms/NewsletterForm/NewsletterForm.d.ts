import './NewsletterForm.css';
interface NewsletterFormProps {
    emailPlaceholder?: string;
    privacyLabel: React.ReactNode;
    buttonLabel?: string;
    submitting?: boolean;
    submittingLabel?: string;
    errors?: string[];
    success?: boolean;
    successMessage?: string;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
}
export declare function NewsletterForm({ emailPlaceholder, privacyLabel, buttonLabel, submitting, submittingLabel, errors, success, successMessage, onSubmit, }: NewsletterFormProps): import("react/jsx-runtime").JSX.Element;
export {};
