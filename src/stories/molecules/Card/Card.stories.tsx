import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['secondary', 'tertiary', 'quaternary', 'quinary'],
      description: 'Color de fondo.',
    },
  },
  args: {
    href: '#',
    ctaLabel: 'Ver más',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Secondary: Story = {
  args: {
    color: 'secondary',
    title: 'Contenidos elearning',
    description: 'Diseñamos contenidos multimedia interactivos para formación online, utilizando estándares como SCORM y xAPI.',
    ctaLabel: 'Ver más sobre contenidos elearning',
  },
};

export const Tertiary: Story = {
  args: {
    color: 'tertiary',
    title: 'Plataformas elearning',
    description: 'Desarrollamos plataformas elearning adaptadas a tu identidad visual y centradas en las personas usuarias para lograr una experiencia de aprendizaje gratificante.',
    ctaLabel: 'Ver más sobre plataformas elearning',
  },
};

export const Quaternary: Story = {
  args: {
    color: 'quaternary',
    title: 'Título de ejemplo',
    description: 'Descripción de ejemplo para la variante quaternary (emerald).',
    ctaLabel: 'Ver más',
  },
};

export const Quinary: Story = {
  args: {
    color: 'quinary',
    title: 'Título de ejemplo',
    description: 'Descripción de ejemplo para la variante quinary (cayenne).',
    ctaLabel: 'Ver más',
  },
};
