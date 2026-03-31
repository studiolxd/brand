import type { Meta, StoryObj } from '@storybook/react-vite';
import { CoursesSection } from './CoursesSection';

const squareCards = [
  {
    href: '#diseno-instruccional',
    title: 'Diseño instruccional',
    description: 'Creamos experiencias de aprendizaje que combinan pedagogía, diseño y tecnología para transformar la formación.',
    ctaLabel: 'Ver más sobre diseño instruccional',
    color: 'secondary' as const,
    image: {
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&fit=crop',
      alt: 'Personas trabajando en equipo',
    },
  },
  {
    href: '#elearning',
    title: 'Producción eLearning',
    description: 'Producimos cursos interactivos y multimedia adaptados a cualquier plataforma LMS.',
    ctaLabel: 'Ver más sobre producción eLearning',
    color: 'tertiary' as const,
    image: {
      src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80&fit=crop',
      alt: 'Pantalla con contenido digital',
    },
  },
];

const splitCards = [
  {
    href: '#formacion-presencial',
    title: 'Formación presencial',
    description: 'Diseñamos talleres y sesiones formativas centradas en la práctica, adaptadas a las necesidades reales de tu equipo.',
    ctaLabel: 'Ver más sobre formación presencial',
    color: 'quaternary' as const,
    image: {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&fit=crop',
      alt: 'Equipo trabajando en una sesión formativa',
    },
  },
];

const meta: Meta<typeof CoursesSection> = {
  title: 'Sections/CoursesSection',
  component: CoursesSection,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    squareCards,
    splitCards,
  },
};

export default meta;
type Story = StoryObj<typeof CoursesSection>;

export const Default: Story = {};
