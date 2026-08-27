import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthPage, SocialButtons } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PasswordField } from '../../molecules/PasswordField/PasswordField';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';

interface Args { state: 'sin-sesion' | 'con-sesion' | 'invalida' | 'registro-cerrado'; socialProviders: string[]; surface: 'light' | 'dark' }

const ROL = <Paragraph>Te unirás como miembro.</Paragraph>;

function Invitacion({ state, socialProviders, surface }: Args) {
  if (state === 'invalida') {
    return (
      <AuthPage title="Invitación no disponible" description="Esta invitación no es válida, ha caducado o se envió a otra dirección de correo." surface={surface}>
        <Form size="lg" links={<><Link href="#acceso">Iniciar sesión</Link><Link href="#registro">Crear cuenta</Link></>} />
      </AuthPage>
    );
  }
  if (state === 'registro-cerrado') {
    return (
      <AuthPage title="Tienes una invitación" description="El registro está deshabilitado actualmente. Si ya tienes una cuenta, inicia sesión para aceptar esta invitación." surface={surface}>
        <Form size="lg" links={<Link href="#acceso">Iniciar sesión</Link>} />
      </AuthPage>
    );
  }
  if (state === 'con-sesion') {
    return (
      <AuthPage title="Tienes una invitación" description="ana@studiolxd.com te ha invitado a unirte a Studio LXD." intro={ROL} surface={surface}>
        <Form size="lg" onSubmit={(e) => e.preventDefault()} actions={<><Button variant="outline">Rechazar</Button><Button variant="primary">Aceptar invitación</Button></>} />
      </AuthPage>
    );
  }
  return (
    <AuthPage title="Tienes una invitación" description="ana@studiolxd.com te ha invitado a unirte a Studio LXD." intro={ROL} surface={surface}>
      <Form
        size="lg"
        onSubmit={(e) => e.preventDefault()}
        actions={<Button variant="primary" type="submit">Crear cuenta y unirme</Button>}
        alternativesLabel={socialProviders.length ? 'O continúa con' : undefined}
        alternatives={socialProviders.length ? <SocialButtons providers={socialProviders} /> : undefined}
      >
        <InputField id="inv-email" label="Correo electrónico" type="email" value="invitada@studiolxd.com" readOnly />
        <InputField id="inv-name" label="Nombre completo" autoComplete="name" />
        <PasswordField id="inv-password" label="Contraseña" labelHidden={false} autoComplete="new-password" helperText="Al menos 8 caracteres, con una letra minúscula, una letra mayúscula, un número y un símbolo." />
      </Form>
    </AuthPage>
  );
}

const meta: Meta<typeof Invitacion> = {
  title: 'Pages/Aceptar invitación',
  component: Invitacion,
  parameters: { layout: 'fullscreen' },
  args: { state: 'sin-sesion', socialProviders: [], surface: 'light' },
  argTypes: {
    state: { control: { type: 'radio' }, options: ['sin-sesion', 'con-sesion', 'invalida', 'registro-cerrado'], description: 'Los cuatro estados de `/accept-invitation`.' },
    socialProviders: { control: { type: 'check' }, options: ['google', 'github', 'keycloak'] },
    surface: { control: { type: 'radio' }, options: ['light', 'dark'] },
  },
};
export default meta;
type Story = StoryObj<typeof Invitacion>;

/** Sin sesión: registro con el correo de la invitación fijado. */
export const SinSesion: Story = {};
export const ConSesion: Story = { args: { state: 'con-sesion' } };
export const Invalida: Story = { args: { state: 'invalida' } };
export const RegistroCerrado: Story = { args: { state: 'registro-cerrado' } };
export const SuperficieOscura: Story = { args: { state: 'con-sesion', surface: 'dark' } };
