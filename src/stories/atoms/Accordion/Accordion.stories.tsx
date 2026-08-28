import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Atoms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
      options: ['single', 'multiple'],
      description: 'Un ítem abierto a la vez (`single`) o varios (`multiple`).',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita todos los ítems.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const preguntas = (
  <>
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
        Trabajamos con Articulate Storyline, Articulate Rise y plataformas LMS como Moodle
        y Canvas. Adaptamos la herramienta al proyecto y a sus necesidades específicas.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>¿Cuánto dura un proyecto típico?</AccordionTrigger>
      <AccordionContent>
        Depende del alcance, pero un curso e-learning estándar suele llevar entre 4 y 8 semanas
        desde el diseño hasta la entrega final.
      </AccordionContent>
    </AccordionItem>
  </>
);

/** Un solo ítem abierto a la vez; el abierto puede cerrarse (`collapsible`, por defecto). */
export const PorDefecto: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-1">
      {preguntas}
    </Accordion>
  ),
};

/** Varios ítems abiertos a la vez. */
export const Multiple: Story = {
  name: 'Múltiple',
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Contenidos e-learning</AccordionTrigger>
        <AccordionContent>
          Diseñamos contenidos multimedia interactivos para formación online, con estándares
          como SCORM y xAPI.
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

/** Un ítem deshabilitado no abre ni recibe foco de teclado. */
export const Deshabilitado: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Disponible</AccordionTrigger>
        <AccordionContent>Este ítem abre y cierra con normalidad.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>No disponible</AccordionTrigger>
        <AccordionContent>Este contenido no llega a mostrarse.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/** Sobre superficie oscura el separador y el anillo de foco pasan a blanco por token. */
export const SuperficieOscura: Story = {
  name: 'Superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <Accordion type="single" defaultValue="item-1">
      {preguntas}
    </Accordion>
  ),
};

/** Test: patrón WAI-ARIA — el disparador es un botón dentro de un heading, con
 *  `aria-expanded` y `aria-controls` al panel `role="region"`. */
export const Contrato: Story = {
  name: 'Test — contrato ARIA y apertura',
  tags: ['!dev'],
  render: () => (
    <Accordion type="single" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Primero</AccordionTrigger>
        <AccordionContent>Contenido del primero</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Segundo</AccordionTrigger>
        <AccordionContent>Contenido del segundo</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const primero = canvas.getByRole('button', { name: 'Primero' });
    const segundo = canvas.getByRole('button', { name: 'Segundo' });

    await expect(primero).toHaveAttribute('aria-expanded', 'true');
    await expect(segundo).toHaveAttribute('aria-expanded', 'false');
    await expect(primero.closest('.accordion__header')?.tagName).toBe('H3');

    const panelId = primero.getAttribute('aria-controls');
    await expect(panelId).toBeTruthy();
    await expect(canvasElement.querySelector(`#${panelId}`)).toHaveAttribute('role', 'region');

    await userEvent.click(segundo);
    await expect(segundo).toHaveAttribute('aria-expanded', 'true');
    await expect(primero).toHaveAttribute('aria-expanded', 'false');
  },
};

/** Test: un ítem deshabilitado no responde a la pulsación. */
export const ContratoDeshabilitado: Story = {
  name: 'Test — ítem deshabilitado',
  tags: ['!dev'],
  render: () => (
    <Accordion type="single">
      <AccordionItem value="item-1" disabled>
        <AccordionTrigger>No disponible</AccordionTrigger>
        <AccordionContent>Contenido</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'No disponible' });
    await expect(trigger).toBeDisabled();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

/**
 * Numerado: cada apartado enseña su posición delante del rótulo. El número lo
 * pone el acordeón por el orden de los ítems — es la maqueta del acordeón
 * legal, donde cada apartado es una cláusula.
 */
export const Numerado: Story = {
  render: () => (
    <Accordion type="single" numbered defaultValue="objeto">
      <AccordionItem value="objeto">
        <AccordionTrigger>Objeto del contrato</AccordionTrigger>
        <AccordionContent>
          El presente contrato regula la prestación de los servicios descritos en el anexo I.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="duracion">
        <AccordionTrigger>Duración y prórroga</AccordionTrigger>
        <AccordionContent>
          La duración inicial es de doce meses, prorrogables por periodos iguales.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="precio">
        <AccordionTrigger>Precio y forma de pago</AccordionTrigger>
        <AccordionContent>
          El precio se abonará mensualmente, dentro de los treinta días siguientes a la factura.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/** `formatIndex` cambia cómo se escribe el número: aquí, cláusulas romanas. */
export const NumeracionPropia: Story = {
  name: 'Numeración propia',
  render: () => (
    <Accordion type="single" numbered formatIndex={(i) => `${i}.`}>
      <AccordionItem value="uno">
        <AccordionTrigger>Objeto del contrato</AccordionTrigger>
        <AccordionContent>Contenido.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="dos">
        <AccordionTrigger>Duración y prórroga</AccordionTrigger>
        <AccordionContent>Contenido.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/** Test: el número sale del orden, entra en el nombre del disparador y se puede formatear. */
export const ContratoNumeracion: Story = {
  name: 'Test — la ranura de índice numera por orden',
  tags: ['!dev'],
  render: () => (
    <>
      <Accordion type="single" numbered>
        <AccordionItem value="a">
          <AccordionTrigger>Objeto del contrato</AccordionTrigger>
          <AccordionContent>Contenido A.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Duración</AccordionTrigger>
          <AccordionContent>Contenido B.</AccordionContent>
        </AccordionItem>
      </Accordion>
      <div data-testid="sin-numerar">
        <Accordion type="single">
          <AccordionItem value="a">
            <AccordionTrigger>Sin número</AccordionTrigger>
            <AccordionContent>Contenido.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Dos cifras con cero delante, por orden de los ítems.
    const indices = [...canvasElement.querySelectorAll('.accordion__index')].map((n) => n.textContent);
    await expect(indices).toEqual(['01', '02']);

    // El número es parte del rótulo, igual que se lee en pantalla.
    await expect(
      canvas.getByRole('button', { name: '01 Objeto del contrato' }),
    ).toBeInTheDocument();

    // Sin `numbered` no hay ranura de índice.
    const sinNumerar = canvasElement.querySelector('[data-testid="sin-numerar"]')!;
    await expect(sinNumerar.querySelector('.accordion__index')).toBeNull();
    await expect(sinNumerar.querySelector('.accordion')).not.toHaveClass('accordion--numbered');
  },
};
