import './ContactSection.css';
import { ContactForm } from '../../organisms/ContactForm/ContactForm';
type ContactFormProps = React.ComponentPropsWithoutRef<typeof ContactForm>;
interface ContactSectionProps {
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
export declare function ContactSection({ title, form, whatsappTitle, whatsappLabel, whatsappHref, }: ContactSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
