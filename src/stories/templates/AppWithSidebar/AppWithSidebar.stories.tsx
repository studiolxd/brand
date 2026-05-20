import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from '../../sections/AppShell/AppShell';
import { Sidebar } from '../../sections/Sidebar/Sidebar';
import { Logo } from '../../atoms/Logo/Logo';
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

const IconGeneral = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const IconWorkspace = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const navEntries = [
  {
    kind: 'group' as const,
    id: 'general',
    label: 'General',
    icon: <IconGeneral />,
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
    icon: <IconWorkspace />,
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
    icon: <IconSettings />,
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
        items={[
          { type: 'link', label: 'Administrar organizaciones', href: '#orgs' },
        ]}
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
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBlock: '0 0.5rem', fontSize: '1.5rem', fontWeight: 600 }}>Dashboard</h1>
      <p style={{ color: '#6B7280' }}>Bienvenido a tu espacio de trabajo.</p>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <AppShell sidebar={<Sidebar logo={<Logo height={24} />}><SidebarContent /></Sidebar>}>
      <MainContent />
    </AppShell>
  ),
};

export const SidebarCerrada: Story = {
  render: () => (
    <AppShell defaultCollapsed sidebar={<Sidebar logo={<Logo height={24} />}><SidebarContent /></Sidebar>}>
      <MainContent />
    </AppShell>
  ),
};

export const OrgSwitcherAbierto: Story = {
  render: () => (
    <AppShell sidebar={<Sidebar logo={<Logo height={24} />}><SidebarContent orgSwitcherOpen /></Sidebar>}>
      <MainContent />
    </AppShell>
  ),
};

export const UserMenuAbierto: Story = {
  render: () => (
    <AppShell sidebar={<Sidebar logo={<Logo height={24} />}><SidebarContent userMenuOpen /></Sidebar>}>
      <MainContent />
    </AppShell>
  ),
};
