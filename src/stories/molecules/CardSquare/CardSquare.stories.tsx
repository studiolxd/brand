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
      options: ['secondary', 'tertiary', 'quaternary', 'quinary'],
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

export const Secondary: Story = { args: { color: 'secondary' } };
export const Tertiary: Story = { args: { color: 'tertiary' } };
export const Quaternary: Story = { args: { color: 'quaternary' } };
export const Quinary: Story = { args: { color: 'quinary' } };
