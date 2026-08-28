import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Highlight } from './Highlight';
import { Button } from '../../atoms/Button/Button';

const foto = (
  <img
    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=960&q=80"
    alt="Un aula con un grupo trabajando alrededor de una mesa"
  />
);

const meta: Meta<typeof Highlight> = {
  title: 'Sections/Highlight',
  component: Highlight,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'La formación que no se abandona a la semana',
    description: 'Diseñamos itinerarios que la gente termina, con contenidos propios y una plataforma que no estorba.',
    actions: <Button size="lg" href="#contacto">Hablemos</Button>,
  },
  argTypes: { className: { table: { disable: true } }, id: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof Highlight>;

/** Titular, texto y un botón, sobre superficie oscura. */
export const PorDefecto: Story = {};

/** Con media al lado: dos columnas en escritorio, apiladas en móvil. */
export const ConMedia: Story = {
  name: 'Con media',
  args: { media: foto },
};

/** La media al otro lado. */
export const MediaALaIzquierda: Story = {
  name: 'Media a la izquierda',
  args: { media: foto, mediaPosition: 'start' },
};

/** Sobre superficie clara: la banda no pinta color, así que voltea entera. */
export const SuperficieClara: Story = {
  name: 'Superficie clara',
  args: { media: foto, surface: 'light' },
};

/** Varias acciones: en fila, y en móvil pasan a la línea siguiente. */
export const VariasAcciones: Story = {
  args: {
    actions: (
      <>
        <Button size="lg" href="#contacto">Hablemos</Button>
        <Button size="lg" variant="outline" href="#proyectos">Ver proyectos</Button>
      </>
    ),
  },
};

export const Contrato: Story = {
  name: 'Test — banda oscura con titular, texto y acciones',
  tags: ['!dev'],
  args: ConMedia.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const banda = canvasElement.querySelector('section.highlight')!;
    await expect(banda).toHaveClass('surface-dark');

    await expect(canvas.getByRole('heading', { level: 2 })).toHaveTextContent('La formación que no se abandona');
    await expect(canvas.getByText(/Diseñamos itinerarios/)).toHaveClass('paragraph--large');
    await expect(canvas.getByRole('link', { name: 'Hablemos' }).closest('.highlight__actions')).toHaveClass('inline');

    // La banda trae su propio aire vertical y su Container interior: se monta a sangre.
    await expect(parseFloat(getComputedStyle(banda).paddingBlockStart)).toBeGreaterThan(0);
    await expect(banda.querySelector(':scope > .container')).toBeInTheDocument();

    // Con media, el reparto lo hace el `Columns` del sistema.
    await expect(banda.querySelector('.columns')).toBeInTheDocument();
    await expect(canvas.getByRole('img', { name: /Un aula/ }).parentElement).toHaveClass('highlight__media');
  },
};
