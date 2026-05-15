import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardSquare } from './CardSquare';

const image = {
  src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&fit=crop',
  alt: 'Personas trabajando en equipo',
};

const meta: Meta<typeof CardSquare> = {
  title: 'Molecules/CardSquare',
  component: CardSquare,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['accent-1', 'accent-2', 'support-1', 'support-2'],
      description: 'Color del overlay al hacer hover.',
    },
  },
  args: {
    href: '#',
    image,
    title: 'Diseño instruccional',
    description: 'Creamos experiencias de aprendizaje que combinan pedagogía, diseño y tecnología para transformar la formación.',
    ctaLabel: 'Ver más sobre diseño instruccional',
  },
};

export default meta;
type Story = StoryObj<typeof CardSquare>;

export const Accent1: Story = { args: { color: 'accent-1' } };
export const Accent2: Story = { args: { color: 'accent-2' } };
export const Support1: Story = { args: { color: 'support-1' } };
export const Support2: Story = { args: { color: 'support-2' } };
