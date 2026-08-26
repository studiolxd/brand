import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from '../../sections/AppShell/AppShell';
import { AppHeader } from '../../sections/AppHeader/AppHeader';
import { Sidebar } from '../../sections/Sidebar/Sidebar';
import { Logo } from '../../atoms/Logo/Logo';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Container } from '../../atoms/Container/Container';
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav';
import { OrgSwitcher } from '../../molecules/OrgSwitcher/OrgSwitcher';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';
import { NotificationButton } from '../../molecules/NotificationButton/NotificationButton';
import { navEntries, orgs } from '../../sections/AppShell/_datos';

const userMenuItems = [
  { type: 'link' as const, label: 'Mi cuenta', href: '#cuenta' },
  { type: 'separator' as const },
  { type: 'button' as const, label: 'Cerrar sesión', onClick: () => {}, destructive: true },
];

interface ShellProps {
  defaultSidebar?: 'open' | 'rail' | 'closed';
  orgSwitcherOpen?: boolean;
  userMenuOpen?: boolean;
}

function Shell({ defaultSidebar, orgSwitcherOpen, userMenuOpen }: ShellProps) {
  return (
    <AppShell
      defaultSidebar={defaultSidebar}
      header={
        <AppHeader
          sidebarId="sidebar"
          start={<Heading level={1} size={6}>Proyectos</Heading>}
          notifications={<NotificationButton count={3} />}
          end={<UserMenu compact name="Ana García" email="ana.garcia@studiolxd.com" items={userMenuItems} defaultOpen={userMenuOpen} />}
        />
      }
      sidebar={
        <Sidebar id="sidebar" logo={<Logo size="sm" />}>
          <OrgSwitcher block current={orgs[0]} organizations={orgs} onOrgChange={() => {}} defaultOpen={orgSwitcherOpen} items={[{ type: 'link', label: 'Administrar organizaciones', href: '#orgs' }]} />
          <SidebarNav entries={navEntries} defaultValue={['workspace']} />
        </Sidebar>
      }
    >
      <Container space="lg">
        <Heading level={2} size={7}>Bienvenida a tu espacio de trabajo</Heading>
        <Paragraph>Contenido de la página. La barra de arriba y la sidebar son las del sistema; el producto solo pone qué hay dentro.</Paragraph>
      </Container>
    </AppShell>
  );
}

const meta: Meta<typeof Shell> = {
  title: 'Templates/App with sidebar',
  component: Shell,
  parameters: { layout: 'fullscreen' },
  argTypes: { defaultSidebar: { control: 'select', options: ['open', 'rail', 'closed'] } },
};
export default meta;
type Story = StoryObj<typeof Shell>;

export const Escritorio: Story = {};
export const Rail: Story = { args: { defaultSidebar: 'rail' } };
export const Movil: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } };
export const OrgSwitcherAbierto: Story = { args: { orgSwitcherOpen: true } };
export const UserMenuAbierto: Story = { args: { userMenuOpen: true } };
