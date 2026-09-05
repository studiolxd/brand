import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthPage, SocialButtons } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PasswordField } from '../../molecules/PasswordField/PasswordField';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';

interface Args { state: 'sin-sesion' | 'con-sesion' | 'invalida' | 'registro-cerrado'; socialProviders: string[]; surface: 'light' | 'dark' }

const HINT = 'Al menos 8 caracteres, con una letra minúscula, una letra mayúscula, un número y un símbolo: ! @ # $ % ^ & * ( ) - _ = + [ ] { } ; : , . ?';

const DESCRIPCION = 'ana@studiolxd.com te ha invitado a unirte a Studio LXD. Te unirás como miembro.';

function Invitacion({ state, socialProviders, surface }: Args) {
  if (state === 'invalida') {
    return (
      <AuthPage
        title="Invitación no disponible"
        description="Esta invitación no es válida, ha caducado o se envió a otra dirección de correo."
        aside={<Link href="#acceso" icon="arrow-left">Volver al inicio de sesión</Link>}
        surface={surface}
      >
        <Form size="lg" blockActions actions={<Button variant="primary" href="#registro">Crear cuenta</Button>} />
      </AuthPage>
    );
  }
  if (state === 'registro-cerrado') {
    return (
      <AuthPage
        title="Tienes una invitación"
        description="El registro está deshabilitado actualmente. Si ya tienes una cuenta, inicia sesión para aceptar esta invitación."
        aside={<Link href="#acceso" icon="arrow-left">Volver al inicio de sesión</Link>}
        surface={surface}
      >
        {null}
      </AuthPage>
    );
  }
  if (state === 'con-sesion') {
    return (
      <AuthPage title="Tienes una invitación" description={DESCRIPCION} surface={surface}>
        <Form size="lg" blockActions onSubmit={(e) => e.preventDefault()} actions={<><Button variant="outline">Rechazar</Button><Button variant="primary">Aceptar invitación</Button></>} />
      </AuthPage>
    );
  }
  return (
    <AuthPage title="Tienes una invitación" description={DESCRIPCION} surface={surface}>
      <Form
        size="lg"
        blockActions
        onSubmit={(e) => e.preventDefault()}
        actions={<Button variant="primary" type="submit">Crear cuenta</Button>}
        alternativesLabel={socialProviders.length ? 'O continúa con' : undefined}
        alternatives={socialProviders.length ? <SocialButtons providers={socialProviders} /> : undefined}
      >
        {/* El correo lo fija la invitación: se ve, pero no se toca. */}
        <InputField id="invitation-email" label="Correo electrónico" type="email" value="invitada@studiolxd.com" readOnly disabled />
        <PasswordField id="invitation-password" label="Contraseña" labelHidden={false} autoComplete="new-password" helperText={HINT} />
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

