import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppHeader } from './AppHeader';
import { AppShellContext } from '../AppShell/AppShellContext';
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav';
import { OrgSwitcher } from '../../molecules/OrgSwitcher/OrgSwitcher';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';

const meta: Meta<typeof AppHeader> = {
  title: 'Sections/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
  },
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

const navEntries = [
  {
    kind: 'group' as const,
    id: 'general',
    label: 'General',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '#dashboard', active: true },
      { id: 'activity', label: 'Actividad', href: '#activity' },
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
];

const orgs = [
  { id: 'studio', name: 'Studio LXD', logoUrl: 'https://placehold.co/32x32/1a2b4a/ffffff?text=S' },
  { id: 'acme', name: 'Acme Corp', logoUrl: 'https://placehold.co/32x32/e63946/ffffff?text=A' },
];

const sampleCenter = <OrgSwitcher current={orgs[0]} organizations={orgs} onOrgChange={() => {}} />;

const sampleEnd = (
  <UserMenu
    name="Ana García"
    email="ana.garcia@studiolxd.com"
    notificationCount={3}
    items={[{ type: 'button' as const, label: 'Cerrar sesión', onClick: () => {}, destructive: true }]}
  />
);

const sampleNav = <SidebarNav entries={navEntries} defaultValue={['general', 'workspace']} />;

/* Provider con el menú abierto de inicio, para congelar el estado en la story */
const OpenShell = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <AppShellContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </AppShellContext.Provider>
  );
};

export const Default: Story = {
  render: () => (
    <AppHeader center={sampleCenter} end={sampleEnd}>
      {sampleNav}
    </AppHeader>
  ),
};

export const Open: Story = {
  render: () => (
    <OpenShell>
      <AppHeader center={sampleCenter} end={sampleEnd}>
        {sampleNav}
      </AppHeader>
    </OpenShell>
  ),
};

export const WithoutCenter: Story = {
  render: () => <AppHeader end={sampleEnd}>{sampleNav}</AppHeader>,
};

export const DarkOpen: Story = {
  globals: { backgrounds: { value: 'dark' } },
  render: () => (
    <OpenShell>
      <AppHeader center={sampleCenter} end={sampleEnd}>
        {sampleNav}
      </AppHeader>
    </OpenShell>
  ),
};
