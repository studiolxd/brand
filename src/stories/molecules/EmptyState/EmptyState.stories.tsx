import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
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

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: 'Aún no has añadido ningún elemento. Empieza creando el primero.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Icon name="folder" size="xl" />,
    description: 'Esta carpeta está vacía. Crea un proyecto para empezar.',
  },
};

export const WithAction: Story = {
  args: {
    icon: <Icon name="folder" size="xl" />,
    description: 'No tienes proyectos todavía.',
    action: { label: 'Crear proyecto', onClick: fn() },
  },
};

export const SearchResult: Story = {
  args: {
    icon: <Icon name="search" size="xl" />,
    title: 'Sin resultados',
    description: 'No se han encontrado coincidencias para tu búsqueda.',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    icon: <Icon name="folder" size="lg" />,
    description: 'No hay datos disponibles.',
    action: { label: 'Añadir', onClick: fn() },
  },
};
