import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
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
