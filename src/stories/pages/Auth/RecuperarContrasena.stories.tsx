import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthPage } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PasswordField } from '../../molecules/PasswordField/PasswordField';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { Alert, AlertDescription } from '../../molecules/Alert/Alert';

interface Args { step: 'pedir' | 'enviado' | 'restablecer'; surface: 'light' | 'dark' }

function Recuperar({ step, surface }: Args) {
  if (step === 'restablecer') {
    return (
      <AuthPage title="Nueva contraseña" description="Elige una contraseña nueva para tu cuenta." surface={surface}>
        <Form size="lg" onSubmit={(e) => e.preventDefault()} actions={<Button variant="primary" type="submit">Guardar contraseña</Button>}>
          <PasswordField id="reset-password" label="Nueva contraseña" labelHidden={false} autoComplete="new-password" helperText="Al menos 8 caracteres, con una letra minúscula, una letra mayúscula, un número y un símbolo." />
          <PasswordField id="reset-confirm" label="Repite la contraseña" labelHidden={false} autoComplete="new-password" />
        </Form>
      </AuthPage>
    );
  }
  return (
    <AuthPage title="¿Olvidaste tu contraseña?" description="Ingresa tu correo y te enviaremos un enlace para restablecerla." surface={surface}>
      <Form
        size="lg"
        onSubmit={(e) => e.preventDefault()}
        actions={step === 'pedir' ? <Button variant="primary" type="submit">Enviar enlace</Button> : undefined}
        links={<Link href="#acceso">Volver a iniciar sesión</Link>}
      >
        {step === 'pedir' ? (
          <InputField id="recuperar-email" label="Correo electrónico" type="email" autoComplete="email" />
        ) : (
          <Alert variant="success" role="status"><AlertDescription>Si existe una cuenta con ese correo, te hemos enviado un enlace para restablecer la contraseña.</AlertDescription></Alert>
        )}
      </Form>
    </AuthPage>
  );
}

const meta: Meta<typeof Recuperar> = {
  title: 'Pages/Recuperar contraseña',
  component: Recuperar,
  parameters: { layout: 'fullscreen' },
  args: { step: 'pedir', surface: 'light' },
  argTypes: {
    step: { control: { type: 'radio' }, options: ['pedir', 'enviado', 'restablecer'], description: 'Pedir el enlace, enlace enviado, o restablecer desde el enlace (`/reset-password`).' },
    surface: { control: { type: 'radio' }, options: ['light', 'dark'] },
  },
};
export default meta;
type Story = StoryObj<typeof Recuperar>;

/** `/forgot-password`: título, frase y el correo. */
export const Pedir: Story = {};
export const Enviado: Story = { args: { step: 'enviado' } };
/** `/reset-password`: la nueva contraseña, dos veces. */
export const Restablecer: Story = { args: { step: 'restablecer' } };
export const SuperficieOscura: Story = { args: { surface: 'dark' } };
export const EnMovil: Story = { globals: { viewport: { value: 'mobile1' } } };
