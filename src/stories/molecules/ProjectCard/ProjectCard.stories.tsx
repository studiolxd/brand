import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ProjectCard } from './ProjectCard';

const foto = {
  src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=960&q=80',
  alt: 'Un aula con un grupo trabajando alrededor de una mesa',
};

const meta: Meta<typeof ProjectCard> = {
  title: 'Molecules/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'padded' },
  args: {
    title: 'Escuela de Grupo Mayo',
    description: 'Campus propio con certificaciones y ruta de carrera para 900 profesionales.',
    media: foto,
    tags: [{ id: 'lms', label: 'Plataforma', variant: 'accent-1' }, { id: 'contenido', label: 'Contenidos' }],
    href: '#proyecto',
  },
  argTypes: { className: { table: { disable: true } }, id: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof ProjectCard>;

/** Imagen, etiquetas, título enlazado y descripción. */
export const PorDefecto: Story = {};

/** Sin imagen: la tarjeta sigue siendo la misma pieza, más corta. */
export const SinImagen: Story = { args: { media: undefined } };

/** Sin enlace: el título deja de serlo y la tarjeta es solo contenido. */
export const SinEnlace: Story = { args: { href: undefined } };

/** Con el enlace del router de la aplicación, por `render`. */
export const ComoEnlaceDelRouter: Story = {
  name: 'Como enlace del router',
  args: {
    href: undefined,
    render: <a href="#ruta-del-router" data-router="next" />,
  },
};

/** Sobre superficie oscura: texto, etiquetas y foco voltean con la superficie. */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — un solo enlace, con el nombre del proyecto',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement.querySelector('article.project-card')).toBeInTheDocument();

    // Un único punto de tabulación, y su nombre accesible es el del proyecto.
    const enlaces = canvas.getAllByRole('link');
    await expect(enlaces).toHaveLength(1);
    await expect(enlaces[0]).toHaveAccessibleName('Escuela de Grupo Mayo');
    await expect(enlaces[0].closest('h3')).toHaveClass('project-card__title');

    // Las etiquetas son una lista con nombre.
    const lista = canvas.getByRole('list', { name: 'Categorías' });
    await expect(within(lista).getAllByRole('listitem')).toHaveLength(2);
  },
};
