import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chevron } from './Chevron';

const meta: Meta<typeof Chevron> = {
  title: 'Atoms/Chevron',
  component: Chevron,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del chevron.',
    },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Chevron>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Chevron size="sm" />
      <Chevron size="md" />
      <Chevron size="lg" />
    </div>
  ),
};
