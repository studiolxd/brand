import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, within } from 'storybook/test';
import { EmptyState } from './EmptyState';
import { Icon } from '../../atoms/Icon/Icon';

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    size: { control: { type: 'select' }, options: ['sm', 'md'] },
  },
  args: {
    title: 'No hay elementos',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const PorDefecto: Story = {};

export const WithDescription: Story = {
  name: 'Con descripción',
  args: {
    description: 'Aún no has añadido ningún elemento. Empieza creando el primero.',
  },
};

export const WithIcon: Story = {
  name: 'Con icono',
  args: {
    icon: <Icon name="folder" size="lg" />,
    description: 'Esta carpeta está vacía. Crea un proyecto para empezar.',
  },
};

export const WithAction: Story = {
  name: 'Con acción',
  args: {
    icon: <Icon name="folder" size="lg" />,
    description: 'No tienes proyectos todavía.',
    action: { label: 'Crear proyecto', onClick: fn() },
  },
};

export const SearchResult: Story = {
  name: 'Sin resultados de búsqueda',
  args: {
    icon: <Icon name="search" size="lg" />,
    title: 'Sin resultados',
    description: 'No se han encontrado coincidencias para tu búsqueda.',
  },
};

export const Small: Story = {
  name: 'Talla sm',
  args: {
    size: 'sm',
    icon: <Icon name="folder" size="lg" />,
    description: 'No hay datos disponibles.',
    action: { label: 'Añadir', onClick: fn() },
  },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    icon: <Icon name="folder" size="lg" />,
    description: 'Esta carpeta está vacía. Crea un proyecto para empezar.',
    action: { label: 'Crear proyecto', onClick: fn() },
  },
};

export const TestContrato: Story = {
  name: 'Test — anuncio y acción',
  tags: ['!dev'],
  args: {
    title: 'No hay resultados',
    description: 'Prueba con otros filtros.',
    action: { label: 'Limpiar filtros', onClick: fn() },
  },
  render: (args) => (
    <div role="status">
      <EmptyState {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No hay resultados')).toBeInTheDocument();
    await expect(canvas.getByText('Prueba con otros filtros.')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Limpiar filtros' })).toBeInTheDocument();
  },
};
