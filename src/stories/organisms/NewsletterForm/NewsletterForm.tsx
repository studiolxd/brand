import './NewsletterForm.css';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { CheckboxField } from '../../molecules/CheckboxField/CheckboxField';
import { Button } from '../../atoms/Button/Button';

interface NewsletterFormProps {
  emailPlaceholder?: string;
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

export function NewsletterForm({
  emailPlaceholder = 'Escribe aquí tu correo electrónico',
  privacyLabel,
  buttonLabel = 'Suscríbeme a la newsletter',
  submitting = false,
  submittingLabel = 'Suscribiéndote…',
  errors,
  success = false,
  successMessage = '¡Gracias por suscribirte! Ya no te perderás ninguna de nuestras novedades.',
  dark = false,
  onSubmit,
}: NewsletterFormProps) {
  if (success) {
    return (
      <p className={['form__success', dark ? 'form__success--dark' : ''].filter(Boolean).join(' ')}>
        {successMessage}
      </p>
    );
  }

  return (
    <div className={['newsletter-form', dark ? 'newsletter-form--dark' : ''].filter(Boolean).join(' ')}>
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
          id="newsletter-email"
          label="Email"
          labelHidden
          type="email"
          placeholder={emailPlaceholder}
          disabled={submitting}
          dark={dark}
        />
        <CheckboxField
          id="newsletter-privacy"
          label={privacyLabel}
          disabled={submitting}
          dark={dark}
        />
      </Form>
    </div>
  );
}
