import type { Meta, StoryObj } from '@storybook/react-vite';
import { CoursesSection } from './CoursesSection';
import { CardSquare } from '../../molecules/CardSquare/CardSquare';
import { CardSplit } from '../../molecules/CardSplit/CardSplit';

const meta: Meta<typeof CoursesSection> = {
  title: 'Sections/CoursesSection',
  component: CoursesSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CoursesSection>;

export const Default: Story = {
  render: (args) => (
    <CoursesSection {...args}>
      <CardSquare
        href="#"
        color="secondary"
        image={{ src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fit=crop', alt: '' }}
        title="Articulate Storyline"
        description="Crea contenidos elearning interactivos."
        ctaLabel="Ver más sobre el curso"
      />
      <CardSquare
        href="#"
        color="tertiary"
        image={{ src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&fit=crop', alt: '' }}
        title="Articulate Rise"
        description="Domina Rise para crear contenidos elearning responsive."
        ctaLabel="Ver más sobre el curso"
      />
      <CardSplit
        href="#"
        color="quaternary"
        image={{ src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&fit=crop', alt: '' }}
        title="Diseño instruccional para elearning"
        description="Crea experiencias de aprendizaje online transformadoras."
        ctaLabel="Ver más sobre el curso"
      />
      <CardSplit
        href="#"
        color="quinary"
        image={{ src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&fit=crop', alt: '' }}
        title="Iniciación a JavaScript para Storyline"
        description="Lleva al siguiente nivel la interactividad de tus contenidos elearning con JavaScript."
        ctaLabel="Ver más sobre el curso"
      />
    </CoursesSection>
  ),
};
