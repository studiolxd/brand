import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { SidebarNav } from './SidebarNav';
import { Icon } from '../../atoms/Icon/Icon';
import { Container } from '../../atoms/Container/Container';

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

export const TodoPlegado: Story = {
  args: { defaultValue: [] },
};

export const SuperficieOscura: Story = {
  render: (args) => (
    <Container surface="dark" space="md">
      <div style={{ inlineSize: '16rem' }}><SidebarNav {...args} /></div>
    </Container>
  ),
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
