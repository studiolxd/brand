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
  onSubmit,
}: NewsletterFormProps) {
  if (success) {
    return (
      <p className="form__success">
        {successMessage}
      </p>
    );
  }

  return (
    <div className="newsletter-form">
      <Form
        errors={errors}
        onSubmit={onSubmit}
        actions={
          <Button variant="form" type="submit" disabled={submitting}>
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
        />
        <CheckboxField
          id="newsletter-privacy"
          label={privacyLabel}
          disabled={submitting}
        />
      </Form>
      <div className="newsletter-form__spacer" />
    </div>
  );
}
