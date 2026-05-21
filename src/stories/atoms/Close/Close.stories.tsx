import type { Meta, StoryObj } from '@storybook/react-vite';
import { Close } from './Close';

const meta: Meta<typeof Close> = {
  title: 'Atoms/Close',
  component: Close,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del icono de cierre.',
    },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Close>;

export const Default: Story = {};

export const ExtraSmall: Story = { args: { size: 'xs' } };
export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };
export const ExtraLarge: Story = { args: { size: 'xl' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Close size="xs" />
      <Close size="sm" />
      <Close size="md" />
      <Close size="lg" />
      <Close size="xl" />
    </div>
  ),
};
