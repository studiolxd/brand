import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { PageIntro } from './PageIntro';

const meta: Meta<typeof PageIntro> = {
  title: 'Molecules/PageIntro',
  component: PageIntro,
  parameters: { layout: 'padded' },
  args: { title: '¿Olvidaste tu contraseña?', description: 'Ingresa tu correo y te enviaremos un enlace para restablecerla.' },
  argTypes: { className: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof PageIntro>;

/** Título y frase. */
export const ConFrase: Story = {};

/** Solo el título: el aire lo sigue poniendo el molde de fuera. */
export const SoloTitulo: Story = { args: { title: 'Inicia sesión', description: undefined } };

export const Contrato: Story = {
  name: 'Test — header con h1 y frase opcional',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvasElement.querySelector('header.page-intro')!;
    await expect(header).toBeInTheDocument();
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent('¿Olvidaste tu contraseña?');
    await expect(canvas.getByText(/Ingresa tu correo/)).toBeInTheDocument();
  },
};
