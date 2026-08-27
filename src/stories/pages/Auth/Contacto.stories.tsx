import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthPage, Captcha } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { TextareaField } from '../../molecules/TextareaField/TextareaField';
import { Button } from '../../atoms/Button/Button';
import { Alert, AlertDescription } from '../../molecules/Alert/Alert';

interface Args { captcha: boolean; sent: boolean; fieldError: boolean; surface: 'light' | 'dark' }

function Contacto({ captcha, sent, fieldError, surface }: Args) {
  return (
    <AuthPage title="Contacto" description="¿Tienes alguna pregunta? Envíanos un mensaje." surface={surface}>
      {sent ? (
        <Form size="lg" onSubmit={(e) => e.preventDefault()}>
          <Alert role="status"><AlertDescription>Gracias — tu mensaje se ha enviado.</AlertDescription></Alert>
        </Form>
      ) : (
        <Form
          size="lg"
          blockActions
          onSubmit={(e) => e.preventDefault()}
          captcha={captcha ? <Captcha /> : undefined}
          actions={<Button variant="primary" type="submit">Enviar mensaje</Button>}
        >
          <InputField id="contacto-nombre" label="Nombre" autoComplete="name" />
          <InputField id="contacto-email" label="Correo electrónico" type="email" autoComplete="email" errorMessage={fieldError ? 'Introduce una dirección de correo válida.' : undefined} />
          <TextareaField id="contacto-mensaje" label="Mensaje" rows={5} />
        </Form>
      )}
    </AuthPage>
  );
}

const meta: Meta<typeof Contacto> = {
  title: 'Pages/Contacto',
  component: Contacto,
  parameters: { layout: 'fullscreen' },
  args: { captcha: false, sent: false, fieldError: false, surface: 'light' },
  argTypes: { surface: { control: { type: 'radio' }, options: ['light', 'dark'] } },
};
export default meta;
type Story = StoryObj<typeof Contacto>;

/** `/contact` de hub: nombre, correo y mensaje, con la acción en bloque. */
export const PorDefecto: Story = {};
export const ConCaptchaYError: Story = { args: { captcha: true, fieldError: true } };
export const Enviado: Story = { args: { sent: true } };
