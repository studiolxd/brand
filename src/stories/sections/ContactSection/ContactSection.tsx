import './ContactSection.css';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
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

export function ContactSection({
  title,
  form,
  whatsappTitle,
  whatsappLabel,
  whatsappHref,
}: ContactSectionProps) {
  return (
    <section
      className="contact-section"
    >
      <div className="contact-section__left">
        <div className="contact-section__intro">
          <Heading level={2} weight="semibold">{title}</Heading>
        </div>
        <aside className="contact-section__cta">
          <Heading level={3}>{whatsappTitle}</Heading>
          <Button href={whatsappHref} variant="primary" external>{whatsappLabel}</Button>
        </aside>
      </div>
      <div className="contact-section__form">
        <ContactForm {...form} />
      </div>
    </section>
  );
}
