import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { EmptyState } from './EmptyState';

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

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
    icon: <FolderIcon />,
    description: 'Esta carpeta está vacía. Crea un proyecto para empezar.',
  },
};

export const WithAction: Story = {
  args: {
    icon: <FolderIcon />,
    description: 'No tienes proyectos todavía.',
    action: { label: 'Crear proyecto', onClick: fn() },
  },
};

export const SearchResult: Story = {
  args: {
    icon: <SearchIcon />,
    title: 'Sin resultados',
    description: 'No se han encontrado coincidencias para tu búsqueda.',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    icon: <FolderIcon />,
    description: 'No hay datos disponibles.',
    action: { label: 'Añadir', onClick: fn() },
  },
};
