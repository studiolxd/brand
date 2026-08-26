import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Por revisar/Organisms/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const WithErrors: Story = {
  args: {
    errors: ['Credenciales incorrectas. Comprueba tu email y contraseña.'],
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

/**
 * Test: las etiquetas del formulario usan el castellano por defecto.
 *
 * Va en una story aparte de la traducida porque `LoginForm` usa ids fijos
 * (`login-email`, `login-password`): dos instancias a la vez colisionarían y
 * los `<label for>` apuntarían todos al primer formulario.
 */
export const EtiquetasPorDefecto: Story = {
  name: 'Test — etiquetas por defecto (castellano)',
  tags: ['!dev'],
  render: () => <LoginForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Contraseña')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument();
  },
};

/**
 * Test: las etiquetas pasadas por el consumidor sustituyen a las de por defecto.
 */
export const EtiquetasTraducidas: Story = {
  name: 'Test — etiquetas traducidas',
  tags: ['!dev'],
  render: () => (
    <LoginForm
      title="Sign in"
      emailLabel="Email address"
      passwordLabel="Password"
      submitLabel="Sign in"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Password')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Email address')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    await expect(canvas.queryByLabelText('Contraseña')).toBeNull();
  },
};
