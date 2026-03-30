import type { Meta, StoryObj } from '@storybook/react-vite';
import { Arrow } from './Arrow';

const meta: Meta<typeof Arrow> = {
  title: 'Atoms/Arrow',
  component: Arrow,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de la flecha.',
    },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Arrow>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Arrow size="sm" />
      <Arrow size="md" />
      <Arrow size="lg" />
    </div>
  ),
};
