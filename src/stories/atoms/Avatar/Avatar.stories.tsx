import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Talla del avatar.',
    },
    src: {
      control: { type: 'text' },
      description: 'URL de la imagen.',
    },
    alt: {
      control: { type: 'text' },
      description: 'Texto alternativo accesible.',
    },
    className: { table: { disable: true } },
  },
  args: {
    src: 'https://i.pravatar.cc/120?img=47',
    alt: 'Ana García',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Sm: Story = { args: { size: 'sm' } };
export const Md: Story = { args: { size: 'md' } };
export const Lg: Story = { args: { size: 'lg' } };
export const Xl: Story = { args: { size: 'xl' } };
