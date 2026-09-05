import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthPage } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PasswordField } from '../../molecules/PasswordField/PasswordField';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';

const HINT = 'Al menos 8 caracteres, con una letra minúscula, una letra mayúscula, un número y un símbolo: ! @ # $ % ^ & * ( ) - _ = + [ ] { } ; : , . ?';

interface Args { step: 'pedir' | 'enviado' | 'restablecer'; surface: 'light' | 'dark' }

function Recuperar({ step, surface }: Args) {
  if (step === 'restablecer') {
    return (
      <AuthPage title="Restablece tu contraseña" description="Ingresa tu nueva contraseña." surface={surface}>
        <Form
          size="lg"
          blockActions
          onSubmit={(e) => e.preventDefault()}
          actions={<Button variant="primary" type="submit">Restablecer contraseña</Button>}
          links={<Link href="#acceso" icon="arrow-left">Volver al inicio de sesión</Link>}
        >
          <PasswordField id="reset-password" label="Nueva contraseña" labelHidden={false} autoComplete="new-password" helperText={HINT} />
          <PasswordField id="reset-password-confirm" label="Confirmar contraseña" labelHidden={false} autoComplete="new-password" />
        </Form>
      </AuthPage>
    );
  }
  return (
    <AuthPage
      title="¿Olvidaste tu contraseña?"
      description="Ingresa tu correo y te enviaremos un enlace para restablecerla."
      aside={<Link href="#acceso" icon="arrow-left">Volver al inicio de sesión</Link>}
      surface={surface}
    >
      {step === 'enviado' ? (
        // Enviado, el formulario desaparece entero: pedir otra vez el enlace
        // desde la misma pantalla no lleva a ningún sitio.
        <Form size="lg" success="Si existe una cuenta con ese correo, recibirás un enlace para restablecer tu contraseña." />
      ) : (
        <Form
          size="lg"
          blockActions
          onSubmit={(e) => e.preventDefault()}
          actions={<Button variant="primary" type="submit">Enviar enlace</Button>}
        >
          <InputField id="forgot-password-email" label="Correo electrónico" type="email" autoComplete="email" placeholder="Escribe tu correo electrónico" />
        </Form>
      )}
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
