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

export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };
