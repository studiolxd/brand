import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';
import { Sidebar } from '../Sidebar/Sidebar';
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav';
import { OrgSwitcher } from '../../molecules/OrgSwitcher/OrgSwitcher';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';
import { useSidebar } from './SidebarContext';

const meta: Meta<typeof AppShell> = {
  title: 'Sections/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

const sidebarNavEntries = [
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

const orgs = [
  { id: 'studio', name: 'Studio LXD', logoUrl: 'https://placehold.co/32x32/1a2b4a/ffffff?text=S' },
  { id: 'acme', name: 'Acme Corp', logoUrl: 'https://placehold.co/32x32/e63946/ffffff?text=A' },
];

const userMenuItems = [
  { type: 'button' as const, label: 'Configuración', onClick: () => {} },
  { type: 'separator' as const },
  { type: 'button' as const, label: 'Cerrar sesión', onClick: () => {}, destructive: true },
];

const SampleSidebarContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
    <OrgSwitcher current={orgs[0]} organizations={orgs} onOrgChange={() => {}} />
    <div style={{ flex: 1, overflow: 'auto' }}>
      <SidebarNav entries={sidebarNavEntries} defaultValue={['general', 'workspace']} />
    </div>
    <UserMenu
      name="Ana García"
      email="ana.garcia@studiolxd.com"
      avatarUrl="https://placehold.co/32x32/1a2b4a/ffffff?text=AG"
      items={userMenuItems}
    />
  </div>
);

const SampleMainContent = () => {
  const { collapsed, setCollapsed } = useSidebar();
  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => setCollapsed(!collapsed)} type="button" style={{ marginBlockEnd: '1rem' }}>
        Toggle sidebar
      </button>
      <h1>Contenido principal</h1>
      <p>El contenido de la app va aquí. La sidebar empuja este bloque en desktop y se superpone como overlay en móvil.</p>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <AppShell sidebar={<Sidebar><SampleSidebarContent /></Sidebar>}>
      <SampleMainContent />
    </AppShell>
  ),
};

export const SidebarClosed: Story = {
  render: () => (
    <AppShell defaultCollapsed sidebar={<Sidebar><SampleSidebarContent /></Sidebar>}>
      <SampleMainContent />
    </AppShell>
  ),
};
