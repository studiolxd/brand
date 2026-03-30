import type { Meta, StoryObj } from '@storybook/react-vite';
import { MethodologySection } from './MethodologySection';

export const steps = [
  { text: 'Preguntamos para conocer vuestras necesidades.' },
  { text: 'Colaboramos con vuestro equipo quienes tienen el know how de la organización.' },
  { text: 'Asesoramos sobre las mejores soluciones.' },
  { text: 'Acompañamos hasta implementar la solución.' },
];

const meta: Meta<typeof MethodologySection> = {
  title: 'Sections/MethodologySection',
  excludeStories: /^[a-z]/,
  component: MethodologySection,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    intro: 'Te acompañamos durante todo el proceso',
    ctaLabel: 'Descubre cómo trabajamos',
    ctaHref: '#',
    steps,
  },
};

export default meta;
type Story = StoryObj<typeof MethodologySection>;

export const Default: Story = {};

export const Dark: Story = {
  decorators: [(Story) => <div className="dark"><Story /></div>],
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
