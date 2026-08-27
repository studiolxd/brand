import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { AuthPage, SocialButtons, Captcha } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';
import { PasswordField } from '../../molecules/PasswordField/PasswordField';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';

interface Args {
  socialProviders: string[];
  magicLink: boolean;
  captcha: boolean;
  signupOpen: boolean;
  serverError: boolean;
  surface: 'light' | 'dark';
}

function Acceso({ socialProviders, magicLink, captcha, signupOpen, serverError, surface }: Args) {
  return (
    <AuthPage title="Inicia sesión" description={signupOpen ? <>¿No tienes una cuenta? <Link href="#registro">Regístrate</Link></> : undefined} surface={surface}>
      <Form
        size="lg"
        onSubmit={(e) => e.preventDefault()}
        errors={serverError ? ['No hemos podido iniciar sesión. Comprueba el correo y la contraseña.'] : undefined}
        captcha={captcha ? <Captcha /> : undefined}
        actions={<Button variant="primary" type="submit">{magicLink ? 'Enviar enlace' : 'Entrar'}</Button>}
        alternativesLabel={socialProviders.length ? 'O continúa con' : undefined}
        alternatives={socialProviders.length ? <SocialButtons providers={socialProviders} /> : undefined}
      >
        <InputField id="acceso-email" label="Correo electrónico" type="email" autoComplete="email" />
        {!magicLink && (
          <PasswordField
            id="acceso-password"
            label="Contraseña"
            labelHidden={false}
            autoComplete="current-password"
            action={<Link href="#recuperar">¿Olvidaste tu contraseña?</Link>}
          />
        )}
      </Form>
    </AuthPage>
  );
}

const meta: Meta<typeof Acceso> = {
  title: 'Pages/Acceso',
  component: Acceso,
  parameters: { layout: 'fullscreen' },
  args: { socialProviders: [], magicLink: false, captcha: false, signupOpen: true, serverError: false, surface: 'light' },
  argTypes: {
    socialProviders: { control: { type: 'check' }, options: ['google', 'github', 'keycloak'], description: 'Proveedores de acceso con terceros (van en `alternatives`).' },
    magicLink: { description: 'Acceso por enlace mágico: sin contraseña.' },
    captcha: { description: 'Turnstile activo (ranura `captcha` del Form).' },
    signupOpen: { description: 'Registro abierto: enlace «Regístrate».' },
    serverError: { description: 'El error del servidor en `errors` del Form.' },
    surface: { control: { type: 'radio' }, options: ['light', 'dark'] },
  },
};
export default meta;
type Story = StoryObj<typeof Acceso>;

/** Correo y contraseña, registro abierto. Es `/sign-in` de hub con piezas del DS. */
export const PorDefecto: Story = {};
/** Con Google y GitHub, captcha y error del servidor: todo lo que puede aparecer. */
export const Completa: Story = { args: { socialProviders: ['google', 'github'], captcha: true, serverError: true } };
export const EnlaceMagico: Story = { args: { magicLink: true } };
export const SuperficieOscura: Story = { args: { ...Completa.args, surface: 'dark' } };
export const EnMovil: Story = { args: Completa.args, globals: { viewport: { value: 'mobile1' } } };

export const Contrato: Story = {
  name: 'Test — un h1, main-content, bloques del formulario',
  tags: ['!dev'],
  args: Completa.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    await expect(canvasElement.querySelector('main#main-content')).not.toBeNull();
    await expect(canvas.getByRole('button', { name: 'Google' })).toHaveClass('button--lg');
    await expect(canvas.getByRole('link', { name: '¿Olvidaste tu contraseña?' })).toBeInTheDocument();
    await expect(canvas.getByRole('alert').textContent).toContain('No hemos podido');
  },
};
