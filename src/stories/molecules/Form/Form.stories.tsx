import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from './Form';
import { InputField } from '../InputField/InputField';
import { TextareaField } from '../TextareaField/TextareaField';
import { CheckboxField } from '../CheckboxField/CheckboxField';
import { InputPhoneField } from '../InputPhoneField/InputPhoneField';
import { PasswordField } from '../PasswordField/PasswordField';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Form> = {
  title: 'Molecules/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    errors: {
      control: { type: 'object' },
      description: 'Lista de mensajes de error agrupados, mostrados sobre las acciones.',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof Form>;

const privacyLabel = (
  <>He leído y acepto la <a href="/privacidad">política de privacidad</a>.</>
);

export const Default: Story = {
  args: {
    actions: <Button variant="primary">Enviar</Button>,
    children: (
      <InputField id="form-email" label="Email" labelHidden placeholder="tu@email.com" />
    ),
  },
};

export const Success: Story = {
  name: 'Success',
  render: () => <p className="form__success">¡Mensaje enviado! Nos pondremos en contacto contigo pronto.</p>,
};

export const WithErrors: Story = {
  args: {
    errors: ['No se ha podido enviar el formulario. Por favor, inténtalo de nuevo más tarde.'],
    actions: <Button variant="primary">Enviar</Button>,
    children: (
      <>
        <InputField
          id="form-name-error"
          label="Nombre"
          labelHidden={false}
          placeholder="Tu nombre"
          error
          errorMessage="El nombre es obligatorio."
        />
        <InputField
          id="form-email-error"
          label="Email"
          labelHidden={false}
          type="email"
          placeholder="tu@email.com"
          error
          errorMessage="Introduce un email válido."
        />
        <CheckboxField
          id="form-privacy-error"
          label={privacyLabel}
        />
      </>
    ),
  },
};

/* ─── Ejemplos de composición ─────────────────────────────── */

export const ContactFormExample: Story = {
  name: 'Ejemplo: ContactForm',
  render: () => {
    const [wantCall, setWantCall] = useState(false);
    return (
      <Form
        actions={<Button variant="primary" type="submit">Enviar mensaje</Button>}
      >
        <InputField id="ex-contact-email" label="Email" labelHidden type="email" placeholder="Escribe aquí tu correo electrónico" />
        <TextareaField id="ex-contact-message" label="Mensaje" labelHidden placeholder="Escribe aquí tu mensaje" rows={5} />
        <CheckboxField
          id="ex-contact-phone"
          label="Prefiero que me llaméis por teléfono"
          checked={wantCall}
          onCheckedChange={(checked) => setWantCall(checked === true)}
        />
        {wantCall && (
          <InputPhoneField
            id="ex-contact-phone-number"
            label="Teléfono"
            labelHidden
            placeholder="Escribe aquí tu número de teléfono"
            helperText="Solo utilizaremos tu número de teléfono para hablarte sobre este proyecto."
          />
        )}
        <CheckboxField id="ex-contact-privacy" label={privacyLabel} />
      </Form>
    );
  },
};

export const LoginFormExample: Story = {
  name: 'Ejemplo: LoginForm',
  render: () => (
    <Form
      actions={<Button variant="primary" type="submit" block>Iniciar sesión</Button>}
    >
      <InputField id="ex-login-email" label="Email" labelHidden={false} type="email" placeholder="tu@email.com" />
      <PasswordField id="ex-login-password" label="Contraseña" labelHidden={false} placeholder="Tu contraseña" />
      <CheckboxField id="ex-login-remember" label="Mantener la sesión iniciada" />
    </Form>
  ),
};

export const LoginFormWithErrorsExample: Story = {
  name: 'Ejemplo: LoginForm con errores',
  render: () => (
    <Form
      errors={['Las credenciales introducidas no son correctas.']}
      actions={<Button variant="primary" type="submit" block>Iniciar sesión</Button>}
    >
      <InputField
        id="ex-login-error-email"
        label="Email"
        labelHidden={false}
        type="email"
        placeholder="tu@email.com"
        error
        errorMessage="Introduce un email válido."
      />
      <PasswordField
        id="ex-login-error-password"
        label="Contraseña"
        labelHidden={false}
        placeholder="Tu contraseña"
        error
        errorMessage="La contraseña no puede estar vacía."
      />
      <CheckboxField id="ex-login-error-remember" label="Mantener la sesión iniciada" />
    </Form>
  ),
};

export const NewsletterFormExample: Story = {
  name: 'Ejemplo: NewsletterForm',
  render: () => (
    <Form
      actions={<Button variant="primary" type="submit">Suscríbeme a la newsletter</Button>}
    >
      <InputField id="ex-newsletter-email" label="Email" labelHidden type="email" placeholder="Escribe aquí tu correo electrónico" />
      <CheckboxField id="ex-newsletter-privacy" label={privacyLabel} />
    </Form>
  ),
};
