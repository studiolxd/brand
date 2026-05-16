import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from '../../sections/AppShell/AppShell';
import { Sidebar } from '../../sections/Sidebar/Sidebar';
import { useSidebar } from '../../sections/AppShell/SidebarContext';
import { OrgSwitcher } from '../../molecules/OrgSwitcher/OrgSwitcher';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav';

const meta: Meta = {
  title: 'Templates/App with sidebar',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const orgs = [
  { id: 'studio', name: 'Studio LXD' },
  { id: 'acme', name: 'Acme Corp' },
  { id: 'vertex', name: 'Vertex Design' },
];

const navEntries = [
  {
    kind: 'group' as const,
    id: 'general',
    label: 'General',
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

const userMenuItems = [
  { type: 'button' as const, label: 'Notificaciones', onClick: () => {} },
  { type: 'button' as const, label: 'Configuración', onClick: () => {} },
  { type: 'separator' as const },
  { type: 'button' as const, label: 'Cerrar sesión', onClick: () => {}, destructive: true },
];

interface SidebarContentProps {
  orgSwitcherOpen?: boolean;
  userMenuOpen?: boolean;
}

function SidebarContent({ orgSwitcherOpen, userMenuOpen }: SidebarContentProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <OrgSwitcher
        current={orgs[0]}
        organizations={orgs}
        onOrgChange={() => {}}
        defaultOpen={orgSwitcherOpen}
      />

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <SidebarNav
          entries={navEntries}
          defaultValue={['general', 'workspace']}
        />
      </div>

      <div style={{ borderBlockStart: '1px solid var(--sidebar-border-color, #E5E7EB)', paddingBlockStart: '0.25rem' }}>
        <UserMenu
          name="Ana García"
          email="ana.garcia@studiolxd.com"
          items={userMenuItems}
          defaultOpen={userMenuOpen}
        />
      </div>
    </div>
  );
}

function MainContent() {
  const { open, setOpen } = useSidebar();
  return (
    <div style={{ padding: '2rem' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{ marginBlockEnd: '1.5rem', display: 'block' }}
      >
        {open ? 'Cerrar sidebar' : 'Abrir sidebar'}
      </button>
      <h1 style={{ marginBlock: '0 0.5rem', fontSize: '1.5rem', fontWeight: 600 }}>Dashboard</h1>
      <p style={{ color: '#6B7280' }}>Bienvenido a tu espacio de trabajo.</p>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <AppShell sidebar={<Sidebar><SidebarContent /></Sidebar>}>
      <MainContent />
    </AppShell>
  ),
};

export const SidebarCerrada: Story = {
  render: () => (
    <AppShell defaultOpen={false} sidebar={<Sidebar><SidebarContent /></Sidebar>}>
      <MainContent />
    </AppShell>
  ),
};

export const OrgSwitcherAbierto: Story = {
  render: () => (
    <AppShell sidebar={<Sidebar><SidebarContent orgSwitcherOpen /></Sidebar>}>
      <MainContent />
    </AppShell>
  ),
};

export const UserMenuAbierto: Story = {
  render: () => (
    <AppShell sidebar={<Sidebar><SidebarContent userMenuOpen /></Sidebar>}>
      <MainContent />
    </AppShell>
  ),
};
