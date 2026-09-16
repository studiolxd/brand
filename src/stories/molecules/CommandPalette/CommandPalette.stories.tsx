import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, screen, waitFor, within, fn } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { CommandPalette, type CommandPaletteGroup } from './CommandPalette';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

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

/**
 * Solo los comandos: el título, el marcador, el vacío y el nombre de la lista
 * son cromo y salen del catálogo que el Storybook monta en `preview.tsx`, como
 * los montaría la aplicación.
 */
const base = {
  groups,
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
 * Fuente falsa de una búsqueda en servidor: cada comando lleva un puñado de
 * documentos, y la «API» tarda un poco en contestar — el `setTimeout` es el
 * hueco donde en producción viajaría un `fetch`.
 */
const serverDocuments = [
  { id: 'doc-1', label: 'Guía de accesibilidad' },
  { id: 'doc-2', label: 'Guía de theming oscuro' },
  { id: 'doc-3', label: 'Guía de tokens de color' },
  { id: 'doc-4', label: 'Changelog de la v40' },
];

function searchServerDocuments(query: string): Promise<typeof serverDocuments> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = query
        ? serverDocuments.filter((doc) => doc.label.toLowerCase().includes(query.toLowerCase()))
        : serverDocuments;
      resolve(found);
    }, 400);
  });
}

/**
 * `filter="none"` es lo que pide una búsqueda en servidor: la paleta deja de
 * comparar `label`/`keywords` contra la consulta y enseña tal cual lo que le
 * llega en `groups`. `onQueryChange` sustituye a la lectura por la puerta de
 * atrás (envolver la paleta y leer el `input` del árbol) que hacía el
 * consumidor hasta ahora.
 */
export const BusquedaEnServidor: Story = {
  name: 'Búsqueda en servidor',
  args: { ...base, open: true, onOpenChange: () => {} },
  render: () => {
    const [open, setOpen] = useState(true);
    const [results, setResults] = useState(serverDocuments);
    const [loading, setLoading] = useState(false);

    const handleQueryChange = (query: string) => {
      setLoading(true);
      searchServerDocuments(query).then((found) => {
        setResults(found);
        setLoading(false);
      });
    };

    const documentGroup: CommandPaletteGroup = {
      id: 'documents',
      heading: 'Documentación',
      filter: 'none',
      items: loading
        ? []
        : results.map((doc) => ({ id: doc.id, label: doc.label, onSelect: () => {} })),
    };

    return (
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        onQueryChange={handleQueryChange}
        groups={[documentGroup]}
        emptyLabel={loading ? 'Buscando…' : 'Sin resultados.'}
      />
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

/**
 * La paleta solo dice cuatro cosas por su cuenta —cómo se llama, qué pide el
 * buscador, cómo se llama la lista y qué dice cuando no encuentra nada—, y las
 * cuatro son cromo: salen de `commandPalette.*` del catálogo. Los grupos y los
 * comandos son contenido y siguen viniendo de `groups`, así que con el
 * catálogo en inglés el diálogo se llama «Search for a command» y los comandos
 * siguen en castellano.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  args: { ...base, open: true, onOpenChange: () => {} },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <CommandPalette {...args} />
    </BrandMessagesProvider>
  ),
};

/** Test: sin props de texto, el cromo de la paleta sale del catálogo. */
export const ContratoProveedor: Story = {
  name: 'Test — el cromo de la paleta lee del proveedor',
  tags: ['!dev'],
  args: { ...base, open: true, onOpenChange: fn() },
  render: (args) => (
    <BrandMessagesProvider messages={EN}>
      <CommandPalette {...args} />
    </BrandMessagesProvider>
  ),
  play: async () => {
    const dialog = await screen.findByRole('dialog', { name: 'Search for a command' });
    await expect(within(dialog).getByPlaceholderText('Type to search…')).toBeInTheDocument();
    await expect(within(dialog).getByRole('listbox', { name: 'Suggestions' })).toBeInTheDocument();
    // El aspa es un reenvío puro al `Modal`: sale de `modal.close`.
    await expect(within(dialog).getByRole('button', { name: 'Close' })).toBeInTheDocument();
    // Los comandos son contenido: no los toca el catálogo.
    await expect(within(dialog).getByRole('option', { name: 'Inicio' })).toBeInTheDocument();
  },
};
