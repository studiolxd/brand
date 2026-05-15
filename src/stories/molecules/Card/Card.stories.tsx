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
      options: ['accent-1', 'accent-2', 'support-1', 'support-2'],
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

export const Accent1: Story = {
  args: {
    color: 'accent-1',
    title: 'Contenidos elearning',
    description: 'Diseñamos contenidos multimedia interactivos para formación online, utilizando estándares como SCORM y xAPI.',
    ctaLabel: 'Ver más sobre contenidos elearning',
  },
};

export const Accent2: Story = {
  args: {
    color: 'accent-2',
    title: 'Plataformas elearning',
    description: 'Desarrollamos plataformas elearning adaptadas a tu identidad visual y centradas en las personas usuarias para lograr una experiencia de aprendizaje gratificante.',
    ctaLabel: 'Ver más sobre plataformas elearning',
  },
};

export const Support1: Story = {
  args: {
    color: 'support-1',
    title: 'Título de ejemplo',
    description: 'Descripción de ejemplo para la variante support-1 (emerald).',
    ctaLabel: 'Ver más',
  },
};

export const Support2: Story = {
  args: {
    color: 'support-2',
    title: 'Título de ejemplo',
    description: 'Descripción de ejemplo para la variante support-2 (cayenne).',
    ctaLabel: 'Ver más',
  },
};
