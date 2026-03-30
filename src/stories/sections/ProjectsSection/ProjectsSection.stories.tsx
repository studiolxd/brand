import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectsSection } from './ProjectsSection';

const meta: Meta<typeof ProjectsSection> = {
  title: 'Secciones/ProjectsSection',
  excludeStories: /^[a-z]/,
  component: ProjectsSection,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ProjectsSection>;

export const projects = [
  {
    id: 'onboarding-randstad',
    category: 'E-learning',
    tagVariant: 'secondary' as const,
    photo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fit=crop',
    title: 'Onboarding digital para Randstad',
    description: 'Diseñamos un itinerario de incorporación 100% online para 1.200 nuevos empleados al año.',
  },
  {
    id: 'liderazgo-retail',
    category: 'Formación presencial',
    tagVariant: 'tertiary' as const,
    photo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&fit=crop',
    title: 'Taller de liderazgo para mandos intermedios',
    description: 'Programa presencial de tres módulos para 80 responsables de equipo de una empresa del sector retail.',
  },
  {
    id: 'catalogo-grupo-mayo',
    category: 'Diseño instruccional',
    tagVariant: 'quaternary' as const,
    photo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&fit=crop',
    title: 'Rediseño del catálogo formativo de Grupo Mayo',
    description: 'Auditamos y rediseñamos desde cero un catálogo de 40 cursos desactualizados.',
  },
  {
    id: 'moodle-junta-andalucia',
    category: 'Plataformas LMS',
    tagVariant: 'quinary' as const,
    photo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&fit=crop',
    title: 'Implantación de Moodle para la Junta de Andalucía',
    description: 'Configuramos y personalizamos una instancia de Moodle para 15.000 usuarios.',
  },
  {
    id: 'estrategia-linkup',
    category: 'Consultoría',
    tagVariant: 'primary' as const,
    photo: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&fit=crop',
    title: 'Estrategia L&D para Linkup Coaching',
    description: 'Acompañamos a su equipo en la definición de una estrategia de aprendizaje alineada con el plan de negocio.',
  },
  {
    id: 'compliance-elearning',
    category: 'E-learning',
    tagVariant: 'secondary' as const,
    photo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&fit=crop',
    title: 'Curso de compliance y prevención de riesgos',
    description: 'Módulo e-learning con escenarios de decisión ramificados para garantizar la comprensión real de la normativa.',
  },
  {
    id: 'guia-formadores-sawy',
    category: 'Diseño instruccional',
    tagVariant: 'quaternary' as const,
    photo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&fit=crop',
    title: 'Guía didáctica para formadores internos de Sawy',
    description: 'Creamos una guía metodológica para que el equipo interno pudiera replicar y actualizar los contenidos.',
  },
  {
    id: 'migracion-lms',
    category: 'Plataformas LMS',
    tagVariant: 'quinary' as const,
    photo: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80&fit=crop',
    title: 'Migración de TalentLMS a Canvas',
    description: 'Gestionamos la migración completa de contenidos, usuarios y datos históricos.',
  },
];

export const Default: Story = {
  args: {
    title: 'Proyectos',
    projects,
  },
};
