import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
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
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};
