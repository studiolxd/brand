import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewsSection } from './ReviewsSection';

const meta: Meta<typeof ReviewsSection> = {
  title: 'Secciones/ReviewsSection',
  excludeStories: /^[a-z]/,
  component: ReviewsSection,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ReviewsSection>;

export const reviews = [
  {
    id: 'ana-garcia',
    photo: 'https://i.pravatar.cc/120?img=47',
    author: 'Ana García',
    role: 'Diseñadora instruccional',
    quote: 'El curso cambió completamente mi forma de diseñar formaciones. Ahora entiendo la pedagogía detrás de cada decisión.',
  },
  {
    id: 'carlos-martinez',
    photo: 'https://i.pravatar.cc/120?img=12',
    author: 'Carlos Martínez',
    role: 'Responsable de formación',
    quote: 'Muy práctico y directo al grano. Aprendí más en unas semanas que en años de prueba y error por mi cuenta.',
  },
  {
    id: 'laura-sanchez',
    photo: 'https://i.pravatar.cc/120?img=32',
    author: 'Laura Sánchez',
    role: 'Técnica de RRHH',
    quote: 'El acompañamiento del equipo de Studio LXD durante todo el proceso fue clave. No me sentí sola en ningún momento.',
  },
  {
    id: 'miguel-torres',
    photo: 'https://i.pravatar.cc/120?img=68',
    author: 'Miguel Torres',
    role: 'Consultor de e-learning',
    quote: 'Herramientas reales, casos reales. Exactamente lo que necesitaba para dar el salto profesional que buscaba.',
  },
  {
    id: 'sofia-ruiz',
    photo: 'https://i.pravatar.cc/120?img=5',
    author: 'Sofía Ruiz',
    role: 'Coordinadora de formación',
    quote: 'El enfoque centrado en el aprendizaje me ayudó a replantear todos mis proyectos. Una visión totalmente nueva.',
  },
  {
    id: 'pablo-jimenez',
    photo: 'https://i.pravatar.cc/120?img=15',
    author: 'Pablo Jiménez',
    role: 'Desarrollador instruccional',
    quote: 'Muy buena relación entre teoría y práctica. Pude aplicar lo aprendido desde el primer módulo en mi trabajo diario.',
  },
  {
    id: 'elena-moreno',
    photo: 'https://i.pravatar.cc/120?img=9',
    author: 'Elena Moreno',
    role: 'Formadora corporativa',
    quote: 'El programa me dio el marco conceptual que me faltaba. Ahora diseño con mucha más seguridad y criterio.',
  },
  {
    id: 'david-lopez',
    photo: 'https://i.pravatar.cc/120?img=53',
    author: 'David López',
    role: 'Técnico de formación',
    quote: 'Superó mis expectativas. El contenido está muy bien estructurado y el equipo resuelve dudas con rapidez y claridad.',
  },
];

export const Default: Story = {
  args: {
    title: 'Lo que dice nuestro alumnado',
    reviews,
  },
};
