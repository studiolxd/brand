import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { CommandPalette, type CommandPaletteGroup } from './CommandPalette';

const meta = {
  title: 'Molecules/CommandPalette',
  component: CommandPalette,
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

const groups: CommandPaletteGroup[] = [
  {
    id: 'navigation',
    heading: 'Navegación',
    items: [
      { id: 'home', label: 'Inicio', icon: <Icon name="dashboard" size="sm" />, onSelect: () => {} },
      { id: 'settings', label: 'Ajustes', icon: <Icon name="settings" size="sm" />, onSelect: () => {} },
    ],
  },
  {
    id: 'account',
    heading: 'Cuenta',
    items: [
      { id: 'profile', label: 'Mi perfil', onSelect: () => {} },
      { id: 'signout', label: 'Cerrar sesión', onSelect: () => {} },
    ],
  },
  {
    // Sin ítems: el componente no lo renderiza — el call-site no condiciona.
    id: 'product',
    heading: 'Producto',
    items: [],
  },
];

const base = {
  groups,
  title: 'Buscar un comando',
  placeholder: 'Escribe para buscar…',
  emptyLabel: 'Sin resultados.',
  listLabel: 'Sugerencias',
  closeLabel: 'Cerrar',
};

export const Default: Story = {
  name: 'Abierta',
  args: { ...base, open: true, onOpenChange: () => {} },
};

export const ConAtajo: Story = {
  name: 'Con atajo ⌘K',
  args: { ...base, open: false, onOpenChange: () => {} },
  render: (args) => {
     
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Abrir (o pulsa ⌘K / Ctrl+K)
        </Button>
        <CommandPalette {...args} open={open} onOpenChange={setOpen} />
      </>
    );
  },
};

export const SinResultados: Story = {
  name: 'Estado vacío',
  args: {
    ...base,
    open: true,
    onOpenChange: () => {},
    groups: [{ id: 'navigation', heading: 'Navegación', items: [] }],
  },
};
