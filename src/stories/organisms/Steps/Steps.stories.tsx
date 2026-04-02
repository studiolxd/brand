import type { Meta, StoryObj } from '@storybook/react-vite';
import { Steps } from './Steps';

const meta: Meta<typeof Steps> = {
  title: 'Organisms/Steps',
  component: Steps,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const FourSteps: Story = {
  args: {
    steps: [
      { text: 'Preguntamos para conocer vuestras necesidades.' },
      { text: 'Colaboramos con vuestro equipo quienes tienen el know how de la organización.' },
      { text: 'Asesoramos sobre las mejores soluciones.' },
      { text: 'Acompañamos hasta implementar la solución.' },
    ],
  },
};

export const SevenSteps: Story = {
  args: {
    steps: [
      { text: 'Escuchamos y analizamos vuestras necesidades formativas.' },
      { text: 'Investigamos el contexto: audiencia, objetivos y restricciones.' },
      { text: 'Diseñamos la estrategia pedagógica y el plan de contenidos.' },
      { text: 'Desarrollamos los materiales y experiencias de aprendizaje.' },
      { text: 'Pilotamos con un grupo reducido y recogemos feedback.' },
      { text: 'Iteramos y ajustamos según los resultados del piloto.' },
      { text: 'Desplegamos la solución y acompañamos en la adopción.' },
    ],
  },
};
