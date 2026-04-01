import type { Meta, StoryObj } from '@storybook/react-vite';
import { Article } from './Article';

const meta: Meta<typeof Article> = {
  title: 'Templates/Article',
  component: Article,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Article>;

export const Default: Story = {
  args: {
    category: 'E-learning',
    tagVariant: 'secondary',
    photo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80&fit=crop',
    title: 'Onboarding digital para Randstad',
    description:
      'Diseñamos un itinerario de incorporación 100% online para 1.200 nuevos empleados al año. Redujimos el tiempo de onboarding de tres semanas a cinco días sin perder calidad de aprendizaje.',
    sections: [
      {
        title: 'El reto',
        body: 'Randstad incorpora más de 1.200 personas al año en sus distintas líneas de negocio. El proceso de onboarding era heterogéneo, dependía del responsable de cada área y se prolongaba entre dos y tres semanas. El objetivo era crear un itinerario común, coherente con la cultura de la empresa y escalable sin necesidad de aumentar el equipo de formación.',
      },
      {
        title: 'Nuestra aproximación',
        body: 'Comenzamos con un análisis de necesidades en profundidad: entrevistas a personas recién incorporadas, a sus managers y al equipo de People. Identificamos los conocimientos, habilidades y actitudes clave para que alguien pudiera ser operativo en los primeros cinco días. A partir de ahí, diseñamos un itinerario modular en cuatro bloques: cultura y valores, procesos internos, herramientas de trabajo y conocimiento del negocio. Cada módulo combina microlearning, vídeos cortos y actividades de aplicación práctica.',
      },
      {
        title: 'Producción e integración',
        body: 'Desarrollamos los contenidos en Articulate Storyline 360 e integramos el itinerario en el LMS corporativo con automatización de matrículas vinculada al sistema de RRHH. Los nuevos empleados reciben acceso el primer día con una hoja de ruta personalizada según su área de negocio.',
      },
      {
        title: 'Resultados',
        body: 'El tiempo medio de onboarding pasó de 18 días a 5 días. La valoración del proceso por parte de los nuevos empleados subió de un 6,2 a un 8,7 sobre 10. El equipo de People liberó más de 200 horas al año que antes dedicaban a sesiones presenciales de inducción.',
      },
    ],
  },
};
