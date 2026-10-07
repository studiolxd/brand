import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { AuthPage } from './AuthPage';
import { Form } from '../../molecules/Form/Form';
import { Link } from '../../atoms/Link/Link';
import { SOLO_OSCURO } from '../../utils/chromaticModes';

const AVISO = 'Revisa tu correo para encontrar el enlace de acceso.';

interface Args {
  /** Registro abierto: la frase con el enlace bajo el título. */
  signupOpen: boolean;
  surface: 'light' | 'dark';
}

/**
 * Lo que queda de `/sign-in` después de pedir un enlace mágico: el formulario
 * desaparece —ya no hay nada que rellenar— y en su sitio queda el aviso.
 *
 * El título de la página no cambia: sigue siendo el del acceso. Es el mismo
 * paso, contado desde el otro lado.
 */
function EnlaceMagico({ signupOpen, surface }: Args) {
  return (
    <AuthPage
      title="Inicia sesión"
      description={signupOpen ? <>¿No tienes una cuenta? <Link href="#registro">Regístrate</Link></> : undefined}
      surface={surface}
    >
      {/* Como «Recuperar contraseña» enviado: el formulario desaparece entero
          y en su sitio queda el aviso del propio `Form`, solo texto — sin
          caja. El rol es `status`, que anuncia sin interrumpir. */}
      <Form size="lg" success={AVISO} />
    </AuthPage>
  );
}

const meta: Meta<typeof EnlaceMagico> = {
  title: 'Pages/Enlace mágico enviado',
  component: EnlaceMagico,
  parameters: { layout: 'fullscreen' },
  args: { signupOpen: true, surface: 'light' },
  argTypes: {
    signupOpen: { description: 'Registro abierto: enlace «Regístrate» bajo el título.' },
    surface: { control: { type: 'radio' }, options: ['light', 'dark'] },
  },
};
export default meta;
type Story = StoryObj<typeof EnlaceMagico>;

/** El aviso en el sitio del formulario. */
export const PorDefecto: Story = {};

/** Con el registro cerrado no hay nada que ofrecer bajo el título. */
export const RegistroCerrado: Story = { name: 'Registro cerrado', args: { signupOpen: false } };

/** La prop `surface` de `AuthPage`: la página pinta su propia banda oscura y
 *  el conmutador de tema la acompaña. No hace falta `parameters.surface`. */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { chromatic: SOLO_OSCURO },
  args: { surface: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — un h1, el aviso anunciado y ningún campo',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    await expect(canvasElement.querySelector('main#main-content')).not.toBeNull();
    // Anuncia sin interrumpir: es información, no un error.
    await expect(canvas.getByRole('status').textContent).toContain(AVISO);
    // El aviso es el `success` del propio Form: sin campos ni acciones.
    await expect(canvasElement.querySelector('.form__fields')).toBeNull();
    await expect(canvasElement.querySelector('.form__success')).not.toBeNull();
  },
};
