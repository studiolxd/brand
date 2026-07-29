import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';
import { AppHeader } from '../AppHeader/AppHeader';
import { Sidebar } from '../Sidebar/Sidebar';
import { Logo } from '../../atoms/Logo/Logo';
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav';
import { OrgSwitcher } from '../../molecules/OrgSwitcher/OrgSwitcher';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';

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

const sampleOrgSwitcher = <OrgSwitcher current={orgs[0]} organizations={orgs} onOrgChange={() => {}} />;

const sampleNav = <SidebarNav entries={sidebarNavEntries} defaultValue={['general', 'workspace']} />;

const sampleUserMenu = (
  <UserMenu
    name="Ana García"
    email="ana.garcia@studiolxd.com"
    notificationCount={3}
    items={userMenuItems}
  />
);

const SampleMainContent = () => (
  <div style={{ padding: '2rem' }}>
    <h1>Contenido principal</h1>
    <p>
      En desktop la sidebar es un rail plegado que se expande en hover (o al tabular dentro),
      empujando este bloque. En móvil el chrome es un AppHeader con panel a pantalla completa.
    </p>
  </div>
);

const sampleSidebar = (
  <Sidebar logo={<Logo height={32} />} footer={sampleUserMenu}>
    {sampleOrgSwitcher}
    {sampleNav}
  </Sidebar>
);

const sampleHeader = (
  <AppHeader center={sampleOrgSwitcher} end={sampleUserMenu}>
    {sampleNav}
  </AppHeader>
);

export const Default: Story = {
  render: () => (
    <AppShell sidebar={sampleSidebar} header={sampleHeader}>
      <SampleMainContent />
    </AppShell>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <AppShell sidebar={sampleSidebar} header={sampleHeader}>
      <SampleMainContent />
    </AppShell>
  ),
};

export const MobilePortal: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <AppShell
      sidebar={
        <Sidebar logo={<Logo height={32} />} footer={sampleUserMenu}>
          {sampleNav}
        </Sidebar>
      }
      header={<AppHeader end={sampleUserMenu}>{sampleNav}</AppHeader>}
    >
      <SampleMainContent />
    </AppShell>
  ),
};
