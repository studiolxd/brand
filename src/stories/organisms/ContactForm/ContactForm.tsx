import { useState } from 'react';
import './ContactForm.css';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { TextareaField } from '../../molecules/TextareaField/TextareaField';
import { CheckboxField } from '../../molecules/CheckboxField/CheckboxField';
import { InputPhoneField } from '../../molecules/InputPhoneField/InputPhoneField';
import { Button } from '../../atoms/Button/Button';

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

export function ContactForm({
  emailLabel = 'Email',
  emailPlaceholder = 'Escribe aquí tu correo electrónico',
  messageLabel = 'Mensaje',
  messagePlaceholder = 'Escribe aquí tu mensaje',
  messageRows = 5,
  wantCallLabel = 'Prefiero que me llaméis por teléfono',
  phoneLabel = 'Teléfono',
  phonePlaceholder = 'Escribe aquí tu número de teléfono',
  phoneHelper = 'Solo utilizaremos tu número de teléfono para hablarte sobre este proyecto.',
  privacyLabel,
  buttonLabel = 'Enviar mensaje',
  submitting = false,
  submittingLabel = 'Enviando…',
  errors,
  success = false,
  successMessage = '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.',
  onSubmit,
}: ContactFormProps) {
  const [wantCall, setWantCall] = useState(false);

  if (success) {
    return (
      <p className="form__success">
        {successMessage}
      </p>
    );
  }

  return (
    <Form
      errors={errors}
      onSubmit={onSubmit}
      actions={
        <Button variant="form" disabled={submitting}>
          {submitting ? submittingLabel : buttonLabel}
        </Button>
      }
    >
      <InputField
        id="contact-email"
        label={emailLabel}
        labelHidden
        type="email"
        placeholder={emailPlaceholder}
        disabled={submitting}
      />
      <TextareaField
        id="contact-message"
        label={messageLabel}
        labelHidden
        placeholder={messagePlaceholder}
        rows={messageRows}
        disabled={submitting}
      />
      <CheckboxField
        id="contact-phone"
        label={wantCallLabel}
        disabled={submitting}
        checked={wantCall}
        onCheckedChange={(checked) => setWantCall(checked === true)}
      />
      {wantCall && (
        <InputPhoneField
          id="contact-phone-number"
          label={phoneLabel}
          labelHidden
          placeholder={phonePlaceholder}
          helperText={phoneHelper}
          disabled={submitting}
        />
      )}
      <CheckboxField
        id="contact-privacy"
        label={privacyLabel}
        disabled={submitting}
      />
    </Form>
  );
}
