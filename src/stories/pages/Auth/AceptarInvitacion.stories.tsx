import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { AuthPage, SocialButtons } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PasswordField } from '../../molecules/PasswordField/PasswordField';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';

interface Args {
  state: 'sin-sesion' | 'con-sesion' | 'invalida' | 'invalida-con-sesion' | 'registro-cerrado';
  socialProviders: string[];
  surface: 'light' | 'dark';
}

const HINT = 'Al menos 8 caracteres, con una letra minúscula, una letra mayúscula, un número y un símbolo: ! @ # $ % ^ & * ( ) - _ = + [ ] { } ; : , . ?';

const DESCRIPCION = 'ana@studiolxd.com te ha invitado a unirte a Studio LXD. Te unirás como miembro.';

const NO_DISPONIBLE = 'Esta invitación no es válida, ha caducado o se envió a otra dirección de correo.';

function Invitacion({ state, socialProviders, surface }: Args) {
  if (state === 'invalida') {
    return (
      <AuthPage
        title="Invitación no disponible"
        description={NO_DISPONIBLE}
        aside={<Link href="#acceso" icon="arrow-left">Volver al inicio de sesión</Link>}
        surface={surface}
      >
        <Form size="lg" blockActions actions={<Button variant="primary" href="#registro">Crear cuenta</Button>} />
      </AuthPage>
    );
  }
  if (state === 'invalida-con-sesion') {
    // Con sesión iniciada no hay «volver al inicio de sesión» que ofrecer: ya
    // se entró. Lo que falta no es la cuenta, es la invitación, así que la
    // pantalla dice con quién se entró —por si la invitación iba a otra
    // dirección, que es la mitad de los casos— y deja una sola salida, al
    // panel. Va en `links` y no en `actions`: no es una acción del paso, es la
    // manera de irse de una pantalla que ya no tiene nada que hacer.
    return (
      <AuthPage
        title="Invitación no disponible"
        description={NO_DISPONIBLE}
        intro={<Paragraph>Has iniciado sesión como ana@studiolxd.com.</Paragraph>}
        surface={surface}
      >
        <Form size="lg" links={<Link href="#panel">Ir al panel</Link>} />
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
    state: { control: { type: 'radio' }, options: ['sin-sesion', 'con-sesion', 'invalida', 'invalida-con-sesion', 'registro-cerrado'], description: 'Los cinco estados de `/accept-invitation`.' },
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

/**
 * La misma invitación caída, pero con sesión ya iniciada: no hay a dónde
 * «volver a iniciar sesión», así que la pantalla dice con qué cuenta se entró y
 * la única salida es el panel.
 */
export const InvalidaConSesion: Story = { name: 'Inválida con sesión', args: { state: 'invalida-con-sesion' } };

export const RegistroCerrado: Story = { args: { state: 'registro-cerrado' } };

export const ContratoInvalidaConSesion: Story = {
  name: 'Test — con sesión, ni formulario ni vuelta al acceso: solo el panel',
  tags: ['!dev'],
  args: { state: 'invalida-con-sesion' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    await expect(canvas.getByRole('heading', { level: 1 }).textContent).toBe('Invitación no disponible');
    await expect(canvasElement.querySelector('main#main-content')).not.toBeNull();
    await expect(canvas.getByText('Has iniciado sesión como ana@studiolxd.com.')).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'Ir al panel' })).toBeInTheDocument();
    await expect(canvas.queryByRole('link', { name: 'Volver al inicio de sesión' })).toBeNull();
    // Un `Form` sin campos ni acciones: solo la salida.
    await expect(canvasElement.querySelector('.form__actions')).toBeNull();
    await expect(canvasElement.querySelector('input')).toBeNull();
  },
};

