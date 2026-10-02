import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ScrollArea } from './ScrollArea';
import { Paragraph } from '../Paragraph/Paragraph';
import { Stack } from '../Stack/Stack';

const meta: Meta<typeof ScrollArea> = {
  title: 'Atoms/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: { type: 'inline-radio' }, options: ['vertical', 'horizontal', 'both'] },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const parrafos = Array.from({ length: 8 }, (_, i) => (
  <Paragraph key={i}>
    Apartado {i + 1}. El diseño instruccional parte de los objetivos de aprendizaje y decide
    a partir de ellos las actividades, los materiales y la evaluación.
  </Paragraph>
));

/** El alto lo pone quien lo usa; el componente solo se ocupa del desplazamiento. */
export const PorDefecto: Story = {
  render: () => (
    <ScrollArea label="Condiciones del servicio" style={{ blockSize: '12rem', maxInlineSize: '32rem' }}>
      <Stack>{parrafos}</Stack>
    </ScrollArea>
  ),
};

/** `both` para contenido que también se sale de ancho. */
export const HorizontalYVertical: Story = {
  render: () => (
    <ScrollArea orientation="both" label="Registro de la consulta" style={{ blockSize: '10rem', maxInlineSize: '32rem' }}>
      <div style={{ inlineSize: '60rem' }}>
        <Stack>{parrafos}</Stack>
      </div>
    </ScrollArea>
  ),
};

export const TestRegion: Story = {
  name: 'Test — con label es una región anunciable',
  tags: ['!dev'],
  render: () => (
    <ScrollArea label="Condiciones del servicio" style={{ blockSize: '8rem', maxInlineSize: '24rem' }}>
      <Stack>{parrafos}</Stack>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('region', { name: 'Condiciones del servicio' })).toBeInTheDocument();
  },
};

/** La barra se ve de verdad: con el puntero encima, opaca y alcanzable. */
const barraVisible = (barra: Element) => {
  const estilo = getComputedStyle(barra);
  return estilo.visibility !== 'hidden' && estilo.opacity === '1' && estilo.pointerEvents !== 'none';
};

export const TestSinDesbordamiento: Story = {
  name: 'Test — sin desbordamiento la barra no se ve nunca',
  tags: ['!dev'],
  render: () => (
    <ScrollArea label="Poco contenido" style={{ blockSize: '12rem', maxInlineSize: '24rem' }}>
      <Paragraph>Una sola línea: no hay nada que desplazar.</Paragraph>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByRole('region', { name: 'Poco contenido' });
    await userEvent.hover(region);
    const barra = canvasElement.querySelector('.scroll-area__scrollbar');
    await expect(barra).not.toBeNull();
    await waitFor(() => expect(barra).toHaveAttribute('data-hovering'));
    await expect(barra).not.toHaveAttribute('data-has-overflow-y');
    await expect(barraVisible(barra!)).toBe(false);
  },
};

export const TestConDesbordamiento: Story = {
  name: 'Test — con desbordamiento la barra se ve al hacer hover',
  tags: ['!dev'],
  render: () => (
    <ScrollArea label="Mucho contenido" style={{ blockSize: '8rem', maxInlineSize: '24rem' }}>
      <Stack>{parrafos}</Stack>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = await canvas.findByRole('region', { name: 'Mucho contenido' });
    // La medida del desbordamiento llega tras la primera maqueta: se espera.
    await waitFor(async () => {
      await userEvent.hover(region);
      const barra = canvasElement.querySelector('.scroll-area__scrollbar');
      await expect(barra).toHaveAttribute('data-has-overflow-y');
      await expect(barraVisible(barra!)).toBe(true);
    });
  },
};
