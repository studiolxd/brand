import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarNav } from './SidebarNav';

const meta: Meta<typeof SidebarNav> = {
  title: 'Molecules/SidebarNav',
  component: SidebarNav,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof SidebarNav>;

const entries = [
  {
    kind: 'group' as const,
    id: 'general',
    label: 'General',
    href: '#general',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '#dashboard', active: true },
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
      { id: 'files', label: 'Archivos', href: '#files' },
    ],
  },
  {
    kind: 'group' as const,
    id: 'settings',
    label: 'Configuración',
    items: [
      { id: 'team', label: 'Equipo', href: '#team' },
      { id: 'billing', label: 'Facturación', href: '#billing' },
      { id: 'integrations', label: 'Integraciones', href: '#integrations' },
    ],
  },
];

export const Default: Story = {
  args: {
    entries,
    defaultValue: ['general', 'workspace'],
  },
};

export const TodosCerrados: Story = {
  args: {
    entries,
    defaultValue: [],
  },
};

export const TodosAbiertos: Story = {
  args: {
    entries,
    defaultValue: ['general', 'workspace', 'settings'],
  },
};

export const ConEnlaceDirecto: Story = {
  args: {
    entries: [
      { kind: 'link', id: 'home', label: 'Inicio', href: '#home', active: true },
      ...entries,
      { kind: 'link', id: 'help', label: 'Ayuda', href: '#help' },
    ],
    defaultValue: ['general'],
  },
};
