import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Organisms/LoginForm',
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
