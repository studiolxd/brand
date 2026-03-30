import type { Meta, StoryObj } from '@storybook/react-vite';
import { SolutionsSection } from './SolutionsSection';

const meta: Meta<typeof SolutionsSection> = {
  title: 'Sections/SolutionsSection',
  excludeStories: /^[a-z]/,
  component: SolutionsSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SolutionsSection>;

export const solutionItems = [
  {
    href: '#',
    color: 'secondary' as const,
    title: 'Contenidos elearning',
    description: 'Diseñamos contenidos multimedia interactivos para formación online, utilizando estándares como SCORM y xAPI.',
    ctaLabel: 'Ver más sobre contenidos elearning',
  },
  {
    href: '#',
    color: 'tertiary' as const,
    title: 'Plataformas elearning',
    description: 'Desarrollamos plataformas elearning adaptadas a tu identidad visual y centradas en las personas usuarias para lograr una experiencia de aprendizaje gratificante.',
    ctaLabel: 'Ver más sobre plataformas elearning',
  },
];

export const Default: Story = {
  args: {
    items: solutionItems,
  },
};
