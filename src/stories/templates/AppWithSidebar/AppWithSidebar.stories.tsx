import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from '../../sections/AppShell/AppShell';
import { AppHeader } from '../../sections/AppHeader/AppHeader';
import { Sidebar, SidebarGroup } from '../../sections/Sidebar/Sidebar';
import { Container } from '../../atoms/Container/Container';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
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
          notifications={<NotificationButton count={3} />}
          end={<UserMenu compact name="Ana García" email="ana.garcia@studiolxd.com" items={userMenuItems} defaultOpen={userMenuOpen} />}
        />
      }
      sidebar={
        // Sin logotipo: el panel solo pinta su cabecera cuando se le pasa uno,
        // y en las aplicaciones la marca ya está en la barra de arriba.
        <Sidebar id="sidebar">
          <SidebarGroup>
            <OrgSwitcher block current={orgs[0]} organizations={orgs} onOrgChange={() => {}} defaultOpen={orgSwitcherOpen} items={[{ type: 'link', label: 'Administrar organizaciones', href: '#orgs' }]} />
          </SidebarGroup>
          <SidebarNav entries={navEntries} defaultValue={['workspace']} />
        </Sidebar>
      }
    >
      {/* El título de la página lo pone la página, no el marco: la barra de
          arriba no lleva `start` y aquí no hay saludo — se retiró. */}
      <Container space="lg">
        <PageIntro title="Panel" />
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

export const OrgSwitcherAbierto: Story = { args: { orgSwitcherOpen: true } };
export const UserMenuAbierto: Story = { args: { userMenuOpen: true } };
