import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Por revisar/Atoms/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    label: { control: { type: 'text' } },
  },
  args: { size: 'md', label: 'Cargando…' },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const EnContextoOscuro: Story = {
  name: 'En contexto oscuro',
  decorators: [
    (Story) => (
      <div
        className="surface-dark"
        style={{ padding: '2rem', background: 'var(--color-background-dark)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '2rem' }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </>
  ),
};

/** Test: rol y anuncio accesible; el contorno es un `<rect>` sin radio con `pathLength="100"`. */
export const Accesibilidad: Story = {
  name: 'Test — rol, label y contorno cuadrado',
  tags: ['!dev'],
  args: { label: 'Guardando…' },
  play: async ({ canvasElement }) => {
    const status = within(canvasElement).getByRole('status');
    await expect(status).toHaveAttribute('aria-label', 'Guardando…');
    const rect = status.querySelector('rect.spinner__stroke');
    await expect(rect).not.toBeNull();
    await expect(rect).toHaveAttribute('pathLength', '100');
    await expect(rect).not.toHaveAttribute('rx');
  },
};

/** Test: decorativo — sin rol ni texto anunciado. */
export const Decorativo: Story = {
  name: 'Test — aria-hidden',
  tags: ['!dev'],
  args: { 'aria-hidden': true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole('status')).toBeNull();
    await expect(canvasElement.querySelector('.spinner')).toHaveAttribute('aria-hidden', 'true');
  },
};
