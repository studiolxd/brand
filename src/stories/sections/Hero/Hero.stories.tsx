import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Hero } from './Hero';
import { Button } from '../../atoms/Button/Button';
import { Container } from '../../atoms/Container/Container';

const meta: Meta<typeof Hero> = {
  title: 'Sections/Hero',
  component: Hero,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Aprender es lo primero',
    description: 'La suite de Studio LXD para diseñar, impartir y gestionar formación: un solo acceso, una sola marca.',
    actions: <Button size="lg" href="#empezar">Empezar</Button>,
  },
  argTypes: { className: { table: { disable: true } }, id: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof Hero>;

/** Título, frase y un botón. */
export const PorDefecto: Story = {};

/** Solo el título: sin frase ni acciones, el aire de la banda no cambia. */
export const SoloTitulo: Story = { args: { description: undefined, actions: undefined } };

/** Varios botones: en fila, y en móvil pasan a la línea siguiente. */
export const VariasAcciones: Story = {
  args: {
    actions: (
      <>
        <Button size="lg" href="#empezar">Empezar</Button>
        <Button size="lg" variant="outline" href="#saber-mas">Saber más</Button>
      </>
    ),
  },
};

/** Sobre superficie oscura (`parameters.surface = 'dark'`): la sección no pinta fondo; el lienzo y el color los pone la superficie. */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: VariasAcciones.args,
};

/**
 * A sangre: la portada se cuelga de la página sin envoltorio. Trae su propio
 * aire vertical y su `Container` interior para el lateral, así que se ve igual
 * aquí que dentro de una banda a sangre (`Container width="full" flush`).
 */
export const ASangre: Story = {
  name: 'A sangre',
  args: VariasAcciones.args,
  render: (args) => (
    <>
      <Hero {...args} />
      <Container width="full" flush space="none">
        <Hero {...args} title="La misma portada, dentro de una banda a sangre" />
      </Container>
    </>
  ),
};

export const Contrato: Story = {
  name: 'Test — section con h1, frase y acciones',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const section = canvasElement.querySelector('section.hero')!;
    await expect(section).toBeInTheDocument();
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent('Aprender es lo primero');
    await expect(canvas.getByText(/La suite de Studio LXD/)).toHaveClass('paragraph--large');
    await expect(canvas.getByRole('link', { name: 'Empezar' }).closest('.hero__actions')).toHaveClass('inline');
  },
};

export const ContratoGeometria: Story = {
  name: 'Test — la geometría no depende del envoltorio',
  tags: ['!dev'],
  args: VariasAcciones.args,
  render: (args) => (
    <>
      <Hero {...args} id="suelta" />
      <Container width="full" flush space="none">
        <Hero {...args} id="envuelta" />
      </Container>
    </>
  ),
  play: async ({ canvasElement }) => {
    const seccion = (id: string) => canvasElement.querySelector(`#${id}`)!;
    const interior = (id: string) => seccion(id).querySelector('.container__inner')!;

    const suelta = getComputedStyle(seccion('suelta'));
    const envuelta = getComputedStyle(seccion('envuelta'));

    // El aire vertical es de la sección: el mismo con y sin envoltorio, y no es cero.
    await expect(parseFloat(suelta.paddingBlockStart)).toBeGreaterThan(0);
    await expect(envuelta.paddingBlockStart).toBe(suelta.paddingBlockStart);
    await expect(envuelta.paddingBlockEnd).toBe(suelta.paddingBlockEnd);

    // Y el aire lateral también: el contenido cae en la misma columna.
    await expect(
      Math.round(interior('envuelta').getBoundingClientRect().width),
    ).toBe(Math.round(interior('suelta').getBoundingClientRect().width));
    await expect(
      Math.round(interior('envuelta').getBoundingClientRect().left),
    ).toBe(Math.round(interior('suelta').getBoundingClientRect().left));

    // El ancho del contenido es el de la barra del SiteHeader (`xl`).
    await expect(getComputedStyle(interior('suelta')).maxInlineSize).toBe('1280px');
  },
};
