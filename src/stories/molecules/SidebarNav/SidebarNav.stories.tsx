import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { SidebarNav } from './SidebarNav';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';
import { Icon } from '../../atoms/Icon/Icon';

const grupos = [
  {
    kind: 'group' as const,
    id: 'general',
    label: 'General',
    href: '#general',
    items: [
      { id: 'dashboard', label: 'Panel', href: '#dashboard', active: true },
      { id: 'activity', label: 'Actividad', href: '#activity' },
      { id: 'inbox', label: 'Bandeja de entrada', href: '#inbox' },
    ],
  },
  {
    kind: 'group' as const,
    id: 'workspace',
    label: 'Espacio de trabajo',
    items: [
      { id: 'projects', label: 'Proyectos', href: '#projects' },
      { id: 'tasks', label: 'Tareas', href: '#tasks' },
    ],
  },
  {
    kind: 'group' as const,
    id: 'settings',
    label: 'Configuración',
    items: [
      { id: 'team', label: 'Equipo', href: '#team' },
      { id: 'billing', label: 'Facturación', href: '#billing' },
    ],
  },
];

const meta: Meta<typeof SidebarNav> = {
  title: 'Molecules/SidebarNav',
  component: SidebarNav,
  parameters: { layout: 'padded' },
  args: { entries: grupos, defaultValue: ['general', 'workspace'] },
  argTypes: { renderLink: { table: { disable: true } } },
  render: (args) => <div style={{ inlineSize: '16rem' }}><SidebarNav {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof SidebarNav>;

/** Grupos plegables; la cabecera con `href` es además la portada de su sección. */
export const PorDefecto: Story = {};

/** Enlaces directos al mismo nivel que los grupos: inicio, ayuda… */
export const ConEnlacesDirectos: Story = {
  args: {
    entries: [
      { kind: 'link', id: 'home', label: 'Inicio', href: '#home', active: true, icon: <Icon name="dashboard" size="sm" /> },
      ...grupos,
      { kind: 'link', id: 'help', label: 'Ayuda', href: '#help' },
    ],
    defaultValue: ['general'],
  },
};

/** En rail: solo iconos; los grupos, como menú al pulsar o al pasar el ratón, con su portada de primer enlace. */
export const Rail: Story = {
  args: {
    rail: true,
    entries: [
      { kind: 'link', id: 'home', label: 'Inicio', href: '#home', active: true, icon: <Icon name="dashboard" size="sm" /> },
      { ...grupos[0], icon: <Icon name="folder" size="sm" /> },
      { ...grupos[1], icon: <Icon name="users-group" size="sm" /> },
      grupos[2],
    ],
  },
  render: (args) => <SidebarNav {...args} />,
};

/**
 * Una sección que existe pero todavía no tiene contenido: se enseña marcada
 * («sin docs») en vez de esconderla, para que el mapa del producto siga siendo
 * el mismo. Es el caso del selector de producto de la web.
 */
export const ConEntradasVacias: Story = {
  args: {
    entries: [
      { kind: 'link', id: 'home', label: 'Inicio', href: '#home', active: true, icon: <Icon name="dashboard" size="sm" /> },
      { kind: 'link', id: 'lrs', label: 'LRS', href: '#lrs', empty: true, icon: <Icon name="chart-bar" size="sm" /> },
      {
        kind: 'group',
        id: 'productos',
        label: 'Productos',
        items: [
          { id: 'bricks', label: 'Bricks', href: '#bricks' },
          { id: 'localizia', label: 'Localizia', href: '#localizia', empty: true },
        ],
      },
    ],
    defaultValue: ['productos'],
  },
};

export const TodoPlegado: Story = {
  args: { defaultValue: [] },
};

export const Contrato: Story = {
  name: 'Test — nav con nombre, página actual, plegar y desplegar',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Navegación principal' });
    await expect(within(nav).getByRole('link', { name: 'Panel' })).toHaveAttribute('aria-current', 'page');
    await expect(within(nav).queryByRole('link', { name: 'Equipo' })).toBeNull();
    const botones = within(nav).getAllByRole('button');
    await userEvent.click(botones[2]);
    await expect(await within(nav).findByRole('link', { name: 'Equipo' })).toBeVisible();
  },
};

export const ContratoVacias: Story = {
  name: 'Test — una entrada vacía no es un enlace y dice por qué',
  tags: ['!dev'],
  args: {
    entries: [
      { kind: 'link', id: 'lrs', label: 'LRS', href: '#lrs', empty: true },
      {
        kind: 'group',
        id: 'productos',
        label: 'Productos',
        items: [
          { id: 'bricks', label: 'Bricks', href: '#bricks' },
          { id: 'localizia', label: 'Localizia', href: '#localizia', empty: true },
        ],
      },
    ],
    defaultValue: ['productos'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Navegación principal' });

    await expect(within(nav).queryByRole('link', { name: /LRS/ })).toBeNull();
    await expect(within(nav).queryByRole('link', { name: /Localizia/ })).toBeNull();
    await expect(within(nav).getByRole('link', { name: 'Bricks' })).toBeVisible();
    await expect(within(nav).getAllByText('sin docs')).toHaveLength(2);
  },
};

/**
 * Los dos textos de la navegación salen de `sidebarNav.*` del catálogo: el
 * nombre de la región y la marca de una entrada sin contenido. Los rótulos de
 * las entradas son datos y siguen viniendo en `entries`, así que con el
 * catálogo en inglés la región se llama «Main», lo vacío dice «no docs» y las
 * entradas siguen diciendo lo suyo.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <SidebarNav
        entries={[
          { kind: 'link', id: 'panel', label: 'Panel', href: '#panel' },
          { kind: 'link', id: 'lrs', label: 'LRS', href: '#lrs', empty: true },
        ]}
      />
    </BrandMessagesProvider>
  ),
};

/** Test: el nombre del `nav` y la marca de vacío salen del catálogo. */
export const ContratoProveedor: Story = {
  name: 'Test — la navegación lee su cromo del proveedor',
  tags: ['!dev'],
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <SidebarNav
        entries={[
          { kind: 'link', id: 'panel', label: 'Panel', href: '#panel' },
          { kind: 'link', id: 'lrs', label: 'LRS', href: '#lrs', empty: true },
        ]}
      />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    await expect(canvas.getByText('no docs')).toBeInTheDocument();
    await expect(canvas.queryByText('sin docs')).toBeNull();
    // Los rótulos son datos: el catálogo no los toca.
    await expect(canvas.getByText('Panel')).toBeInTheDocument();
  },
};
