import type { Meta, StoryObj } from '@storybook/react-vite';
import { MethodologySection } from './MethodologySection';
import { steps } from '../../data/home';

const meta: Meta<typeof MethodologySection> = {
  title: 'Sections/MethodologySection',
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
