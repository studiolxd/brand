import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Hero } from './Hero';
import { Button } from '../../atoms/Button/Button';

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

export const Contrato: Story = {
  name: 'Test — section con h1, frase y acciones',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const section = canvasElement.querySelector('section.hero.container')!;
    await expect(section).toBeInTheDocument();
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent('Aprender es lo primero');
    await expect(canvas.getByText(/La suite de Studio LXD/)).toHaveClass('paragraph--large');
    await expect(canvas.getByRole('link', { name: 'Empezar' }).closest('.hero__actions')).toBeInTheDocument();
  },
};
