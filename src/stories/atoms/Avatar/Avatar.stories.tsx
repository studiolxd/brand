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
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
      description: 'Forma del avatar.',
    },
    src: {
      control: { type: 'text' },
      description: 'URL de la imagen. Si se omite, se muestran iniciales.',
    },
    alt: {
      control: { type: 'text' },
      description: 'Texto alternativo para la imagen.',
    },
    name: {
      control: { type: 'text' },
      description: 'Nombre completo — genera las iniciales como fallback.',
    },
    className: { table: { disable: true } },
  },
  args: {
    src: 'https://i.pravatar.cc/120?img=47',
    alt: 'Ana García',
    size: 'md',
    shape: 'circle',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Sm: Story = { args: { size: 'sm' } };
export const Md: Story = { args: { size: 'md' } };
export const Lg: Story = { args: { size: 'lg' } };
export const Xl: Story = { args: { size: 'xl' } };

export const Iniciales: Story = {
  args: { src: undefined, name: 'Ana García', alt: undefined },
};

export const InicialesNombreSimple: Story = {
  args: { src: undefined, name: 'Alejandro', alt: undefined },
};

export const InicialesSquare: Story = {
  args: { src: undefined, name: 'Studio LXD', alt: undefined, shape: 'square' },
};

export const Square: Story = {
  args: {
    src: 'https://placehold.co/120x120/1a2b4a/ffffff?text=S',
    shape: 'square',
  },
};
