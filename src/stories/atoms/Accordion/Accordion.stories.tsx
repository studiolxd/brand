import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Atoms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>¿Qué es el diseño instruccional?</AccordionTrigger>
        <AccordionContent>
          El diseño instruccional es el proceso sistemático de crear experiencias de aprendizaje
          efectivas. Combina principios de pedagogía, psicología y diseño para facilitar la
          adquisición de conocimientos y habilidades.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>¿Qué herramientas utilizáis?</AccordionTrigger>
        <AccordionContent>
          Trabajamos con Articulate Storyline, Articulate Rise, y plataformas LMS como Moodle
          y Canvas. Adaptamos la herramienta al proyecto y sus necesidades específicas.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>¿Cuánto dura un proyecto típico?</AccordionTrigger>
        <AccordionContent>
          Depende del alcance, pero un curso e-learning estándar suele llevar entre 4 y 8 semanas
          desde el diseño hasta la entrega final.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Contenidos e-learning</AccordionTrigger>
        <AccordionContent>
          Diseñamos contenidos multimedia interactivos para formación online, utilizando
          estándares como SCORM y xAPI.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Plataformas e-learning</AccordionTrigger>
        <AccordionContent>
          Desarrollamos plataformas e-learning adaptadas a tu identidad visual y centradas
          en las personas usuarias.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Consultoría</AccordionTrigger>
        <AccordionContent>
          Acompañamos a tu equipo en la definición de una estrategia de aprendizaje
          alineada con el plan de negocio.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
