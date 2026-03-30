import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardSplit } from './CardSplit';

const image = {
  src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&fit=crop',
  alt: 'Equipo trabajando en una sesión formativa',
};

const meta: Meta<typeof CardSplit> = {
  title: 'Molecules/CardSplit',
  component: CardSplit,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['secondary', 'tertiary', 'quaternary', 'quinary'],
      description: 'Color del panel izquierdo.',
    },
  },
  args: {
    href: '#',
    image,
    title: 'Formación presencial',
    description: 'Diseñamos talleres y sesiones formativas centradas en la práctica, adaptadas a las necesidades reales de tu equipo.',
    ctaLabel: 'Ver más sobre formación presencial',
  },
};

export default meta;
type Story = StoryObj<typeof CardSplit>;

export const Secondary: Story = { args: { color: 'secondary' } };
export const Tertiary: Story = { args: { color: 'tertiary' } };
export const Quaternary: Story = { args: { color: 'quaternary' } };
export const Quinary: Story = { args: { color: 'quinary' } };
