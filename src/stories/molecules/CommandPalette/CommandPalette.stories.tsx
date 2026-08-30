import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, screen, waitFor, fn } from 'storybook/test';
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
      {
        id: 'settings',
        label: 'Ajustes',
        icon: <Icon name="settings" size="sm" />,
        keywords: ['preferencias', 'configuración'],
        onSelect: () => {},
      },
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

export const PorDefecto: Story = {
  name: 'Abierta',
  args: { ...base, open: true, onOpenChange: () => {} },
};

/**
 * Los comandos siempre llegan agrupados y con su cabecera; los grupos que se
 * quedan sin ítems (aquí «Producto», y cualquiera al filtrar) no se pintan.
 */
export const ConGrupos: Story = {
  name: 'Con grupos',
  args: { ...base, open: true, onOpenChange: () => {} },
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

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
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

/**
 * Test: el diálogo expone buscador `combobox`, lista `listbox` con nombre y
 * grupos con cabecera; escribir filtra ignorando acentos y mayúsculas.
 */
export const TestFiltrado: Story = {
  name: 'Test — filtrado y semántica',
  tags: ['!dev'],
  args: { ...base, open: true, onOpenChange: fn() },
  play: async () => {
    const dialog = await screen.findByRole('dialog');
    const input = await screen.findByRole('combobox');
    await expect(screen.getByRole('listbox', { name: 'Sugerencias' })).toBeInTheDocument();
    await expect(screen.getAllByRole('group')).toHaveLength(2);

    await userEvent.type(input, 'SESION');
    const options = screen.getAllByRole('option');
    await expect(options).toHaveLength(1);
    await expect(options[0]).toHaveTextContent('Cerrar sesión');

    await userEvent.clear(input);
    await userEvent.type(input, 'zzz-no-existe');
    await expect(screen.queryAllByRole('option')).toHaveLength(0);
    await expect(dialog.querySelector('[role="status"]')).toHaveTextContent('Sin resultados.');
  },
};

/**
 * Test: ↑↓ mueven `aria-activedescendant` sin sacar el foco del buscador y
 * Enter activa el ítem resaltado cerrando la paleta.
 */
export const TestTeclado: Story = {
  name: 'Test — teclado y selección',
  tags: ['!dev'],
  args: {
    ...base,
    open: true,
    onOpenChange: fn(),
    groups: [
      {
        id: 'navigation',
        heading: 'Navegación',
        items: [
          { id: 'home', label: 'Inicio', onSelect: fn() },
          { id: 'settings', label: 'Ajustes', onSelect: fn() },
        ],
      },
    ],
  },
  play: async ({ args }) => {
    const input = await screen.findByRole('combobox');
    const options = screen.getAllByRole('option');
    await expect(input).toHaveAttribute('aria-activedescendant', options[0].id);

    await userEvent.keyboard('{ArrowDown}');
    await expect(input).toHaveAttribute('aria-activedescendant', options[1].id);
    await expect(input).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(args.groups[0].items[1].onSelect).toHaveBeenCalled();
    await expect(args.onOpenChange).toHaveBeenCalledWith(false);
  },
};

/**
 * Test (B1, auditoría 2026-08-30): el `Modal` ya lleva el foco al panel al
 * abrir; la paleta lo quiere en el buscador, no en el aspa de cerrar. El
 * `autoFocus` del input tiene que seguir mandando sobre el foco inicial de
 * Base UI.
 */
export const TestFocoEnElBuscador: Story = {
  name: 'Test — el foco abre en el buscador',
  tags: ['!dev'],
  args: { ...base, open: false, onOpenChange: fn() },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir la paleta</Button>
        <CommandPalette {...args} open={open} onOpenChange={setOpen} />
      </>
    );
  },
  play: async () => {
    await userEvent.click(await screen.findByRole('button', { name: 'Abrir la paleta' }));
    const input = await screen.findByRole('combobox');
    await waitFor(async () => {
      await expect(input).toHaveFocus();
    });
  },
};
