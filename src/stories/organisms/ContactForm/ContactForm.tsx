import './ContactForm.css';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { TextareaField } from '../../molecules/TextareaField/TextareaField';
import { CheckboxField } from '../../molecules/CheckboxField/CheckboxField';
import { Button } from '../../atoms/Button/Button';

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
  dark?: boolean;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export function ContactForm({
  emailPlaceholder = 'Escribe aquí tu correo electrónico',
  messagePlaceholder = 'Escribe aquí tu mensaje',
  messageRows = 5,
  privacyLabel,
  buttonLabel = 'Enviar mensaje',
  submitting = false,
  submittingLabel = 'Enviando…',
  errors,
  success = false,
  successMessage = '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.',
  dark = false,
  onSubmit,
}: ContactFormProps) {
  if (success) {
    return (
      <p className={['form__success', dark ? 'form__success--dark' : ''].filter(Boolean).join(' ')}>
        {successMessage}
      </p>
    );
  }

  return (
    <Form
      errors={errors}
      dark={dark}
      onSubmit={onSubmit}
      actions={
        <Button variant="form" disabled={submitting}>
          {submitting ? submittingLabel : buttonLabel}
        </Button>
      }
    >
      <InputField
        id="contact-email"
        label="Email"
        labelHidden
        type="email"
        placeholder={emailPlaceholder}
        disabled={submitting}
        dark={dark}
      />
      <TextareaField
        id="contact-message"
        label="Mensaje"
        labelHidden
        placeholder={messagePlaceholder}
        rows={messageRows}
        disabled={submitting}
        dark={dark}
      />
      <CheckboxField
        id="contact-privacy"
        label={privacyLabel}
        disabled={submitting}
        dark={dark}
      />
    </Form>
  );
}
